// lib/seo.ts
//
// Builds the metadata that link-preview crawlers read: Open Graph tags
// (LinkedIn, Facebook, Instagram/Threads, WhatsApp, iMessage, Slack, Discord),
// Twitter card tags (X), and a canonical URL.
//
// Next.js replaces the whole `openGraph` object when a page defines its own
// metadata rather than merging it with the layout's, so every page should go
// through `buildMetadata` to get the complete set of tags.

import type { Metadata } from "next";
import { siteConfig, socialConfig } from "@/lib/config";

export const SITE_AUTHOR = "David Larrimore";
const SITE_TITLE = "David Larrimore";
export const SITE_DESCRIPTION =
  "Dave Larrimore is a technology executive and hands-on AI engineer with nearly 20 years of experience in enterprise modernization, federal technology leadership, and strategic growth.";

// LinkedIn's recommended preview size (1.91:1). Must be PNG/JPG — its crawler
// does not reliably render WebP or SVG. Regenerate with `npm run generate-og-images`.
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 627;
export const DEFAULT_OG_IMAGE = "/images/og-default.png";

/** Absolute site origin, tolerant of a PUBLIC_SITE_URL set without a protocol. */
export const siteUrl = (() => {
  const raw = siteConfig.url.trim().replace(/\/+$/, "");
  return /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
})();

/** "@handle" for X/Twitter card attribution, derived from the profile URL. */
const twitterHandle = (() => {
  const match = socialConfig.twitter.match(/(?:twitter|x)\.com\/@?([A-Za-z0-9_]+)/i);
  return match ? `@${match[1]}` : undefined;
})();

function imageMimeType(src: string): string | undefined {
  if (/\.png$/i.test(src)) return "image/png";
  if (/\.jpe?g$/i.test(src)) return "image/jpeg";
  return undefined;
}

interface BuildMetadataOptions {
  title: string;
  description: string;
  /** Route path, e.g. "/blog". Omit for defaults that pages inherit. */
  path?: string;
  /** Absolute path under `public/` (PNG/JPG, ideally 1200x627). */
  image?: string;
  imageAlt?: string;
  /** Set for blog posts to emit `og:type=article` and the article:* tags. */
  article?: {
    publishedTime?: string;
    tags?: string[];
  };
}

export function buildMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  article,
}: BuildMetadataOptions): Metadata {
  const images = [
    {
      url: image,
      width: OG_IMAGE_WIDTH,
      height: OG_IMAGE_HEIGHT,
      alt: imageAlt ?? title,
      type: imageMimeType(image),
    },
  ];

  const shared = {
    title,
    description,
    url: path,
    siteName: SITE_TITLE,
    locale: "en_US",
    images,
  };

  return {
    title,
    description,
    authors: [{ name: SITE_AUTHOR, url: siteUrl }],
    alternates: path ? { canonical: path } : undefined,
    openGraph: article
      ? {
          ...shared,
          type: "article",
          publishedTime: article.publishedTime,
          authors: [SITE_AUTHOR],
          tags: article.tags,
        }
      : { ...shared, type: "website" },
    twitter: {
      card: "summary_large_image",
      site: twitterHandle,
      creator: twitterHandle,
      title,
      description,
      images: [image],
    },
  };
}
