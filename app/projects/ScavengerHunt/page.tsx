// app/projects/ScavengerHunt/page.tsx
"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ScavengerHuntGame from "../../components/ScavengerHuntGame";
import Eyebrow from "../../components/ds/Eyebrow";
import Tag from "../../components/ds/Tag";

// Metadata for this route is exported from layout.tsx since this is a client component.

export default function ScavengerHuntPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh" }}>
        <div className="px-5 md:px-10 py-16 md:py-20" style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <Eyebrow>// projects · ai scavenger hunt</Eyebrow>
          <div style={{ font: "var(--text-h1)", letterSpacing: "var(--tracking-tight)", color: "var(--fg)", marginBottom: 16 }}>
            AI Scavenger Hunt
          </div>
          <div style={{ font: "var(--text-body-lg)", color: "var(--fg-secondary)", maxWidth: 640, marginBottom: 20 }}>
            Test your AI prompt engineering skills with this scavenger hunt! Use the AI assistant to solve challenges
            and answer questions.
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            <Tag variant="purple">Claude AI</Tag>
            <Tag variant="purple">Next.js</Tag>
            <Tag variant="purple">Prompt Engineering</Tag>
          </div>

          <div
            className="mb-10"
            style={{ padding: 14, background: "var(--surface-sunken)", borderLeft: "2px solid #f66", maxWidth: 640 }}
          >
            <p style={{ font: "700 11px var(--font-mono)", textTransform: "uppercase", letterSpacing: "var(--tracking-wide)", color: "#f88", marginBottom: 4 }}>
              ⚠ In development
            </p>
            <p style={{ font: "13px/1.5 var(--font-sans)", color: "var(--fg-secondary)" }}>
              This project is currently in development and may not function as expected.
            </p>
          </div>

          <div className="mb-16">
            <ScavengerHuntGame initialQuestionIndex={0} initialScore={0} />
          </div>

          <Eyebrow>// about this project</Eyebrow>
          <div style={{ font: "var(--text-h2)", color: "var(--fg)", marginBottom: 32 }}>How it works</div>

          <div className="grid md:grid-cols-2 gap-10 mb-10">
            <div>
              <div style={{ font: "600 15px var(--font-sans)", color: "var(--accent2-hover)", marginBottom: 10 }}>
                How It Works
              </div>
              <p style={{ font: "14px/1.6 var(--font-sans)", color: "var(--fg-secondary)" }}>
                This AI Scavenger Hunt challenges you to craft effective prompts to extract specific information from
                Claude, Anthropic&apos;s large language model. Each challenge requires you to think carefully about
                how to structure your question to get the exact information you need.
              </p>
            </div>

            <div>
              <div style={{ font: "600 15px var(--font-sans)", color: "var(--accent2-hover)", marginBottom: 10 }}>
                Technical Implementation
              </div>
              <p style={{ font: "14px/1.6 var(--font-sans)", color: "var(--fg-secondary)" }}>
                This project is built with Next.js and React, utilizing the Anthropic Claude API for generative AI
                capabilities. The framework is designed to be easily expandable, allowing new challenges to be added
                without significant code changes.
              </p>
            </div>
          </div>

          <div>
            <div style={{ font: "600 15px var(--font-sans)", color: "var(--accent2-hover)", marginBottom: 10 }}>
              Skills You&apos;ll Practice
            </div>
            <ul className="list-disc pl-5 space-y-2" style={{ font: "14px/1.6 var(--font-sans)", color: "var(--fg-secondary)" }}>
              <li>
                <strong style={{ color: "var(--fg)" }}>Prompt Engineering:</strong> Learn how to structure your
                questions to get the most accurate responses.
              </li>
              <li>
                <strong style={{ color: "var(--fg)" }}>Critical Thinking:</strong> Analyze responses and extract
                relevant information.
              </li>
              <li>
                <strong style={{ color: "var(--fg)" }}>AI Interaction:</strong> Gain experience working with
                cutting-edge AI models.
              </li>
              <li>
                <strong style={{ color: "var(--fg)" }}>Problem Solving:</strong> Approach each challenge with
                creative thinking to obtain the answer.
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
