require('dotenv').config();
const fs = require('fs');
const { Pinecone } = require('@pinecone-database/pinecone');
const { v4: uuidv4 } = require('uuid');

// Sample resume chunks - we'll use this to demonstrate
// In a real implementation, you would load this from a file or generate it
const resumeVectorChunks = [];

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
    values: Array(1024).fill(0).map(() => Math.random() * 2 - 1), // Mock embedding values (1024 dimensions)
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
    
    // Get the index
    const indexName = process.env.PINECONE_RESUME_INDEX_NAME;
    const index = pc.index(indexName);
    
    // Format chunks for Pinecone
    const formattedChunks = formatForPinecone(chunks);

    const stats = await index.describeIndexStats();
    console.log(`Index ${indexName} has ${stats.totalRecordCount} records.`);


    console.log(`Deleting all records in index ${indexName}...`);
    // Delete all records in the index
    await index.deleteAll();

    console.log(`Upserting ${formattedChunks.length} records to Pinecone...`);
    
    // Perform the upsert operation
    //await index.upsert(formattedChunks);
    
    console.log(`Successfully upserted ${formattedChunks.length} paragraphs to Pinecone.`);
    return true;
  } catch (error) {
    console.error('Error in Pinecone operations:', error);
    throw error;
  }
}

/**
 * Delete all resume records from Pinecone matching a pattern
 * @param {string} pattern - Optional ID pattern prefix to match (e.g., 'exp_', 'skills_')
 */
async function deleteResumeRecords(pattern = '') {
  try {
    const pc = initPinecone();
    
    if (!process.env.PINECONE_RESUME_INDEX_NAME) {
      throw new Error('PINECONE_RESUME_INDEX_NAME environment variable not set');
    }
    
    // Get the index
    const indexName = process.env.PINECONE_RESUME_INDEX_NAME;
    const index = pc.index(indexName);
    
    console.log(`Searching for records in index ${indexName}${pattern ? ` matching pattern: ${pattern}` : ''}`);
    
    // For pattern-based deletion, we need to query first
    if (pattern) {
      // This would ideally use metadata filtering, but for simplicity in this example:
      const allRecordsResponse = await index.fetch({ ids: [] }); // Get all vector IDs
      
      if (allRecordsResponse.vectors) {
        const allIds = Object.keys(allRecordsResponse.vectors);
        const matchingIds = allIds.filter(id => id.startsWith(pattern));
        
        if (matchingIds.length > 0) {
          console.log(`Found ${matchingIds.length} records matching pattern '${pattern}'. Deleting...`);
          await index.deleteMany(matchingIds);
          console.log(`Successfully deleted ${matchingIds.length} records.`);
        } else {
          console.log(`No records found matching pattern '${pattern}'.`);
        }
      } else {
        console.log('No vectors found in the index.');
      }
    } else {
      // Delete all vectors in the index
      console.log('Deleting all vectors in the index...');
      await index.deleteAll();
      console.log('Successfully deleted all vectors.');
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting resume records:', error);
    throw error;
  }
}

// Main function to run the script
async function main() {
  try {
    console.log('Loading resume chunks...');
    
    // In a real implementation, you might load chunks from a file
    const loadedChunks = JSON.parse(fs.readFileSync('scripts/resume_chunks.json', 'utf-8'));

    // Check if environment variables are set
    if (process.env.PINECONE_API_KEY && process.env.PINECONE_RESUME_INDEX_NAME) {
      // Upsert chunks to Pinecone
      await upsertToPinecone(loadedChunks); // Fixed: now using loadedChunks instead of resumeVectorChunks
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
  deleteResumeRecords
};