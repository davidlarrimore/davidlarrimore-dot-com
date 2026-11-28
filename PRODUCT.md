# Product

<!-- impeccable:product-schema 1 -->

> The design goal, principles, trend choices and definition of done live in
> [`docs/DESIGN-CHARTER.md`](docs/DESIGN-CHARTER.md). That charter wins over this file and over
> `DESIGN.md` whenever they disagree. Keep this file to product facts.

## Platform

web

## Users

Hiring managers, government and industry leaders, and peers who are evaluating Dave Larrimore as
a senior technologist and executive. They arrive from LinkedIn, a resume, or a link someone shared,
and often scan for only a minute or two. Readers of the blog are a secondary audience.

## Product Purpose

The site is Dave's personal home on the web: who he is, what he has led and built, and proof that
he builds with AI himself. It succeeds when a visitor quickly concludes "credible and current" and
then digs deeper: asks the resume chat a question, reads the resume or a post, or gets in touch.

## Positioning

A senior executive's site that runs working AI he built himself: a chat that answers questions
about his career from his real record, and a game that teaches prompt engineering. Most peers'
sites only describe AI work. This one demonstrates it.

## Capabilities and Constraints

- Pages: home, resume, blog (markdown posts in `public/blog/posts/`), and projects (Resume Chat,
  AI Scavenger Hunt).
- Next.js App Router with Tailwind and the Design System v2 tokens in `app/globals.css`. Dark mode
  comes first.
- Career facts come only from `lib/resume-content.json`. Never invent or reword a fact in the UI.
- The repository is public, so everything in it is published.
- Every page exports its metadata with `buildMetadata()` from `lib/seo.ts` so link previews keep
  working.

## Brand Commitments

- Name: Dave Larrimore (the site is davidlarrimore.com).
- Voice: plain, direct and specific. Numbers say what they measure. "Led" means directly and
  "oversaw" means through others.
- Assets: the portrait at `public/images/profile.webp` and the Inter and IBM Plex Mono fonts
  served from the repo.

## Evidence on Hand

- Career record: `lib/resume-content.json` (the generated version is `public/files/resume.md`).
- Live demos: Resume Chat (basic and RAG modes) and the AI Scavenger Hunt.
- Blog posts in `public/blog/posts/`.
- There are no testimonials, press quotes or client logos on hand. Do not invent them.

## Product Principles

1. Credibility first, personality second.
2. Show, don't tell: working AI beats claims about AI.
3. Every fact traces back to `lib/resume-content.json`.
4. A visitor can get the essentials in under a minute.

## Accessibility & Inclusion

WCAG 2.2 AA: contrast, visible keyboard focus, screen-reader labels and `prefers-reduced-motion`.
