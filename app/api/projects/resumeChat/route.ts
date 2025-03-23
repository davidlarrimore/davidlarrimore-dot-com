// app/api/projects/resumeChat/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import fs from 'fs';
import path from 'path';

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
        topK: 15,
        inputs: { text: query },
      },
      fields: [
        "text",
        "section",
        "organization",
        "role",
        "category",
        "years",
      ],
    });
    console.log("Number of Hits:", response.result.hits.length);

    // Extract retrieved chunks with their metadata
    const retrievedChunks = response.result.hits.map((hit) => ({
      text: (hit.fields as { text: string }).text,
      score: hit._score,
      metadata: {
        section: (hit.fields as any).section || "",
        organization: (hit.fields as any).organization || "",
        role: (hit.fields as any).role || "",
        category: (hit.fields as any).category || "",
        subcategory: (hit.fields as any).subcategory || "",
        years: (hit.fields as any).years || "",
      },
    }));

    let concatenatedText = retrievedChunks
      .map((chunk) => {
        const metadata = chunk.metadata;
        return `---------------------
            ${metadata.section || "N/A"} Item: 
            Company: ${metadata.organization || "N/A"}
            Title: ${metadata.role || "N/A"}
            Category: ${metadata.category || "N/A"}
            Skills or Technology Learned/Used: ${metadata.subcategory || "N/A"}
            Years: ${metadata.years || "N/A"}
            Summary: ${chunk.text}`;
      })
      .join("\n\n");

    //console.log("Responses with metadata:", concatenatedText);

    return {
      text: concatenatedText,
      chunks: retrievedChunks,
    };
  } catch (error) {
    console.error("Error querying Pinecone:", error);
    return {
      text: "",
      chunks: [],
    };
  }
};

// Function to load resume content from markdown file
const loadResumeContent = (): string => {
  try {
    // Path to the resume markdown file
    const resumePath = path.join(process.cwd(), 'public', 'files', 'resume.md');
    
    // Read the file synchronously
    const resumeContent = fs.readFileSync(resumePath, 'utf8');
    
    console.log("Resume content loaded successfully");
    return resumeContent;
  } catch (error) {
    console.error("Error loading resume markdown file:", error);
    // If there's an error loading the file, return a fallback message
    return "Error loading resume content. Please check if the resume.md file exists in the public/files directory.";
  }
};

// Anthropic API configuration
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";

// Function to extract the last N messages from the conversation
// for context without exceeding token limits
const getConversationContext = (messages: any[], maxMessages = 10) => {
  // Get the most recent messages, limited by maxMessages
  return messages.slice(-maxMessages);
};

