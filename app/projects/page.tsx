// app/projects/page.tsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "David Larrimore | Projects",
  description: "Explore my technical projects and professional work in AI, cloud computing, and software development",
};

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen">
        <div className="px-4 mx-auto max-w-screen-xl">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              My{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
                Projects
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explore my technical projects, experiments, and professional work in AI, cloud computing, and software development.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Resume Chatbot Project */}
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105">
              <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center">
                <svg 
                  className="w-24 h-24 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                </svg>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Resume Chatbot</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  An AI-powered chatbot built with Next.js and Anthropic's Claude that can answer questions about my professional experience, skills, and background.
                </p>
                <div className="flex gap-4">
                  <span className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full">Claude AI</span>
                  <span className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full">Next.js</span>
                  <span className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full">React</span>
                </div>
                <Link 
                  href="/projects/resumeChat" 
                  className="mt-6 inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90"
                >
                  Try It Out
                  <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Coming Soon Project */}
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg opacity-70">
              <div className="h-48 bg-gradient-to-r from-gray-500 to-gray-700 flex items-center justify-center">
                <div className="bg-white/20 px-4 py-2 rounded-lg">
                  <p className="text-white font-bold">Coming Soon</p>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">More Projects</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Additional projects are currently in development. Check back soon for updates.
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