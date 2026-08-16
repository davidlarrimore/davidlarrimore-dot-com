// app/blog/[slug]/page.tsx
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Eyebrow from "../../components/ds/Eyebrow";
import Tag from "../../components/ds/Tag";
import BlogMarkdown from "../components/BlogMarkdown";
import { getPostBySlug, getPostSlugs } from "@/lib/blog";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `David Larrimore | ${post.title}`,
    description: post.excerpt,
    openGraph: post.cover ? { images: [post.cover] } : undefined,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh" }}>
        <article className="px-5 md:px-10 py-16 md:py-20" style={{ maxWidth: 760, margin: "0 auto" }}>
          <Link
            href="/blog"
            style={{ font: "13px var(--font-mono)", color: "var(--fg-muted)", textDecoration: "none" }}
          >
            &larr; Back to blog
          </Link>

          <div style={{ marginTop: "var(--space-5)" }}>
            <Eyebrow>// blog</Eyebrow>
            <h1 style={{ font: "var(--text-h1)", letterSpacing: "var(--tracking-tight)", color: "var(--fg)", marginBottom: 12 }}>
              {post.title}
            </h1>

            <div className="flex items-center gap-3 mb-4" style={{ font: "12px var(--font-mono)", color: "var(--fg-muted)" }}>
              <span>{post.date}</span>
              <span>&middot;</span>
              <span>{post.readingTime} min read</span>
            </div>

            {post.tags.length > 0 && (
              <div className="flex gap-1.5 mb-8">
                {post.tags.map((t) => (
                  <Tag key={t} variant="blue">
                    {t}
                  </Tag>
                ))}
              </div>
            )}

            {post.cover && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.cover}
                alt={post.title}
                style={{
                  width: "100%",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border)",
                  marginBottom: "var(--space-6)",
                }}
              />
            )}

            <BlogMarkdown content={post.content} />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
