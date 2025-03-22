// app/api/projects/scavenger-hunt/chat/route.ts
import { NextRequest, NextResponse } from "next/server";

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
    const { messages, context = "" } = await request.json();

    if (!ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "Anthropic API key is not configured" },
        { status: 500 }
      );
    }

    // Get a limited context of the conversation for Claude
    const conversationContext = getConversationContext(messages);
    
    // Format the conversation history for Claude
    const formattedMessages = conversationContext.map((msg: any) => ({
      role: msg.role,
      content: msg.content
    }));

    // Initialize the system prompt
    let systemPrompt = `
      You are a helpful AI assistant participating in an AI Scavenger Hunt game. Your role is to help the player find information and 
      solve challenges. Respond to their questions with accurate and helpful information in a friendly, encouraging manner.
      
      For this specific challenge, the player is trying to: ${context || "Find information to solve a puzzle or challenge."}
      
      Guidelines:
      1. Be helpful, but don't directly give away answers unless the player has clearly worked for it.
      2. If the player seems stuck, offer gentle hints rather than full solutions.
      3. Be conversational and engaging, making this a fun learning experience.
      4. When sharing information, be accurate and precise.
      5. Format your answers clearly, using markdown for better readability when beneficial.
      
      Remember: The goal is to help them learn prompt engineering and information extraction skills while having fun!
    `;

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

    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    console.error("Error in chat route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}