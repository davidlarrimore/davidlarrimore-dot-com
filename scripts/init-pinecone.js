require('dotenv').config({ quiet: true });
const { Pinecone } = require('@pinecone-database/pinecone');
const chunks = require('./resume_chunks.json');
const { namespace } = require('../lib/resume-index.json');

async function listIds(index) {
  const ids = [];
  let paginationToken;
  do {
    const page = await index.listPaginated({ paginationToken });
    ids.push(...(page.vectors || []).map(v => v.id));
    paginationToken = page.pagination?.next;
  } while (paginationToken);
  return ids;
}

// Makes the namespace an exact mirror of scripts/resume_chunks.json:
// upserts every chunk, then deletes records whose ids are no longer in the file.
async function main() {
  const name = process.env.PINECONE_RESUME_INDEX_NAME;
  if (!name || !process.env.PINECONE_API_KEY) throw new Error('PINECONE_RESUME_INDEX_NAME and PINECONE_API_KEY are required');
  const pc = new Pinecone();
  const description = await pc.describeIndex(name);
  if (description.embed?.fieldMap?.text !== 'text') {
    throw new Error('Resume index must use integrated embeddings with fieldMap.text = "text". No records were changed.');
  }
  const index = pc.index(name, process.env.PINECONE_RESUME_INDEX_HOST).namespace(namespace);
  for (let i = 0; i < chunks.length; i += 96) {
    await index.upsertRecords({ records: chunks.slice(i, i + 96) });
  }
  const keep = new Set(chunks.map(c => c._id));
  const stale = (await listIds(index)).filter(id => !keep.has(id));
  for (let i = 0; i < stale.length; i += 1000) {
    await index.deleteMany({ ids: stale.slice(i, i + 1000) });
  }
  console.log(`Synced ${chunks.length} records to ${name}/${namespace} (removed ${stale.length} stale). Verify with npm run check-pinecone.`);
}
if (require.main === module) main().catch(error => { console.error(error.message); process.exitCode = 1; });
