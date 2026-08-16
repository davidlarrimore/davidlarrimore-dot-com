import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "public", "blog", "posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  cover?: string;
  draft: boolean;
  readingTime: number;
}

export interface Post extends PostMeta {
  content: string;
}

function readPostFile(filename: string): Post {
  const slug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);

  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.round(words / 200));

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    excerpt: data.excerpt ?? "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    cover: data.cover,
    draft: Boolean(data.draft),
    readingTime,
    content,
  };
}

function listPostFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
}

export function getAllPosts(): PostMeta[] {
  const includeDrafts = process.env.NODE_ENV !== "production";

  return listPostFiles()
    .map(readPostFile)
    .filter((post) => includeDrafts || !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(({ content, ...meta }) => meta);
}

export function getPostSlugs(): string[] {
  return listPostFiles().map((f) => f.replace(/\.md$/, ""));
}

export function getPostBySlug(slug: string): Post | null {
  const filename = `${slug}.md`;
  if (!fs.existsSync(path.join(POSTS_DIR, filename))) return null;

  const post = readPostFile(filename);
  if (post.draft && process.env.NODE_ENV === "production") return null;

  return post;
}
