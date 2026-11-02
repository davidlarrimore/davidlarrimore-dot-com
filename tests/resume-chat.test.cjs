const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const path = require('node:path');

function route(search) {
  let prompt;
  let queriedNamespace;
  const code = ts.transpileModule(fs.readFileSync('app/api/projects/resumeChat/route.ts', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
  }).outputText;
  const exports = {};
  vm.runInNewContext(code, {
    exports,
    require(name) {
      if (name === 'next/server') return { NextResponse: { json: value => value } };
      if (name === '@pinecone-database/pinecone') return { Pinecone: class {
        index() { return { namespace(value) { queriedNamespace = value; return { searchRecords: search }; } }; }
      } };
      if (name.startsWith('@/')) return require(path.resolve(name.slice(2)));
      return require(name);
    },
    process: { env: { ANTHROPIC_API_KEY: 'test', PINECONE_API_KEY: 'test' }, cwd: () => process.cwd() },
    console: { log() {}, error() {} },
    fetch: async (url, options) => {
      prompt = JSON.parse(options.body).system;
      return { ok: true, json: async () => ({ content: [{ text: 'answer' }] }) };
    },
  });
  return { post: version => exports.POST({ json: async () => ({ version, messages: [{ role: 'user', content: 'What did Dave do at Amivero?' }] }) }), prompt: () => prompt, namespace: () => queriedNamespace };
}

test('basic chatbot uses current achievements and employment dates', async () => {
  const api = route();
  await api.post('basic');
  assert.match(api.prompt(), /150%/);
  assert.match(api.prompt(), /Xpect Solutions/);
  assert.match(api.prompt(), /2021 — 2025/);
  assert.doesNotMatch(api.prompt(), /2021 - Present/);
});

test('RAG uses the uploaded revision and current career overview', async () => {
  const api = route(async () => ({ result: { hits: [{ fields: { text: 'New retrieved achievement' }, _score: 0.9 }] } }));
  const response = await api.post('rag');
  assert.equal(api.namespace(), require('../lib/resume-index.json').namespace);
  assert.match(api.prompt(), /New retrieved achievement/);
  assert.match(api.prompt(), /2025 — Present: Senior Vice President, Solution Engineering at Amivero/);
  assert.equal(response.retrievedChunks.length, 1);
});

for (const [name, search] of [
  ['empty results', async () => ({ result: { hits: [] } })],
  ['retrieval failure', async () => { throw new Error('offline'); }],
]) test(`RAG falls back to the updated full resume on ${name}`, async () => {
  const api = route(search);
  const response = await api.post('rag');
  assert.match(api.prompt(), /150%/);
  assert.match(api.prompt(), /Xpect Solutions/);
  assert.equal(response.retrievedChunks, null);
});

test('CSV retains employment metadata from generated JSON', () => {
  const csv = require('papaparse').parse(fs.readFileSync('scripts/resume_chunks.csv', 'utf8'), { header: true, skipEmptyLines: true });
  assert.equal(csv.errors.length, 0);
  const chunks = require('../scripts/resume_chunks.json');
  assert.equal(csv.data.length, chunks.length);
  for (const chunk of chunks) {
    const row = csv.data.find(row => row._id === chunk._id);
    assert.equal(row.text, chunk.text);
    assert.equal(row.organization, chunk.organization || '');
    assert.equal(row.years, chunk.years || '');
  }
});
