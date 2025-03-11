import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ChatInterface from "../components/ResumeChatInterface";
import { Metadata } from "next";
import ResumeChatInterface from "../components/ResumeChatInterface";

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
              Ask any questions about my professional experience, skills, or background. Powered by Claude AI.
            </p>
          </div>
          
          <ResumeChatInterface />
        </div>
      </main>
      <Footer />
    </>
  );
}