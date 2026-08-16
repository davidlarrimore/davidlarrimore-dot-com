// app/blog/page.tsx
import Link from "next/link";
import { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/ds/Card";
import Eyebrow from "../components/ds/Eyebrow";
import Tag from "../components/ds/Tag";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "David Larrimore | Blog",
  description: "Notes on AI governance, prototyping, and building modern digital experiences.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh" }}>
        <div className="px-5 md:px-10 py-16 md:py-20" style={{ maxWidth: 760, margin: "0 auto" }}>
          <Eyebrow>// blog</Eyebrow>
          <div style={{ font: "var(--text-h1)", letterSpacing: "var(--tracking-tight)", color: "var(--fg)", marginBottom: 8 }}>
            Blog
          </div>
          <div style={{ font: "15px var(--font-sans)", color: "var(--fg-secondary)", marginBottom: 40 }}>
            Notes on AI governance, prototyping, and building modern digital experiences.
          </div>

          {posts.length === 0 ? (
            <div style={{ font: "15px var(--font-sans)", color: "var(--fg-muted)" }}>
              No posts yet — check back soon.
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {posts.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="block">
                  <Card>
                    <div className="flex items-center gap-3 mb-2" style={{ font: "12px var(--font-mono)", color: "var(--fg-muted)" }}>
                      <span>{p.date}</span>
                      <span>&middot;</span>
                      <span>{p.readingTime} min read</span>
                    </div>
                    <div style={{ font: "var(--text-h3)", color: "var(--fg)", marginBottom: 8 }}>{p.title}</div>
                    {p.excerpt && (
                      <div style={{ font: "15px/1.6 var(--font-sans)", color: "var(--fg-secondary)", marginBottom: 12 }}>
                        {p.excerpt}
                      </div>
                    )}
                    {p.tags.length > 0 && (
                      <div className="flex gap-1.5">
                        {p.tags.map((t) => (
                          <Tag key={t} variant="blue">
                            {t}
                          </Tag>
                        ))}
                      </div>
                    )}
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
