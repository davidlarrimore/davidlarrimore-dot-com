require('dotenv').config();
const { Pinecone } = require('@pinecone-database/pinecone');
const { Anthropic } = require('@anthropic-ai/sdk');

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
  const existingIndexes = await client.listIndexes();
  const indexExists = existingIndexes.indexes?.some(idx => idx.name === indexName);
  
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
    
    // Empty the index if it exists
    console.log(`Emptying existing Pinecone index: ${indexName}`);
    const index = client.Index(indexName);
    await index.deleteAll();
    console.log('Index emptied successfully');
  }
  
  return client.Index(indexName);
};

// Extract the resume content from the API route
const extractResumeContent = () => {
  // This is the resume content from app/api/projects/resumeChat/route.ts
  const resumeContent = `
# David Larrimore - Professional Resume

## Contact Information
- Email: davidlarrimore@gmail.com
- LinkedIn: linkedin.com/in/davidlarrimore

## Profile
Senior Executive Technologist with 15+ years of expertise in IT modernization, AI strategy, cloud computing, and enterprise technology transformation. Proven ability to develop and implement cutting-edge technology solutions, optimize IT investments, and drive innovation at scale. Passionate about AI, Product Development, and Human Centered Design.

## Professional Experience

### Chief Technology and AI Officer
**DHS** | Washington, DC | 2021 - Present

Provided technical oversight and organizational leadership, including the management of artificial intelligence initiatives, for a $10B IT portfolio spanning 22 components and offices within the Department of Homeland Security. Managed a $15M budget and over 100 federal employees.

**Key Achievements:**
- Created DHS Office of the Chief AI Officer organization, including a nationwide hiring initiative that hired 50 AI experts from private sector, government, and academia.
- Led development and implementation of LLM powered Generative AI Chatbot used by 20,000 DHS personnel.
- Developed and implemented department-wide policies and training programs to ensure the safe and responsible adoption of AI technologies, including facial recognition and generative AI.
- Led negotiation and awarded Enterprise User Agreement with Login.gov that has provided over $2.5M in cost avoidance and provided enterprise mechanism to onboard all DHS external onto a unified authentication services providing a streamlined user experience.
- Led the creation of and managed multiple enterprise products, including Cloud SecDevOps toolchain, Generative AI chatbots, and Information sharing platforms.
- Worked directly with major programs across the department to resolve risks and issues by applying problem-solving techniques, risk management strategies, collaboration, and technical oversight.
- Established AI governance frameworks that balanced innovation with ethical considerations, privacy, and security.
- Introduced human-centered design practices across multiple technology initiatives, ensuring solutions met user needs and improved operational efficiency.
- Represented DHS at congressional hearings and industry events, communicating complex technical concepts to diverse audiences.

### Lead Solution Engineer
**Salesforce** | Reston, VA | 2019 - 2021

As a Lead Solution Engineer in one of the fastest growing business units (Global Public Sector) in Salesforce, I provided strategic and tactical account support ranging from small civilian agencies to entire departments blending my federal experience with adaptable technical skills.

**Key Achievements:**
- Provided technical leadership on 52 different opportunities since 2019, totaling over $10 million in revenue.
- Followed human centered design practices and SecDevOps create tailored demonstrations and shareable assets for enterprise use.
- Developed Proofs of Concept for enterprise grade implementations supporting client requirements.
- Led internal Q&A sessions to help federal sales organization understand federal laws, policies, standards, and best practices.
- Worked with government Solution Integrators (SI's) and other partners to ensure solutions led to customer success.
- Created custom demos leveraging Salesforce Lightning Web Components (LWC) and Apex development.
- Implemented complex data integration scenarios using MuleSoft and Salesforce Connect.
- Designed and deployed custom security frameworks for FedRAMP High environments.

### Chief Technology Officer (CTO)
**DHS/ICE** | Washington, DC | 2016 - 2019

As the ICE CTO, I managed all enterprise technology functions (Enterprise Architecture, Data Architecture, Vendor Management), as well as defined and led the technology culture change of a 400-person organization and half a billion dollars in IT Spend.

**Key Achievements:**
- Implemented enterprise-wide multi-cloud General Support System (GSS) leveraging Amazon Web Services and Microsoft Azure.
- Managed the migration of 87 production systems and 133 total environments to cloud in six months providing up-to 75% cost savings on compute costs.
- Developed strategy and led IPT to implement enterprise Application Platform as a Service capability (APaaS) to enable no-code/low-code Rapid Application Development (RAD).
- Implemented enterprise Agile coaching and DevSecOps tools strategy that reduced lead and delivery time on provisioning of new resources by 99%, doubled deployment frequency, and doubled Agile team maturity.
- Designed and implemented enterprise DevSecOps toolchain to enable every OCIO development team with distributed CI/CD, Test Automation, and Cloud Orchestration capabilities.
- Worked with individual systems teams to plan cloud migration, migrate to Open Source technologies, and adopt a DevOps "toolchain".
- Spearheaded a comprehensive data management strategy, including data governance, quality, and analytics capabilities.
- Established strategic vendor relationships, negotiating enterprise agreements that saved over $15M annually.
- Led a digital transformation initiative that modernized legacy systems, improved user experience, and enhanced operational efficiency.

### Cloud Strategist
**USDA** | Washington, DC | 2016

As the Cloud Strategist in the OCIO Cloud Strategy and Policy division, I was responsible for planning and executing the department-wide strategy for adopting secure commercial cloud solutions.

**Key Achievements:**
- Built coalitions with department level engineering, networking, and security leadership to develop a common-sense approach to incrementally adopting commercial cloud solutions.
- Engaged USDA enterprise shared service providers to evaluate and certify commercial cloud ready shared services that can be leveraged by all USDA customer Agencies.
- Led working groups and integrated project teams to develop enterprise cloud policy and guidance that identified areas of trust and flexibility for USDA customer Agencies to drastically reduce the acquisition and securing of commercial cloud solutions while still ensuring security and compliance.
- Worked directly with USDA Customer Agencies to identify common commercial cloud service needs and provide necessary expertise.
- Authored the USDA Cloud Strategy document that established a roadmap for cloud adoption across 29 agencies and offices.
- Designed cloud migration patterns and reference architectures for various application types.
- Established a Cloud Center of Excellence that provided training and consultation services to USDA components.

### Analytics Branch Chief
**General Services Administration** | Washington, DC | 2011 - 2016

Led a team of data scientists and developers responsible for building analytics capabilities across GSA's acquisition systems.

**Key Achievements:**
- Established GSA's first data science team, recruiting and mentoring diverse talent.
- Architected and implemented a data lake solution that integrated data from 15+ disparate systems.
- Developed automated reporting solutions that saved over 2,000 staff hours annually.
- Created predictive models for procurement fraud detection, achieving 85% accuracy.
- Led the implementation of visualization tools that improved data-driven decision making across the organization.
- Collaborated with other federal agencies to share best practices in data analytics and visualization.

### IT Program Analyst
**Department of Homeland Security** | Washington, DC | 2009 - 2011

Managed IT portfolio analysis and technology assessment for enterprise applications.

**Key Achievements:**
- Conducted technology assessments for major IT investments totaling over $200M.
- Developed and implemented portfolio management tools and processes.
- Led cross-functional teams in requirements gathering and solution evaluation.
- Created dashboards and reports for executive decision-making.

### Software Engineer
**Aspex, Inc.** | Washington, DC | 2008 - 2009

Developed custom software solutions for federal government clients.

**Key Achievements:**
- Designed and implemented web-based applications using Java, Spring, and Hibernate.
- Developed RESTful web services for system integration.
- Created automated testing frameworks to improve software quality.
- Collaborated in Agile development teams to deliver solutions on time and within budget.

## Education
- **Master of Science in Information Systems**, The George Washington University
- **Bachelor of Science in Computer Science**, University of Maryland

## Technical Expertise

### AI & Machine Learning
- AI governance and responsible use frameworks
- Generative AI and large language models (LLMs)
- ML model development and productionization
- Computer vision and natural language processing
- Facial Recognition Technology (FRT)
- AI automation and workflow optimization

### Cloud Computing
- AWS (Advanced Solutions Architect knowledge)
- Microsoft Azure (Solutions Architect experience)
- Multi-cloud architecture and management
- Cloud security and compliance (FedRAMP, NIST)
- Containerization and orchestration (Docker, Kubernetes)
- Serverless architecture
- Cloud cost optimization and FinOps

### Software Development & Engineering
- Open Source technologies and communities
- Python, Java, JavaScript
- Node.js, React, Next.js
- Apex (Salesforce)
- SQL and NoSQL databases
- API development and integration
- Full-stack development
- Mobile application architecture

### Agile & DevSecOps
- Scaled Agile Framework (SAFe)
- Agile coaching and team leadership
- CI/CD pipeline design and implementation
- Test automation and quality engineering
- Infrastructure as Code (IaC)
- Security automation and compliance as code
- DevSecOps toolchain integration

### Data Architecture & Analytics
- Big Data platforms (Hadoop, Hortonworks)
- Business Intelligence tools (Tableau, MicroStrategy)
- Data Warehousing and ETL processes
- SQL and SQL-based analytics
- NoSQL databases (MongoDB, DynamoDB)
- Data governance and quality management
- Predictive analytics and machine learning

### IT Governance & Enterprise Architecture
- Technical reference models and standards
- IT portfolio management and optimization
- Automated governance and compliance
- IT acquisition strategy and vendor management
- Technology roadmap development
- Digital transformation leadership
- Enterprise solution architecture

## Recent Awards
- Presidential Rank Award, 2025 (Nominated)
- GovExec The Federal 100 Award, 2025
- Under Secretary's Award for Special Achievement, 2024
- Washington Exec, Pinnacle Cloud Executive of the Year, 2024
- Washington Exec, Top Exec to Watch, 2024
- DHS Secretary's Award for Excellence, 2023
- FedScoop 50 Award for Federal Leadership, 2022
- FedScoop 50 Award for Innovation of the Year, 2018
- Federal Computer Week Fed 100 Award, 2017

## Publications & Speaking Engagements
- "Responsible AI Implementation in Government," Government Executive, 2024
- "Cloud Migration Strategies for Legacy Systems," Cloud Computing Summit, 2023
- "DevSecOps in Highly Regulated Environments," DevOps Enterprise Summit, 2022
- "The Future of AI in Federal Government," AFCEA Symposium, 2022
- "Data-Driven Decision Making in Public Sector," Data Summit, 2021
- "Agile Transformation in Federal IT," Agile Government Leadership Conference, 2020
- "Cloud Adoption Framework for Federal Agencies," AWS Public Sector Summit, 2019

## Skills
- Project/Program Management: 95%
- Devops Automation: 85%
- System and Data Architecture: 85%
- Large Language Models (LLMs) & GenAI: 90%
- Machine Learning: 60%
- Modern Software Development: 90%
- Practical Technical Skills: 75%
- Cloud Architecture: 75%
- Problem Solving: 95%
- Product Development: 85%

## Other Technical Skills
- Python
- AWS/Azure
- Docker/Kubernetes
- Oracle
- PostGres
- Linux
- GIT
- SCRUM
- Javascript
- Node.js
- API Development
- Data Visualization
`;

  return resumeContent;
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
    
    const INDEX_NAME = process.env.PINECONE_INDEX_NAME || 'davidlarrimore-resume';
    console.log(`Using index name: ${INDEX_NAME}`);
    
    const index = await getOrCreateIndex(pinecone, INDEX_NAME);
    
    // Extract resume content
    console.log('Extracting resume content...');
    const resumeContent = extractResumeContent();
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