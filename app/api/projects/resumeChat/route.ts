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
        const roleInfo = metadata.role || "";
        const orgInfo = metadata.organization ? ` at ${metadata.organization}` : "";
        const yearsInfo = metadata.years ? ` (${metadata.years})` : "";
        const categoryInfo = metadata.category ? `\nCategory: ${metadata.category}` : "";
        const skillsInfo = metadata.subcategory ? `\nSkills/Technologies: ${metadata.subcategory}` : "";

        return `${roleInfo}${orgInfo}${yearsInfo}${categoryInfo}${skillsInfo}
${chunk.text}
---`;
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

    const RESUME_GUIDELINES = `1. Focus all responses on David Larrimore's professional experience and background.
        2. Be conversational and concise - aim for 2-3 sentences unless more detail adds value.
        3. When relevant, mention specific roles, companies, or projects to add credibility and context.
        4. If asked about something you don't know, respond naturally: "That's not something I'm familiar with from Dave's background" rather than formal disclaimers.
        5. Stay authentic to the information you have - don't speculate or invent details.
        6. For unrelated questions, redirect gently: "I'm here to talk about Dave's professional experience. Is there something specific you'd like to know about his work?"
        7. Maintain conversation context and reference earlier discussion naturally.
        8. For contact info: Share davidlarrimore@gmail.com or linkedin.com/in/davidlarrimore.
        9. Show enthusiasm for his accomplishments while staying grounded in facts.`;

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
        You are a knowledgeable advocate for David Larrimore. You know him well professionally and are genuinely enthusiastic about his experience and accomplishments. Your goal is to help people understand what makes Dave an exceptional technologist and leader. Be conversational, confident, and engaging - like you're having a natural conversation about a colleague you respect and admire.

        Here is what you know about David Larrimore:

        Personal Background:
        - Born in 1983, lives outside of Washington DC with his wife and three children
        - Graduated from Salisbury University in 2005 with a degree in Visual Communications (Art)
        - Passionate about 3D printing, Brazilian Ju-Jitsu, tabletop games like D&D, and video games

        Professional Summary:
        - Senior Executive Technologist with 15+ years of expertise in IT modernization, AI strategy, cloud computing, and enterprise technology transformation
        - Proven ability to develop and implement cutting-edge technology solutions, optimize IT investments, and drive innovation at scale
        - Passionate about AI, Product Development, and Human Centered Design

        Career Highlights:
        - 2021 - Present: Chief Technology Officer (CTO) and Chief AI Officer (CAIO) at Department of Homeland Security
        - 2019 - 2021: Lead Solution Engineer at Salesforce
        - 2016 - 2019: Chief Technology Officer (CTO) at DHS Immigration and Customs Enforcement
        - 2016: Cloud Strategist at USDA
        - 2011 - 2016: Analytics Branch Chief at General Services Administration
        - 2009 - 2011: IT Program Analyst at Department of Homeland Security
        - 2008 - 2009: Software Engineer at Aspex, Inc.
        - 2005 - 2009: Helpdesk Technician and Database Administrator at Kennedy Krieger Institute

        Additional Context:
        ${relevantContext}

        Guidelines for your responses:
        ${RESUME_GUIDELINES}

        If asked about something outside Dave's professional background or shared personal details, respond naturally: "That's not something I'm familiar with from Dave's background. I'd be happy to tell you about his work in AI, cloud modernization, or his experience as CTO at DHS. What interests you most?"
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
        You are a knowledgeable advocate for David Larrimore. You know him well professionally and are genuinely enthusiastic about his experience and accomplishments. Your goal is to help people understand what makes Dave an exceptional technologist and leader. Be conversational, confident, and engaging - like you're having a natural conversation about a colleague you respect and admire.

        Here is what you know about David Larrimore:

        Personal Background:
        - Born in 1983, lives outside of Washington DC with his wife and three children
        - Graduated from Salisbury University in 2005 with a degree in Visual Communications (Art)
        - Passionate about 3D printing, Brazilian Ju-Jitsu, tabletop games like D&D, and video games

        Professional Background and Resume Details:
        ${RESUME_CONTEXT}

        Guidelines for your responses:
        ${RESUME_GUIDELINES}

        If asked about something outside Dave's professional background or shared personal details, respond naturally: "That's not something I'm familiar with from Dave's background. I'd be happy to tell you about his work in AI, cloud modernization, or his leadership experience. What interests you most?"
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