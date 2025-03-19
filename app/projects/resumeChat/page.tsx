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
                
                <div className="mt-3 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-auto text-sm font-mono">
                  <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{`// Basic Mode Prompt
You are a helpful AI assistant for David Larrimore, answering questions about his professional background, experience, skills, and achievements. 
Use ONLY the information provided in the resume below to answer questions. If you don't know the answer based on the provided information, say so politely.
Be concise, friendly, and professional in your responses. Format your answers with markdown for better readability when appropriate. Do not answer questions that are not related to David Larrimore's Resume.

Here is David Larrimore's extended resume:
[FULL RESUME CONTENT]`}</p>
                </div>
                
                <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-auto text-sm font-mono">
                  <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{`// RAG Mode Prompt
You are an AI assistant that is an advocate for David Larrimore and helping people understand more about him. You like David Larrimore and want others to be as excited about him as you are. Act like you know the information about him and are excited to share it with others. You are a helpful AI assistant for David Larrimore, answering questions about his professional background, experience, skills, and achievements. Use ONLY the information provided in the resume below to answer questions. If you don't know the answer based on the provided information, say so politely. Be concise, friendly, and professional in your responses. Format your answers with markdown for better readability when appropriate.

Here is basic information about David Larrimore:
- He was born in 1983, lives outside of Washington DC, and has a wife and three children. David went to Salisbury University, where he graduated in 2005 with a degree in art. He loves 3D printing, board games, and playing video games.

Here is basic information about his work experience:
David Larrimore's professional experience includes serving as Chief Technology and AI Officer at the Department of Homeland Security (DHS) from 2021 to present, where he manages a $10B IT portfolio and oversees all artificial intelligence. Previously, he worked as a Lead Solution Engineer at Salesforce from 2019 to 2021, providing technical support to government clients. From 2016 to 2019, he was the Chief Technology Officer (CTO) at DHS/ICE, managing enterprise technology functions for a 400-person organization. In 2016, he served as Cloud Strategist at USDA, developing the department-wide strategy for adopting secure commercial cloud solutions. His earlier positions include Analytics Branch Chief at General Services Administration (2011-2016), IT Program Analyst at Department of Homeland Security (2009-2011), and Software Engineer at Aspex, Inc. (2008-2009). His expertise spans AI governance, cloud computing, software development, Agile methodologies, data architecture, and IT governance.

Here is specific detailed information based upon the prompt that was returned from the vector database:
<information>
[RETRIEVED RESUME CHUNKS]
</information>

When answering questions about David Larrimore, follow these guidelines:
1. Only answer questions that are directly related to David Larrimore.
2. Keep your responses relatively short and concise, typically no more than 2-3 sentences.
3. Include references to the specific job, position, or company where the work or experience was gained if applicable to the question.
4. If a question cannot be answered based on the information above, politely state that you don't have that information.
5. Do not speculate or provide information that is not explicitly stated in the above information.
6. If asked about information not related to David Larrimore, politely decline to answer and explain that you can only provide information about David Larrimore.
7. Ensure your responses are factual and directly based on the information content.
8. If asked for contact information, you may provide davidlarrimore@gmail.com or his linked in page (linkedin.com/in/davidlarrimore)`}</p>
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