export async function POST(request: NextRequest) {
  try {
    let { messages, version = "basic" } = await request.json();

    if (!ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "Anthropic API key is not configured" },
        { status: 500 }
      );
    }

    // Get only the user's most recent message for query purposes
    const latestUserMessage =
      messages.filter((msg: any) => msg.role === "user").pop()?.content || "";

    // Get a limited context of the conversation for Claude
    const conversationContext = getConversationContext(messages);

    // Format the conversation history for Claude
    const formattedMessages = conversationContext.map((msg: any) => ({
      role: msg.role,
      content: msg.content,
    }));

    const RESUME_GUIDELINES = `1. Only answer questions that are directly related to David Larrimore.
        2. Keep your responses relatively short and concise, typically no more than 2-3 sentences.
        3. Include references to the specific job, position, or company where the work or experience was gained if applicable to the question.
        4. If a question cannot be answered based on the information above, politely state that you don't have that information.
        5. Do not speculate or provide information that is not explicitly stated in the above information.
        6. If asked about information not related to David Larrimore, politely decline to answer and explain that you can only provide information about David Larrimore.
        7. Ensure your responses are factual and directly based on the information content.
        8. If asked for contact information, you may provide davidlarrimore@gmail.com or his linked in page (linkedin.com/in/davidlarrimore)
        9. Remember previous parts of the conversation when answering follow-up questions.`;

    // Initialize the system prompt
    let systemPrompt = "";
    let retrievedChunks: {
      text: string;
      score: number;
      metadata: {
        section: string;
        organization: string;
        role: string;
        category: string;
        years: string;
      };
    }[] = [];

    if (version === "rag") {
      // RAG approach: query Pinecone for relevant chunks
      try {
        console.log("Using RAG approach with Pinecone retrieval");
        const result = await getRelevantResumeChunks(latestUserMessage);
        const relevantContext = result.text;
        console.log("Relevant context from Pinecone:", relevantContext);
        retrievedChunks = result.chunks;

        console.log("Relevant context from Pinecone:", relevantContext);
        // Use retrieved context if available, otherwise fall back to full resume

        systemPrompt = `
        You are an AI assistant that is an advocate for David Larrimore and helping people understand more about him. You like David Larrimore and want others to be as excited about him as you are. Act like you know the information about him and are excited to share it with others. You are a helpful AI assistant for David Larrimore, answering questions about his professional background, experience, skills, and achievements. Use ONLY the information provided in the information below to answer questions. If you don't know the answer based on the provided information, say so politely. Be concise, friendly, and professional in your responses. Format your answers with markdown for better readability when appropriate
        
        Here is basic information about David Larrimore:
        - He was born in 1983, lives outside of Washington DC, and has a wife and three children. David went to Salisbury University, where he graduated in 2005 with a degree in Visual Communications (Art). He loves 3D printing, Brazilian Ju-Jitsu, tabletop games like D&D, and playing video games.
        - He is a Senior Executive Technologist with 15+ years of expertise in IT modernization, AI strategy, cloud computing, and enterprise technology transformation. Proven ability to develop and implement cutting-edge technology solutions, optimize IT investments, and drive innovation at scale. Passionate about AI, Product Development, and Human Centered Design.
          
        Here is basic information about his work experience:
        - Years: 2021 - Present, Company: Department of Homeland Security, Title: Chief Technology Officer (CTO) and Chief AI Officer (CAIO)
        - Years: 2019 - 2021, Company: Salesforce, Title: Lead Solution Engineer
        - Years: 2016 - 2019, Company: DHS Immigration and Customs Enforcement, Title: Chief Technology Officer (CTO)
        - Years: 2016 - 2016, Company: USDA, Title: Cloud Strategist
        - Years: 2011 - 2016, Company: General Services Administration, Title: Analytics Branch Chief
        - Years: 2009 - 2011, Company: Department of Homeland Security, Title: IT Program Analyst
        - Years: 2008 - 2009, Company: Aspex, Inc., Title: Software Engineer
        - Years: 2005 - 2009, Company: Kennedy Krieger Institute, Title: Helpdesk Technician and Database Administrator

        Here is specific detailed information based upon the prompt:
        <information>
        ${relevantContext}
        </information>

        When answering questions about David Larrimore, follow these guidelines:
        <guidelines>
        ${RESUME_GUIDELINES}
        <guidelines>

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
      
      // Load resume content from markdown file
      console.log("Loading resume content...");
      const RESUME_CONTEXT = loadResumeContent();

      systemPrompt = `
        You are an AI assistant that is an advocate for David Larrimore and helping people understand more about him. You like David Larrimore and want others to be as excited about him as you are. Act like you know the information about him and are excited to share it with others. You are a helpful AI assistant for David Larrimore, answering questions about his professional background, experience, skills, and achievements. Use ONLY the information provided in the information below to answer questions. If you don't know the answer based on the provided information, say so politely. Be concise, friendly, and professional in your responses. Format your answers with markdown for better readability when appropriate
        
        Here is basic information about David Larrimore:
        - He was born in 1983, lives outside of Washington DC, and has a wife and three children. David went to Salisbury University, where he graduated in 2005 with a degree in Visual Communications (Art). He loves 3D printing, Brazilian Ju-Jitsu, tabletop games like D&D, and playing video games.

        Here is more information about David from is Resume:
        ${RESUME_CONTEXT}

        When answering questions about David Larrimore, follow these guidelines:
        <guidelines>
        ${RESUME_GUIDELINES}
        <guidelines>
        `;
    }

    console.log(`System prompt length: ${systemPrompt.length} characters`);

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
        messages: formattedMessages,
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

    return NextResponse.json({
      message: assistantMessage,
      retrievedChunks: version === "rag" ? retrievedChunks : null,
    });
  } catch (error) {
    console.error("Error in chat route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}