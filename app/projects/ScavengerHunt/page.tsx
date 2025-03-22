// app/projects/ScavengerHunt/page.tsx
"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ScavengerHuntGame from "../../components/ScavengerHuntGame";
import { Metadata } from "next";

// We can't export metadata from a client component, so we'll need to move this to a separate layout file
// export const metadata: Metadata = {
//   title: "David Larrimore | AI Scavenger Hunt",
//   description: "A fun quiz game where you use generative AI to solve challenges and answer questions",
// };

export default function ScavengerHuntPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen bg-gray-50 dark:bg-gray-600">
        <div className="px-4 mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              AI{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
                Scavenger Hunt
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Test your AI prompt engineering skills with this scavenger hunt!
              Use the AI assistant to solve challenges and answer questions.
            </p>
            <h3 className="text-lg text-red-600 dark:text-gray-300 max-w-3xl mx-auto p-3 m-2">
              <hr />
              NOTE: This project is currently in development and may not
              function as expected.
              <hr />
            </h3>
          </div>

          {/* Use the ScavengerHuntGame component which handles all game logic and rendering */}
          <ScavengerHuntGame initialQuestionIndex={0} initialScore={0} />

          <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              About This Project
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  How It Works
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  This AI Scavenger Hunt challenges you to craft effective
                  prompts to extract specific information from Claude,
                  Anthropic's large language model. Each challenge requires you
                  to think carefully about how to structure your question to get
                  the exact information you need.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  Skills You'll Practice
                </h3>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>
                    <strong>Prompt Engineering:</strong> Learn how to structure
                    your questions to get the most accurate responses.
                  </li>
                  <li>
                    <strong>Critical Thinking:</strong> Analyze responses and
                    extract relevant information.
                  </li>
                  <li>
                    <strong>AI Interaction:</strong> Gain experience working
                    with cutting-edge AI models.
                  </li>
                  <li>
                    <strong>Problem Solving:</strong> Approach each challenge
                    with creative thinking to obtain the answer.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  Technical Implementation
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  This project is built with Next.js and React, utilizing the
                  Anthropic Claude API for generative AI capabilities. The
                  framework is designed to be easily expandable, allowing new
                  challenges to be added without significant code changes.
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
