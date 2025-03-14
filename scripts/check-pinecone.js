require('dotenv').config();
const { Pinecone } = require('@pinecone-database/pinecone');

// Initialize Pinecone client
const initPinecone = async () => {
  if (!process.env.PINECONE_API_KEY) {
    throw new Error('PINECONE_API_KEY environment variable not set');
  }

  return new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });
};

// Main function to check Pinecone status
const main = async () => {
  try {
    console.log('Initializing Pinecone client...');
    const pinecone = await initPinecone();
    
    console.log('Fetching list of indexes...');
    const indexesResponse = await pinecone.listIndexes();
    
    // The Pinecone SDK v2+ returns an object with indexes as an array property
    const indexes = indexesResponse.indexes || [];
    
    console.log('\n===== Pinecone Indexes =====');
    if (!indexes.length) {
      console.log('No indexes found in your Pinecone account.');
    } else {
      console.log(`Found ${indexes.length} index(es):`);
      for (const index of indexes) {
        console.log(`\n- Index Name: ${index.name}`);
        
        try {
          // Fetch description
          const indexDescription = await pinecone.describeIndex(index.name);
          console.log(`  Status: ${indexDescription.status}`);
          console.log(`  Dimension: ${indexDescription.dimension}`);
          console.log(`  Metric: ${indexDescription.metric}`);
          console.log(`  Host: ${indexDescription.host || 'N/A'}`);
          
          // Get index stats
          const indexInstance = pinecone.index(index.name);
          const stats = await indexInstance.describeIndexStats();
          
          console.log(`  Total Vector Count: ${stats.totalVectorCount || 0}`);
          
          // Handle namespaces if available
          const namespaces = stats.namespaces ? Object.keys(stats.namespaces) : [];
          console.log(`  Namespaces: ${namespaces.length ? namespaces.join(', ') : 'default'}`);
          
          // Check if this is the index configured in .env
          const envIndexName = process.env.PINECONE_INDEX_NAME || 'resume-index';
          if (index.name === envIndexName) {
            console.log(`  ✅ This is your configured index (PINECONE_INDEX_NAME=${envIndexName})`);
          }
        } catch (error) {
          console.error(`  Error getting details for index ${index.name}:`, error.message);
        }
      }
    }
    
    // Check environment variable
    const envIndexName = process.env.PINECONE_INDEX_NAME || 'resume-index';
    console.log(`\nYour .env is configured to use index: "${envIndexName}"`);
    
    const indexExists = indexes.some(idx => idx.name === envIndexName);
    if (!indexExists) {
      console.log(`⚠️ Warning: The index "${envIndexName}" does not exist yet.`);
      console.log('Run the initialization script to create it:');
      console.log('  npm run init-pinecone');
    }
    
    console.log('\n===== Pinecone Status Check Complete =====');
  } catch (error) {
    console.error('Error checking Pinecone status:', error);
    process.exit(1);
  }
};

main();