// app/projects/page.tsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";
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
              <div className="h-48 relative bg-gradient-to-r from-blue-500 to-blue-700">
                {/* Layered background with icons and circuit patterns */}
                <div className="absolute inset-0 opacity-20 bg-dots-pattern bg-dots-sm"></div>
                <div className="absolute inset-0 overflow-hidden">
                  <svg className="absolute -bottom-10 -right-10 w-64 h-64 text-blue-600/20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h2v3c0 .55.45 1 1 1h.5c.25 0 .5-.1.7-.29L12.7 18H20c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H12l-4 3v-3H4V4h16v12z"/>
                  </svg>
                  <svg className="absolute top-5 left-5 w-16 h-16 text-blue-300/30" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"/>
                  </svg>
                </div>
                <div className="w-full h-full flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center">
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
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Resume Chatbot</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  An AI-powered chatbot built with Next.js and Anthropic's Claude that can answer questions about my professional experience, skills, and background.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full">Claude AI</span>
                  <span className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full">Next.js</span>
                  <span className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full">React</span>
                </div>
                <Link 
                  href="/projects/resumeChat" 
                  className="mt-2 inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90"
                >
                  Try It Out
                  <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Coming Soon Project */}
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg opacity-90 transition-transform hover:scale-105">
              <div className="h-48 relative bg-gradient-to-r from-gray-500 to-gray-700">
                {/* Layered background with code pattern */}
                <div className="absolute inset-0 opacity-10 bg-dots-pattern bg-dots-sm"></div>
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-3 left-3 text-xs font-mono text-gray-300/30 whitespace-pre leading-tight">
                    {`function launchProject() {
  const project = {
    name: "Coming Soon",
    status: "In Development",
    launch: new Date()
  };
  return project;
}`}
                  </div>
                  <svg className="absolute -bottom-10 -right-10 w-64 h-64 text-gray-600/20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                  </svg>
                </div>
                <div className="w-full h-full flex items-center justify-center">
                  <div className="bg-white/20 px-6 py-3 rounded-lg text-white font-bold text-xl">
                    Coming Soon
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">More Projects</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Additional projects are currently in development. Check back soon for updates on new AI tools, cloud solutions, and software development projects.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">In Development</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}