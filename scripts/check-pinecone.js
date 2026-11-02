require('dotenv').config({ quiet: true });
const assert = require('node:assert/strict');
const { Pinecone } = require('@pinecone-database/pinecone');
const chunks = require('./resume_chunks.json');
const { namespace } = require('../lib/resume-index.json');
async function main() {
  const name = process.env.PINECONE_RESUME_INDEX_NAME;
  if (!name) throw new Error('PINECONE_RESUME_INDEX_NAME is required');
  const index = new Pinecone().index(name, process.env.PINECONE_RESUME_INDEX_HOST).namespace(namespace);
  const result = await index.fetch({ ids: chunks.map(c => c._id) });
  for (const chunk of chunks) {
    assert.equal(result.records[chunk._id]?.metadata?.text, chunk.text, `Missing or stale record: ${chunk._id}`);
  }
  for (const [query, expected] of [
    ['What results did Dave achieve with the growth intelligence platform at Amivero?', '150%'],
    ['How did Dave support the acquisition of Amivero by Xpect Solutions?', 'Xpect'],
    ['What recognition did Dave receive in 2026?', 'National Security 150'],
  ]) {
    const response = await index.searchRecords({ query: { topK: 5, inputs: { text: query } }, fields: ['text'] });
    assert(response.result.hits.some(hit => String(hit.fields.text).includes(expected)), `Retrieval missed ${expected}`);
    console.log(`Verified semantic retrieval: ${expected}`);
  }
  console.log(`Verified all ${chunks.length} records in ${name}/${namespace}.`);
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
