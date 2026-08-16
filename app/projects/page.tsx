// app/projects/page.tsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { Metadata } from "next";
import Card from "../components/ds/Card";
import Eyebrow from "../components/ds/Eyebrow";
import Tag from "../components/ds/Tag";

export const metadata: Metadata = {
  title: "David Larrimore | Projects",
  description: "Explore my technical projects and professional work in AI, cloud computing, and software development",
};

interface ProjectCardProps {
  eyebrow: string;
  title: string;
  desc: string;
  tags: string[];
  tagVariant: "blue" | "purple" | "gray";
  cta: string;
  ctaHref?: string;
  ctaVariant: "primary" | "purple" | "ghost";
  accentColor: string;
}

function ProjectCard({ eyebrow, title, desc, tags, tagVariant, cta, ctaHref, ctaVariant, accentColor }: ProjectCardProps) {
  return (
    <Card hud>
      <div
        className="relative overflow-hidden mb-5"
        style={{ height: 100, background: "var(--surface-sunken)", border: "1px solid var(--border)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            clipPath: "polygon(0 100%, 30% 0, 100% 0, 100% 100%)",
            background: `linear-gradient(135deg, ${accentColor}, transparent)`,
            opacity: 0.5,
          }}
        />
        <div style={{ position: "absolute", bottom: 8, right: 10, font: "11px var(--font-mono)", color: "var(--fg-muted)" }}>
          ./run
        </div>
      </div>
      <Eyebrow color="var(--fg-muted)">{eyebrow}</Eyebrow>
      <div style={{ font: "var(--text-h3)", color: "var(--fg)", marginBottom: 10 }}>{title}</div>
      <div style={{ font: "14px/1.5 var(--font-sans)", color: "var(--fg-secondary)", marginBottom: 16 }}>{desc}</div>
      <div className="flex flex-wrap gap-1.5 mb-5">
        {tags.map((t) => (
          <Tag key={t} variant={tagVariant}>
            {t}
          </Tag>
        ))}
      </div>
      {ctaHref ? (
        <Link href={ctaHref} className={`ds-btn ds-btn-${ctaVariant} ds-btn-sm`}>
          {cta}
        </Link>
      ) : (
        <button className={`ds-btn ds-btn-${ctaVariant} ds-btn-sm`} disabled>
          {cta}
        </button>
      )}
    </Card>
  );
}

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh" }}>
        <div className="px-5 md:px-10 py-16 md:py-20" style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <Eyebrow>// projects</Eyebrow>
          <div style={{ font: "var(--text-h1)", letterSpacing: "var(--tracking-tight)", color: "var(--fg)", marginBottom: 12 }}>
            My Projects
          </div>
          <div style={{ font: "16px var(--font-sans)", color: "var(--fg-secondary)", maxWidth: 560, marginBottom: 48 }}>
            Technical projects, experiments, and professional work in AI, cloud computing, and software development.
          </div>

          <div className="grid md:grid-cols-2 gap-7">
            <ProjectCard
              eyebrow="claude ai · next.js"
              title="Resume Chatbot"
              desc="An AI-powered chatbot built with Next.js and Claude that answers questions about my professional background."
              tags={["Claude AI", "Next.js", "React"]}
              tagVariant="blue"
              cta="Try It Out"
              ctaHref="/projects/resumeChat"
              ctaVariant="primary"
              accentColor="var(--accent)"
            />
            <ProjectCard
              eyebrow="claude ai · next.js"
              title="AI Scavenger Hunt"
              desc="A quiz game where you use generative AI to solve challenges. Test your prompt-engineering skills."
              tags={["Claude AI", "Next.js", "Prompt Engineering"]}
              tagVariant="purple"
              cta="Play Now"
              ctaHref="/projects/ScavengerHunt"
              ctaVariant="purple"
              accentColor="var(--accent2)"
            />
            <ProjectCard
              eyebrow="in development"
              title="More Projects"
              desc="Additional AI tools, cloud solutions, and software projects in the works — plus a couple of game-dev experiments."
              tags={["In Development"]}
              tagVariant="gray"
              cta="Coming Soon"
              ctaVariant="ghost"
              accentColor="var(--fg-muted)"
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
