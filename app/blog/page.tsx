// app/blog/page.tsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Metadata } from "next";
import Card from "../components/ds/Card";
import Eyebrow from "../components/ds/Eyebrow";
import StatusPill from "../components/ds/StatusPill";
import Tag from "../components/ds/Tag";

export const metadata: Metadata = {
  title: "David Larrimore | Blog",
  description: "Notes on AI governance, prototyping, and building modern digital experiences.",
};

const POSTS = [
  {
    date: "2026.08",
    title: "Notes on responsible AI governance in federal agencies",
    excerpt: "What building an office of the Chief AI Officer taught me about safe adoption at scale.",
    tags: ["AI", "Governance"],
  },
  {
    date: "2026.07",
    title: "Building the AI Scavenger Hunt: prompt engineering as game design",
    excerpt: 'Turns out "game master" is a surprisingly good prompting frame.',
    tags: ["AI", "Prototyping"],
  },
];

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh" }}>
        <div className="px-5 md:px-10 py-16 md:py-20" style={{ maxWidth: 760, margin: "0 auto" }}>
          <div className="flex items-center gap-3 mb-2">
            <Eyebrow>// blog</Eyebrow>
            <StatusPill tone="new">New section</StatusPill>
          </div>
          <div style={{ font: "var(--text-h1)", letterSpacing: "var(--tracking-tight)", color: "var(--fg)", marginBottom: 8 }}>
            Blog
          </div>
          <div style={{ font: "15px var(--font-sans)", color: "var(--fg-secondary)", marginBottom: 40 }}>
            Not live on davidlarrimore.com yet — illustrative layout for the planned writing section.
          </div>

          <div className="flex flex-col gap-6">
            {POSTS.map((p) => (
              <Card key={p.title}>
                <div style={{ font: "12px var(--font-mono)", color: "var(--fg-muted)", marginBottom: 8 }}>{p.date}</div>
                <div style={{ font: "var(--text-h3)", color: "var(--fg)", marginBottom: 8 }}>{p.title}</div>
                <div style={{ font: "15px/1.6 var(--font-sans)", color: "var(--fg-secondary)", marginBottom: 12 }}>
                  {p.excerpt}
                </div>
                <div className="flex gap-1.5">
                  {p.tags.map((t) => (
                    <Tag key={t} variant="blue">
                      {t}
                    </Tag>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
