require('dotenv').config();
const { Pinecone } = require('@pinecone-database/pinecone');
const fs = require('fs');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Initialize Pinecone client
const initPinecone = async () => {
  if (!process.env.PINECONE_API_KEY) {
    throw new Error('PINECONE_API_KEY environment variable not set');
  }

  return new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });
};

// Get or create Pinecone index
const getOrCreateIndex = async (client, indexName, dimension = 1536) => {
  // List all indexes to check if our index exists
  const indexesResponse = await client.listIndexes();
  const existingIndexes = indexesResponse.indexes || [];
  const indexExists = existingIndexes.some(idx => idx.name === indexName);
  
  if (!indexExists) {
    console.log(`Creating new Pinecone index: ${indexName}`);
    // Create the index
    await client.createIndex({
      name: indexName,
      dimension: dimension,
      metric: 'cosine',
    });
    
    // Wait for the index to be ready
    console.log('Waiting for index to be ready...');
    let isReady = false;
    while (!isReady) {
      try {
        const indexDescription = await client.describeIndex(indexName);
        if (indexDescription.status === 'Ready') {
          isReady = true;
          console.log('Index is ready!');
        } else {
          console.log('Index is still being created, waiting...');
          await new Promise(resolve => setTimeout(resolve, 5000));
        }
      } catch (e) {
        console.log('Error checking index status, retrying...', e);
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
  } else {
    console.log(`Using existing Pinecone index: ${indexName}`);
  }
  
  return client.index(indexName);
};

// Process resume content into chunks
const processResumeIntoChunks = (resumeContent, chunkSize = 1000, overlapSize = 200) => {
  const chunks = [];
  const lines = resumeContent.split('\n');
  let currentChunk = '';
  
  for (const line of lines) {
    // If adding this line would make the chunk too large
    if (currentChunk.length + line.length > chunkSize && currentChunk.length > 0) {
      // Add the current chunk to the list
      chunks.push(currentChunk);
      // Start a new chunk with overlap from the previous one
      const lastPart = currentChunk.split(' ').slice(-20).join(' ');
      currentChunk = lastPart + '\n' + line;
    } else {
      // Add the line to the current chunk
      currentChunk += (currentChunk.length > 0 ? '\n' : '') + line;
    }
  }
  
  // Add the last chunk if it's not empty
  if (currentChunk.length > 0) {
    chunks.push(currentChunk);
  }
  
  return chunks.map((chunk, index) => ({
    id: `resume-chunk-${index}`,
    text: chunk,
    metadata: {
      source: 'resume',
      chunkIndex: index
    }
  }));
};

// Get embeddings for text chunks using Claude API
const getEmbeddings = async (chunks) => {
  const embeddingsWithMetadata = [];
  
  for (const chunk of chunks) {
    try {
      // Using Claude's embedding API
      const response = await anthropic.embeddings.create({
        model: "claude-3-haiku-20240307",
        input: chunk.text,
      });
      
      const embedding = response.embedding;
      
      embeddingsWithMetadata.push({
        id: chunk.id,
        values: embedding,
        metadata: {
          ...chunk.metadata,
          text: chunk.text,
        },
      });
      
      console.log(`Processed chunk ${chunk.id}`);
      
      // Adding a small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (error) {
      console.error(`Error getting embedding for chunk ${chunk.id}:`, error);
      // Wait longer if we hit rate limits
      if (error.status === 429) {
        console.log('Rate limit hit, waiting 10 seconds before retrying...');
        await new Promise(resolve => setTimeout(resolve, 10000));
        // Retry this chunk
        try {
          const response = await anthropic.embeddings.create({
            model: "claude-3-haiku-20240307",
            input: chunk.text,
          });
          
          const embedding = response.embedding;
          
          embeddingsWithMetadata.push({
            id: chunk.id,
            values: embedding,
            metadata: {
              ...chunk.metadata,
              text: chunk.text,
            },
          });
          
          console.log(`Processed chunk ${chunk.id} after retry`);
        } catch (retryError) {
          console.error(`Failed to process chunk ${chunk.id} after retry:`, retryError);
        }
      }
    }
  }
  
  return embeddingsWithMetadata;
};

// Main function to run the script
const main = async () => {
  try {
    // Check for Anthropic API key
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY environment variable not set. Please set it in your .env file.');
    }
    
    console.log('Initializing Pinecone...');
    const pinecone = await initPinecone();
    
    const INDEX_NAME = process.env.PINECONE_INDEX_NAME || 'resume-index';
    console.log(`Using index name: ${INDEX_NAME}`);
    
    const index = await getOrCreateIndex(pinecone, INDEX_NAME);
    
    // Read resume content from the API route file
    const resumeFilePath = path.join(process.cwd(), 'app', 'api', 'resumeChat', 'route.ts');
    const resumeFileContent = fs.readFileSync(resumeFilePath, 'utf8');
    
    // Extract the resume content from the file
    const resumeMatch = resumeFileContent.match(/const RESUME_CONTEXT = `([\s\S]*?)`/);
    if (!resumeMatch || !resumeMatch[1]) {
      throw new Error('Could not find resume content in the file');
    }
    
    const resumeContent = resumeMatch[1].trim();
    console.log('Resume content extracted successfully');
    
    // Process resume into chunks
    console.log('Processing resume into chunks...');
    const chunks = processResumeIntoChunks(resumeContent);
    console.log(`Created ${chunks.length} chunks from resume`);
    
    // Get embeddings for chunks
    console.log('Generating embeddings using Claude API...');
    const embeddings = await getEmbeddings(chunks);
    console.log(`Generated ${embeddings.length} embeddings`);
    
    // Upsert embeddings into Pinecone
    console.log('Upserting embeddings into Pinecone...');
    await index.upsert(embeddings);
    
    console.log('Successfully inserted resume data into Pinecone!');
  } catch (error) {
    console.error('Error initializing Pinecone:', error);
    process.exit(1);
  }
};

main();