import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ResumeExperienceItem from "../components/ResumeExperienceItem";
import Link from "next/link";
import { Metadata } from "next";
import { resumeConfig } from "@/lib/config";
import "./resume.css";

export const metadata: Metadata = {
  title: "David Larrimore | Resume",
  description: "Professional resume of David Larrimore - Senior Executive Technologist with expertise in IT modernization, AI strategy, cloud computing, and enterprise technology transformation",
};

export default function ResumePage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="px-4 mx-auto max-w-screen-xl">
          {/* Resume Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Resume</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Senior Executive Technologist with 15+ years of expertise in IT modernization, AI strategy, cloud computing, and enterprise technology transformation.
            </p>
            <a 
              href="/api/download-resume" 
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary hover:bg-primary/90 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 no-print"
              download={resumeConfig.filename}
            >
              Download Resume PDF
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
            </a>
          </div>

          {/* Rest of the component remains the same... */}