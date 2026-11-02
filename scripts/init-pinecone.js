require('dotenv').config({ quiet: true });
const { Pinecone } = require('@pinecone-database/pinecone');
const chunks = require('./resume_chunks.json');
const { namespace } = require('../lib/resume-index.json');

async function main() {
  const name = process.env.PINECONE_RESUME_INDEX_NAME;
  if (!name || !process.env.PINECONE_API_KEY) throw new Error('PINECONE_RESUME_INDEX_NAME and PINECONE_API_KEY are required');
  const pc = new Pinecone();
  const description = await pc.describeIndex(name);
  if (description.embed?.fieldMap?.text !== 'text') {
    throw new Error('Resume index must use integrated embeddings with fieldMap.text = "text". No records were changed.');
  }
  const index = pc.index(name, process.env.PINECONE_RESUME_INDEX_HOST).namespace(namespace);
  // Integrated embedding uses the index model for both ingestion and search.
  // Keep prior namespaces intact so an upload failure cannot break the deployed site.
  for (let i = 0; i < chunks.length; i += 96) {
    await index.upsertRecords({ records: chunks.slice(i, i + 96) });
  }
  console.log(`Uploaded ${chunks.length} records to ${name}/${namespace}. Run npm run check-pinecone before deploying.`);
}
if (require.main === module) main().catch(error => { console.error(error.message); process.exitCode = 1; });
