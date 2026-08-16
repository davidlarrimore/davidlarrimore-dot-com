import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";
import { Metadata } from "next";
import ResumeChatInterface from "../../components/ResumeChatInterface";
import Card from "../../components/ds/Card";
import Eyebrow from "../../components/ds/Eyebrow";
import Tag from "../../components/ds/Tag";

export const metadata: Metadata = {
  title: "David Larrimore | Resume Chatbot",
  description: "Chat with an AI assistant to learn more about David Larrimore's professional experience, skills, and background",
};

export default function ChatPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh" }}>
        <div className="px-5 md:px-10 py-16 md:py-20" style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <Eyebrow>// projects · resume chatbot</Eyebrow>
          <div style={{ font: "var(--text-h1)", letterSpacing: "var(--tracking-tight)", color: "var(--fg)", marginBottom: 16 }}>
            Resume Chatbot
          </div>
          <div style={{ font: "var(--text-body-lg)", color: "var(--fg-secondary)", maxWidth: 640, marginBottom: 20 }}>
            Ask any questions about my professional experience, skills, or background. Try both modes — Basic and RAG
            (Retrieval-Augmented Generation) — to see how different AI approaches affect responses.
          </div>
          <div className="flex flex-wrap gap-2 mb-12">
            <Tag variant="blue">Claude AI</Tag>
            <Tag variant="blue">Next.js</Tag>
            <Tag variant="blue">React</Tag>
          </div>

          <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start mb-16">
            <ResumeChatInterface />
            <Card>
              <Eyebrow color="var(--fg-muted)">// how it works</Eyebrow>
              <div style={{ font: "14px/1.6 var(--font-sans)", color: "var(--fg-secondary)", marginBottom: 20 }}>
                Claude is grounded in my résumé content, so it answers in my voice — roles, skills, awards, and the
                occasional hobby detail. Basic mode sends the whole résumé as context; RAG mode retrieves only the
                most relevant chunks from Pinecone for each question.
              </div>
              <Link
                href="/resume"
                style={{ font: "12px var(--font-mono)", textTransform: "uppercase", letterSpacing: "var(--tracking-wide)", color: "var(--accent-hover)" }}
              >
                ← Back to Résumé
              </Link>
            </Card>
          </div>

          {/* About This Project */}
          <Eyebrow>// about this project</Eyebrow>
          <div style={{ font: "var(--text-h2)", color: "var(--fg)", marginBottom: 32 }}>How it was built</div>

          <div className="grid md:grid-cols-2 gap-10 mb-12">
            <div>
              <div style={{ font: "600 15px var(--font-sans)", color: "var(--accent-hover)", marginBottom: 10 }}>
                How It Was Built
              </div>
              <p style={{ font: "14px/1.6 var(--font-sans)", color: "var(--fg-secondary)", marginBottom: 12 }}>
                This Resume Chatbot was built using Node, Next.js, Tailwind CSS, Pinecone (Vector Store) and
                Anthropic&apos;s Claude AI. The application features two different operational modes that demonstrate
                different approaches to AI-powered chat:
              </p>
              <ul className="list-disc pl-5 space-y-2" style={{ font: "14px/1.6 var(--font-sans)", color: "var(--fg-secondary)" }}>
                <li>
                  <strong style={{ color: "var(--fg)" }}>Basic Mode:</strong> Sends my entire resume as context to
                  Claude with each user query, allowing the AI to reference all information.
                </li>
                <li>
                  <strong style={{ color: "var(--fg)" }}>RAG Mode:</strong> Uses Pinecone vector database to store
                  embeddings of my resume chunks. When you ask a question, it retrieves only the most relevant
                  sections and sends those as context to Claude.
                </li>
              </ul>
            </div>

            <div>
              <div style={{ font: "600 15px var(--font-sans)", color: "var(--accent-hover)", marginBottom: 10 }}>
                Technical Implementation
              </div>
              <ul className="list-disc pl-5 space-y-2" style={{ font: "14px/1.6 var(--font-sans)", color: "var(--fg-secondary)" }}>
                <li>
                  <strong style={{ color: "var(--fg)" }}>Frontend:</strong> React components with client-side state
                  management using the useState hook.
                </li>
                <li>
                  <strong style={{ color: "var(--fg)" }}>API Routes:</strong> Next.js API routes to handle
                  communication with Anthropic&apos;s Claude API.
                </li>
                <li>
                  <strong style={{ color: "var(--fg)" }}>RAG Architecture:</strong> Resume data is chunked, embedded,
                  and stored in Pinecone&apos;s vector database for semantic search.
                </li>
                <li>
                  <strong style={{ color: "var(--fg)" }}>Response Rendering:</strong> ReactMarkdown for formatting
                  Claude&apos;s responses with proper typography and styling.
                </li>
              </ul>
            </div>
          </div>

          <div className="mb-12">
            <div style={{ font: "600 15px var(--font-sans)", color: "var(--accent-hover)", marginBottom: 10 }}>
              Claude AI Prompt Details
            </div>
            <p style={{ font: "14px/1.6 var(--font-sans)", color: "var(--fg-secondary)", marginBottom: 16 }}>
              The system prompt sent to Claude varies based on the mode selected:
            </p>

            <div className="grid md:grid-cols-2 gap-5">
              <div style={{ background: "var(--surface-sunken)", border: "1px solid var(--border)", padding: 16 }}>
                <div style={{ font: "700 12px var(--font-mono)", color: "var(--fg)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "var(--tracking-wide)" }}>
                  Basic Mode Prompt Structure
                </div>
                <ul className="list-disc pl-5 space-y-1" style={{ font: "13px/1.6 var(--font-sans)", color: "var(--fg-secondary)" }}>
                  <li>Defines the assistant&apos;s role as a helpful resource for questions about David&apos;s professional background</li>
                  <li>Instructs the AI to use only information from the provided resume</li>
                  <li>Sets expectations for response style: concise, friendly, and professional</li>
                  <li>Includes formatting guidelines for better readability</li>
                  <li>Provides the complete resume content as context for every question</li>
                </ul>
              </div>

              <div style={{ background: "var(--surface-sunken)", border: "1px solid var(--border)", padding: 16 }}>
                <div style={{ font: "700 12px var(--font-mono)", color: "var(--fg)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "var(--tracking-wide)" }}>
                  RAG Mode Prompt Structure
                </div>
                <ul className="list-disc pl-5 space-y-1" style={{ font: "13px/1.6 var(--font-sans)", color: "var(--fg-secondary)" }}>
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
          </div>

          <div>
            <div style={{ font: "600 15px var(--font-sans)", color: "var(--accent-hover)", marginBottom: 10 }}>
              Why Explore Both Modes?
            </div>
            <p style={{ font: "14px/1.6 var(--font-sans)", color: "var(--fg-secondary)", maxWidth: 760 }}>
              Comparing the responses from Basic and RAG modes demonstrates the tradeoffs in AI systems. RAG mode can
              provide more precise answers by focusing only on relevant information, which can reduce hallucinations
              and improve answer quality. However, it may sometimes miss context from other sections that could be
              valuable. Basic mode has all information available but might include irrelevant details or get
              distracted by unrelated information.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
