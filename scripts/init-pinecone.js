require('dotenv').config();
const fs = require('fs');
const { Pinecone } = require('@pinecone-database/pinecone');
const { v4: uuidv4 } = require('uuid');

/**
 * Initialize the Pinecone client
 * @returns {Pinecone} - Initialized Pinecone client
 */
const initPinecone = () => {
  if (!process.env.PINECONE_API_KEY) {
    throw new Error('PINECONE_API_KEY environment variable not set');
  }

  return new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });
};

/**
 * Transform the chunks into the format expected by Pinecone
 * @param {Array} chunks - Array of resume chunks
 * @returns {Array} - Array formatted for Pinecone upsert
 */
function formatForPinecone(chunks) {
  return chunks.map(chunk => ({
    id: chunk._id,
    values: Array(1024).fill(0).map(() => (Math.random() * 2 - 1) * 0.01), // Mock embedding values (1536 dimensions)
    metadata: {
      text: chunk.text,
      section: chunk.section,
      category: chunk.category,
      subcategory: chunk.subcategory || '',
      organization: chunk.organization || '',
      role: chunk.role || '',
      years: chunk.years || '',
      achievement_type: chunk.achievement_type || '',
      sequence: chunk.sequence
    }
  }));
}

/**
 * Create the Pinecone index if it doesn't exist
 * @param {Pinecone} pc - Initialized Pinecone client
 * @param {string} indexName - Name of the index to create
 */
async function createIndexIfNotExists(pc, indexName) {
  try {
    // List all indexes
    const indexList = await pc.listIndexes();
    const indexes = indexList.indexes || [];
    
    // Check if our index exists
    const indexExists = indexes.some(idx => idx.name === indexName);
    
    if (!indexExists) {
      console.log(`Index ${indexName} does not exist. Creating...`);
      
      // Create the index
      await pc.createIndex({
        name: indexName,
        dimension: 1536, // Standard dimension for text embeddings
        metric: 'cosine',
        spec: {
          serverless: {
            cloud: 'aws',
            region: 'us-west-2'
          }
        }
      });
      
      console.log(`Index ${indexName} created. Waiting for it to be ready...`);
      
      // Wait for the index to initialize
      let isReady = false;
      while (!isReady) {
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
        
        try {
          const indexDescription = await pc.describeIndex(indexName);
          if (indexDescription.status === 'Ready') {
            isReady = true;
            console.log(`Index ${indexName} is now ready.`);
          } else {
            console.log(`Index status: ${indexDescription.status}. Waiting...`);
          }
        } catch (e) {
          console.log('Index not yet available, waiting...');
        }
      }
    } else {
      console.log(`Index ${indexName} already exists.`);
    }
    
    return true;
  } catch (error) {
    console.error('Error creating Pinecone index:', error);
    throw error;
  }
}

/**
 * Upsert chunks to Pinecone
 * @param {Array} chunks - Array of resume chunks
 */
async function upsertToPinecone(chunks) {
  try {
    // Check if chunks array is empty
    if (!chunks || chunks.length === 0) {
      console.log('No chunks to upsert. Skipping Pinecone operation.');
      return false;
    }

    const pc = initPinecone();
    
    if (!process.env.PINECONE_RESUME_INDEX_NAME) {
      throw new Error('PINECONE_RESUME_INDEX_NAME environment variable not set');
    }
    
    // Get the index name
    const indexName = process.env.PINECONE_RESUME_INDEX_NAME;
    
    // Ensure the index exists
    await createIndexIfNotExists(pc, indexName);
    
    // Get the index
    const index = pc.index(indexName);
    
    // Format chunks for Pinecone
    const formattedChunks = formatForPinecone(chunks);
    
    try {
      // Check if the index has any records
      const stats = await index.describeStats();
      console.log(`Index ${indexName} has ${stats.totalRecordCount || stats.namespaces?.default?.vectorCount || 0} records.`);
      
      // Delete all records in the index (in the default namespace)
      console.log(`Deleting all records in index ${indexName}...`);
      try {
        // First try using the namespace
        await index.namespace('default').deleteAll();
      } catch (deleteError) {
        // If that fails, try without specifying a namespace
        console.log('Trying alternative delete method...');
        try {
          await index.deleteAll();
        } catch (alternativeDeleteError) {
          console.warn('Could not delete existing records. This may be a new index or API change.');
          console.warn(alternativeDeleteError.message);
        }
      }
    } catch (statsError) {
      console.warn('Could not get index stats. This may be a new index or API change.');
      console.warn(statsError.message);
    }
    
    // Split upserts into batches of 100 to avoid rate limits
    const BATCH_SIZE = 100;
    
    console.log(`Upserting ${formattedChunks.length} records to Pinecone in batches of ${BATCH_SIZE}...`);
    
    // Process in batches
    for (let i = 0; i < formattedChunks.length; i += BATCH_SIZE) {
      const batch = formattedChunks.slice(i, i + BATCH_SIZE);
      
      try {
        // Try using namespace
        await index.namespace('default').upsert(batch);
      } catch (upsertError) {
        // If that fails, try without namespace
        console.log('Trying alternative upsert method...');
        await index.upsert(batch);
      }
      
      console.log(`Upserted batch ${Math.floor(i/BATCH_SIZE) + 1}/${Math.ceil(formattedChunks.length/BATCH_SIZE)}`);
    }
    
    console.log(`Successfully upserted ${formattedChunks.length} paragraphs to Pinecone.`);
    return true;
  } catch (error) {
    console.error('Error in Pinecone operations:', error);
    throw error;
  }
}

// Main function to run the script
async function main() {
  try {
    console.log('Loading resume chunks...');
    
    // Load chunks from the file
    const loadedChunks = JSON.parse(fs.readFileSync('scripts/resume_chunks.json', 'utf-8'));
    console.log(`Loaded ${loadedChunks.length} chunks from resume_chunks.json`);

    // Check if environment variables are set
    if (process.env.PINECONE_API_KEY && process.env.PINECONE_RESUME_INDEX_NAME) {
      // Upsert chunks to Pinecone
      await upsertToPinecone(loadedChunks);
    } else {
      console.log('\nSkipping Pinecone upsert - environment variables not set.');
      console.log('Set PINECONE_API_KEY and PINECONE_RESUME_INDEX_NAME in your .env file to upsert to Pinecone.');
    }
  } catch (error) {
    console.error('Error in main function:', error);
    process.exit(1);
  }
}

// Run the main function if this script is run directly
if (require.main === module) {
  main();
}

// Export functions for use in other modules
module.exports = {
  initPinecone,
  upsertToPinecone,
};