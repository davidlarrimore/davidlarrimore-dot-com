// app/api/projects/resumeChat/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";

// Initialize Pinecone client
const initPinecone = async () => {
  if (!process.env.PINECONE_API_KEY) {
    throw new Error("PINECONE_API_KEY environment variable not set");
  }

  return new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });
};

// Query Pinecone for relevant resume chunks
const getRelevantResumeChunks = async (query: string) => {
  console.log("Querying Pinecone for relevant resume chunks:", query);

  try {
    const pinecone = await initPinecone();
    const namespace = pinecone
      .index(
        process.env.PINECONE_RESUME_INDEX_NAME || "davidlarrimore-resume",
        process.env.PINECONE_RESUME_INDEX_HOST
      )
      .namespace("default");

    const response = await namespace.searchRecords({
      query: {
        topK: 10,
        inputs: { text: query },
      },
      fields: [
        "text",
        "section",
        "organization",
        "role",
        "achievement_type",
        "category",
        "years",
      ],
    });
    console.log("Number of Hits:", response.result.hits.length);
    let responses = response.result.hits
      .map((hit) => (hit.fields as { text: string }).text)
      .join("\n");
    console.log("Responses:", responses);
    return responses;
  } catch (error) {
    console.error("Error querying Pinecone:", error);
    return "";
  }
};

// This is the extended resume content that Claude will use to answer questions

const RESUME_CONTEXT = `
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

// Anthropic API configuration
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";

export async function POST(request: NextRequest) {
  try {
    let { messages, version = "basic" } = await request.json();

    if (!ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "Anthropic API key is not configured" },
        { status: 500 }
      );
    }

    // Get only the user's most recent message
    const userMessage =
      messages.filter((msg: any) => msg.role === "user").pop()?.content || "";

    // Initialize the system prompt
    let systemPrompt = "";

    if (version === "rag") {
      // RAG approach: query Pinecone for relevant chunks
      try {
        console.log("Using RAG approach with Pinecone retrieval");
        const relevantContext = await getRelevantResumeChunks(userMessage);

        console.log("Relevant context from Pinecone:", relevantContext);
        // Use retrieved context if available, otherwise fall back to full resume

        systemPrompt = systemPrompt = `
        You are an AI assistant that is an advocate for David Larrimore and helping people understand more about him. You like David Larrimore and want others to be as excited about him as you are. Act like you know the information about him and are excited to share it with others. You are a helpful AI assistant for David Larrimore, answering questions about his professional background, experience, skills, and achievements. Use ONLY the information provided in the resume below to answer questions. If you don't know the answer based on the provided information, say so politely. Be concise, friendly, and professional in your responses. Format your answers with markdown for better readability when appropriate
        
        Here is basic information about David Larrimore:
        - He was born in 1983, lives outside of Washington DC, and has a wife and three children. David went to Salisbury University, where he graduated in 2005 with a degree in art. He loves 3D printing, board games, and playing video games.

        Here is basic information about his work experience:
        David Larrimore's professional experience includes serving as Chief Technology and AI Officer at the Department of Homeland Security (DHS) from 2021 to present, where he manages a $10B IT portfolio and oversees all artificial intelligence. Previously, he worked as a Lead Solution Engineer at Salesforce from 2019 to 2021, providing technical support to government clients. From 2016 to 2019, he was the Chief Technology Officer (CTO) at DHS/ICE, managing enterprise technology functions for a 400-person organization. In 2016, he served as Cloud Strategist at USDA, developing the department-wide strategy for adopting secure commercial cloud solutions. His earlier positions include Analytics Branch Chief at General Services Administration (2011-2016), IT Program Analyst at Department of Homeland Security (2009-2011), and Software Engineer at Aspex, Inc. (2008-2009). His expertise spans AI governance, cloud computing, software development, Agile methodologies, data architecture, and IT governance.
        
        Here is specific detailed information based upon the prompt that was returned from the vector database:
        <information>
        ${relevantContext}
        </information>

        When answering questions about David Larrimore, follow these guidelines:
        1. Only answer questions that are directly related to David Larrimore.
        2. Keep your responses relatively short and concise, typically no more than 2-3 sentences.
        3. Include references to the specific job, position, or company where the work or experience was gained if applicable to the question.
        4. If a question cannot be answered based on the information above, politely state that you don't have that information.
        5. Do not speculate or provide information that is not explicitly stated in the above information.
        6. If asked about information not related to David Larrimore, politely decline to answer and explain that you can only provide information about David Larrimore.
        7. Ensure your responses are factual and directly based on the information content.
        8. If asked for contact information, you may provide davidlarrimore@gmail.com or his linked in page (linkedin.com/in/davidlarrimore)

        If you cannot answer a question based on the information or if it's out of scope, use this format:
          I'm sorry, but I don't have that information about that David Larrimore. I can only provide details about his professional experience, skills, and education that he has provided.
        `;
      } catch (error) {
        console.error("Error with RAG implementation:", error);
        // Fall back to basic mode if RAG fails
        version = "basic";
      }
    }

    // If not RAG or if RAG failed, use basic approach
    if (version !== "rag" || !systemPrompt) {
      console.log("Using basic approach with full resume context");
      systemPrompt = `
        You are a helpful AI assistant for David Larrimore, answering questions about his professional background, experience, skills, and achievements. 
        Use ONLY the information provided in the resume below to answer questions. If you don't know the answer based on the provided information, say so politely.
        Be concise, friendly, and professional in your responses. Format your answers with markdown for better readability when appropriate. Do not answer questions that are not related to David Larrimore's Resume.

        Here is David Larrimore's extended resume:
        ${RESUME_CONTEXT}
        `;

    }

    console.log(`Systemprompt: ${systemPrompt}`);
    // Call the Anthropic Claude API
    const response = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307",
        max_tokens: 1024,
        system: systemPrompt,
        messages: [
          {
            role: "user",
            content: userMessage,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Anthropic API Error:", errorData);
      return NextResponse.json(
        { error: "Error communicating with AI service" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const assistantMessage = data.content[0].text;

    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    console.error("Error in chat route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
