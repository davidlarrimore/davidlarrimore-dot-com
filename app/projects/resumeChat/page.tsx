import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Metadata } from "next";
import ResumeChatInterface from "../../components/ResumeChatInterface";

export const metadata: Metadata = {
  title: "David Larrimore | Resume Chatbot",
  description: "Chat with an AI assistant to learn more about David Larrimore's professional experience, skills, and background",
};

export default function ChatPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen bg-gray-50 dark:bg-gray-600">
        <div className="px-4 mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Resume <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Chatbot</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Ask any questions about my professional experience, skills, or background. 
              Try both modes - Basic and RAG (Retrieval-Augmented Generation) - to see how different AI approaches affect responses.
            </p>
          </div>
          
          <ResumeChatInterface />
          
          {/* New Information Section */}
          <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              About This Project
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  How It Was Built
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  This Resume Chatbot was built using Node, Next.js, Tailwind CSS, Pinecone (Vector Store) and Anthropic's Claude AI. The application 
                  features two different operational modes that demonstrate different approaches to AI-powered chat:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>
                    <strong>Basic Mode:</strong> Sends my entire resume as context to Claude with each user query, allowing 
                    the AI to reference all information.
                  </li>
                  <li>
                    <strong>RAG Mode:</strong> Uses Pinecone vector database to store embeddings of my resume chunks. When you ask 
                    a question, it retrieves only the most relevant sections and sends those as context to Claude.
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  Technical Implementation
                </h3>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>
                    <strong>Frontend:</strong> React components with client-side state management using the useState hook.
                  </li>
                  <li>
                    <strong>API Routes:</strong> Next.js API routes to handle communication with Anthropic's Claude API.
                  </li>
                  <li>
                    <strong>RAG Architecture:</strong> Resume data is chunked, embedded, and stored in Pinecone's vector 
                    database for semantic search.
                  </li>
                  <li>
                    <strong>Response Rendering:</strong> ReactMarkdown for formatting Claude's responses with proper 
                    typography and styling.
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  Claude AI Prompt Details
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  The system prompt sent to Claude varies based on the mode selected:
                </p>
                
                <div className="mt-3 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-auto text-sm">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Basic Mode Prompt Structure:</h4>
                  <ul className="list-disc pl-5 text-gray-800 dark:text-gray-200 space-y-1">
                    <li>Defines the assistant's role as a helpful resource for questions about David's professional background</li>
                    <li>Instructs the AI to use only information from the provided resume</li>
                    <li>Sets expectations for response style: concise, friendly, and professional</li>
                    <li>Includes formatting guidelines for better readability</li>
                    <li>Provides the complete resume content as context for every question</li>
                  </ul>
                </div>
                
                <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-auto text-sm">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">RAG Mode Prompt Structure:</h4>
                  <ul className="list-disc pl-5 text-gray-800 dark:text-gray-200 space-y-1">
                    <li>Sets a more conversational, enthusiastic tone for the assistant</li>
                    <li>Includes basic biographical information about David</li>
                    <li>Provides a high-level summary of his career progression</li>
                    <li>Incorporates contextually relevant resume chunks retrieved from the vector database based on your question</li>
                    <li>Features specific guidelines for answer length, accuracy, and relevance</li>
                    <li>Includes instructions for handling questions outside the scope of available information</li>
                    <li>Emphasizes factual responses based only on the information provided</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  Why Explore Both Modes?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Comparing the responses from Basic and RAG modes demonstrates the tradeoffs in AI systems. RAG mode can provide more precise 
                  answers by focusing only on relevant information, which can reduce hallucinations and improve answer quality. However, it 
                  may sometimes miss context from other sections that could be valuable. Basic mode has all information available but might 
                  include irrelevant details or get distracted by unrelated information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}