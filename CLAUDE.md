# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 personal website for David Larrimore featuring AI-powered interactive projects. The site showcases professional experience, skills, and includes two main AI features: an AI Resume Chat and an AI Scavenger Hunt game.

## Development Commands

```bash
# Development
npm run dev              # Start dev server with Turbo (runs on localhost:3000)
npm run build            # Build for production
npm run start            # Start production server

# Pinecone Setup (for RAG features)
npm run csv-to-resume-chunks  # Convert CSV resume data to JSON format
npm run init-pinecone         # Sync the `resume` namespace by hand (production deploys do this automatically)
npm run check-pinecone        # Verify every record, no extra records, and sample semantic searches

# Asset Generation
npm run generate-favicons     # Generate favicon files from SVG icon
npm run generate-og-images    # Generate link-preview images (site default + one per blog post cover)

# Docker (local dev alternative to `npm run dev`)
docker compose up -d --build  # Build and serve on :3000, bind-mounted with hot reload, loads .env
docker compose down           # Stop and remove the container
```

## Architecture

### Core Application Structure

- **app/**: Next.js 15 App Router structure
  - **api/**: API routes for AI features
    - `api/projects/resumeChat/route.ts`: Resume chat endpoint (supports basic & RAG modes)
    - `api/projects/scavenger-hunt/chat/route.ts`: Scavenger hunt chat endpoint
    - `api/download-resume/route.ts`: Resume PDF download
  - **components/**: React components (shared across the site)
  - **projects/**: Project pages (resumeChat, ScavengerHunt)
  - **resume/**: Resume display page
  - **blog/**: Blog list (`page.tsx`) and post (`[slug]/page.tsx`) pages, plus `components/BlogMarkdown.tsx` and `components/Mermaid.tsx`
  - `layout.tsx`: Root layout with Analytics integration
  - `page.tsx`: Homepage

- **lib/**: Shared utilities
  - `config.ts`: Centralized environment variable configuration (site, contact, social, analytics)
  - `scavenger-hunt-questions.ts`: Question bank for scavenger hunt
  - `gtag.ts`: Google Analytics helpers
  - `seo.ts`: `buildMetadata()` helper for Open Graph / Twitter card / canonical tags (link previews on LinkedIn, Facebook, X, etc.)
  - `blog.ts`: Reads/parses markdown posts from `public/blog/posts/` (frontmatter, reading time, slugs)

- **scripts/**: Data processing and Pinecone initialization scripts
  - `csv-to-resume-chunks.js`: Converts CSV resume data to JSON
  - `init-pinecone.js`: Creates/updates Pinecone index with resume embeddings
  - `check-pinecone.js`: Validates Pinecone configuration
  - `resume_chunks.csv`: Source resume data
  - `resume_chunks.json`: Processed resume chunks for Pinecone

- **public/files/**: Static content
  - `resume.md`: Full resume markdown (used in basic chat mode)

- **public/blog/**: Blog content (source of truth for the blog, not code)
  - `posts/*.md`: One markdown file per post, frontmatter + body (see Blog System below)
  - `images/`: Post images, referenced from markdown/frontmatter as absolute `/blog/images/...` paths

### AI Integration Architecture

#### Resume Chat (app/api/projects/resumeChat/route.ts)

Two modes of operation:

1. **Basic Mode** (`version: "basic"`):
   - Loads entire resume from `public/files/resume.md`
   - Passes full resume content to Claude API as system context
   - Simple, no external dependencies beyond Anthropic API

2. **RAG Mode** (`version: "rag"`):
   - Uses Pinecone vector database for semantic search
   - Queries Pinecone with user's question to retrieve top 15 relevant chunks
   - Each chunk includes metadata: section, organization, role, category, years
   - Retrieved chunks passed to Claude API as targeted context
   - Falls back to basic mode if Pinecone fails
   - Uses the configured Pinecone integrated embedding model; all records live in one fixed namespace, `resume` (set in `lib/resume-index.json`).

Both modes:
- Use the Claude Haiku 4.5 model (`claude-haiku-4-5`) via raw `fetch()` calls to the Anthropic Messages API (no SDK)
- Maintain conversation context (last 10 messages)
- Follow strict guidelines to only answer David Larrimore-related questions
- Return formatted markdown responses

#### Scavenger Hunt (app/api/projects/scavenger-hunt/chat/route.ts)

- Simple chat interface with Claude Haiku 4.5
- Context-specific system prompts based on challenge
- Designed to teach prompt engineering skills

### Blog System

Blog posts are plain markdown files — no CMS or database.

- **Content**: `public/blog/posts/*.md`. Filename (minus `.md`) is the slug. Frontmatter fields: `title`, `date` (`YYYY-MM-DD`), `excerpt`, `tags` (array), `cover` (optional absolute path), `draft` (optional bool — draft posts are hidden in production but visible in dev).
- **Images**: put post images under `public/blog/images/` and reference with an absolute path (e.g. `/blog/images/<slug>/cover.jpg`), since `public/` is served from the site root.
- **Reading (`lib/blog.ts`)**: `getAllPosts()` (sorted by date desc, drafts filtered in prod), `getPostBySlug(slug)`, `getPostSlugs()` (for `generateStaticParams`).
- **Rendering (`app/blog/components/BlogMarkdown.tsx`)**: `react-markdown` + `remark-gfm` (tables/strikethrough/task lists) + `rehype-slug` (heading anchors) + `rehype-highlight` (code syntax highlighting, styled in `globals.css` under `.hljs`, no external theme CSS imported).
- **Mermaid diagrams**: fenced code blocks with the `mermaid` language are intercepted by a custom `code`/`pre` renderer and handed to `app/blog/components/Mermaid.tsx`, a client component that lazy-loads `mermaid` and renders SVG in `useEffect` (diagrams cannot render during SSR).
- **Styling**: markdown body is wrapped in `.blog-prose` (defined in `app/globals.css`), a hand-rolled prose style built on the same `--fg`/`--surface`/`--space-*` design tokens as the rest of the site's `.ds-*` classes — no Tailwind typography plugin.
- Pages: `app/blog/page.tsx` (list) and `app/blog/[slug]/page.tsx` (post, statically generated via `generateStaticParams`).

### Link Previews (Open Graph)

Social link previews (LinkedIn, Facebook, X, Instagram/Threads, Slack, iMessage) are driven by `lib/seo.ts`.

- Every page exports its metadata via `buildMetadata({ title, description, path })`. Next.js replaces (does not merge) a parent's `openGraph` object when a page defines its own metadata, so a page that exports a plain `{ title, description }` loses its preview tags — always use the helper.
- Preview images must be PNG/JPG (LinkedIn does not reliably render WebP/SVG), sized 1200x627. The site default is `public/images/og-default.png`.
- Blog posts use `public/blog/images/<slug>/og.jpg`, generated from the post's `cover` by `npm run generate-og-images`. Run it and commit the output when adding a post or changing a cover; posts without one fall back to the site default.
- `metadataBase` comes from `PUBLIC_SITE_URL` (a missing protocol is tolerated).

### Environment Configuration

All environment variables centralized in `lib/config.ts`:
- Site configuration (name, URL)
- Contact information (email)
- Social media links (GitHub, LinkedIn, Twitter)
- Analytics (Google Analytics ID)
- API keys accessed directly in API routes (ANTHROPIC_API_KEY, PINECONE_API_KEY, etc.)

See `.env.example` for required environment variables.

### Styling

**Before any visual or UX change, read `docs/DESIGN-CHARTER.md`**, the design charter: the redesign goal,
the ten layout principles, which trends to adopt or avoid, the known problems, and the definition
of done. Check the change against its checklist before calling it finished. If a change has to
break a rule there, update the charter in the same PR.

- Design System v2 tokens (`--bg`, `--fg`, `--accent`, `--space-*`, `--text-*`…) and `.ds-*` classes in
  `app/globals.css` are the only token system. Tailwind CSS v3.4 is used for layout utilities only;
  its theme holds no colors.
- Themes: dark is the default, and light swaps the semantic tokens under `:root[data-theme="light"]`.
  A script in `app/layout.tsx` sets `data-theme` before paint (`?theme=` URL param, then the saved
  choice, then the system setting), and `app/components/ds/ThemeToggle.tsx` flips it. Don't use
  Tailwind's `dark:` variant.
- Plain Tailwind utilities (`hidden`, `block`) lose to `.ds-*` classes in the compiled CSS, so put a
  breakpoint utility on a wrapper rather than on an element that has a `.ds-*` class.
- Motion must respect `prefers-reduced-motion` (CSS media query, or `motion-safe:` in Tailwind).
- Page-specific CSS lives next to its page (e.g., `resume/resume.css`).

### Key Dependencies

- **@pinecone-database/pinecone**: Vector database for RAG
- **react-markdown**: Markdown rendering (resume chat responses and blog posts)
- **react-icons**: Icon components
- **gray-matter**: Blog post frontmatter parsing
- **remark-gfm** / **rehype-slug** / **rehype-highlight**: Blog markdown plugins (GFM tables/task lists, heading anchors, code syntax highlighting)
- **mermaid**: Client-side diagram rendering for blog posts

Claude AI integration is not via the `@anthropic-ai/sdk` package — both chat API routes call the Anthropic Messages API directly with `fetch()`.

## Important Implementation Details

### `lib/resume-content.json` is the single source of Dave's career facts

Every fact about Dave's work and life that anything may use lives in this one file: the resume
page, the chatbot (through `npm run generate-resume` and Pinecone) and **Career Scout**, his
job-search app (`davidlarrimore/job-hunt`), which reads this file from GitHub's `main` branch
(`raw.githubusercontent.com/davidlarrimore/davidlarrimore-dot-com/main/lib/resume-content.json`)
when it starts and every week, and builds its master resume from it. Nobody keeps a second copy of
a fact anywhere else: a correction is made here, once, and everything else follows.

- **This repository is public.** Everything in the file is published (the chatbot reads all of it).
  A fact that must not be public goes nowhere near it; job-hunt keeps those in its private notes
  (`docs/evidence/`), and neither app reads them.
- **What Career Scout may put on a resume** is decided by section (`backend/app/sources/resume.py`
  in job-hunt): every `experience` statement (description, achievements, evidence), `earlier`,
  `expertise`, `awards`, `education`; the profile, `focus`, `approach`, `beyond` and `shortBio` as
  background. A `projects` item only when it says `"resume": true`: personal projects (The Warden,
  the homelab, the other apps) and hobbies are for the site and the chatbot, and stay off his
  resumes unless he says otherwise. `journey` and `impact` are page-only. Add non-work things
  freely (projects, 3D printing, games): they reach the chatbot, not a resume.
- **Order is ranking.** Under each job: the description, then `achievements` (the page's bullets,
  his strongest), then `evidence` (further facts for the chatbot and resumes). Career Scout takes
  the first ones when it fits a resume without its writer.
- **Wording.** Every number says what it measures; "led" means directly, "oversaw" through others.
  Ask Dave before changing a fact's wording or making a new fact public.
- **Resume-writing guidance is not here.** Headlines, summaries, how each kind of job is pitched
  and which story each fact tells live in job-hunt's `backend/app/documents/playbook.md` (private).
- **The shape is a contract.** Career Scout reads the field names above, `contact` included.
  Renaming or removing a field breaks its import: change both repositories together.
- **Trying a change before it is live:** push it to a branch; Career Scout can import a branch
  (`POST /api/evidence/import` with `{"ref": "<branch>"}`) for a comparison before merge.

After any change to the file: `npm run generate-resume` in the same PR. Merging deploys it, and
the deploy syncs Pinecone (see below); do not run `init-pinecone` from a branch, because the sync
updates the live chatbot at once. Career Scout picks up `main` by itself (at its next start or weekly run, or at once with
`python -m app.evidence.sync` there).

### Pinecone Setup

`lib/resume-content.json` is the single source of truth. Pinecone holds one copy of it in the `resume` namespace of the `davidlarrimore-resume` index (both set in `lib/resume-index.json`; `PINECONE_RESUME_INDEX_NAME` overrides the index, and only `PINECONE_API_KEY` is required), and that namespace is a disposable mirror that can be rebuilt from the repo at any time.

To update the chatbot's knowledge:
1. Edit `lib/resume-content.json`.
2. Run `npm run generate-resume` to regenerate `public/files/resume.md`, `scripts/resume.txt`, `scripts/resume_chunks.json` and `scripts/resume_chunks.csv`. Commit these with the JSON change.
3. Merge to `main`. Every production container runs `scripts/start.sh` (the Dockerfile `CMD`), which runs `scripts/init-pinecone.js` before starting Next.js when `RAILWAY_ENVIRONMENT_NAME` is `production`. The sync upserts every chunk in `scripts/resume_chunks.json` by `_id` (the index embeds the text itself) and deletes any record whose `_id` is no longer in the file, so it is safe on every restart and never creates duplicates. A failed or slow sync (90 s limit) is logged and the server starts anyway, so a deploy can succeed without syncing: look for `Synced N records` in the Railway deploy logs (`Pinecone sync failed or timed out` means it did not).
4. Optionally run `npm run check-pinecone` locally afterwards. It fails if any chunk is missing or out of date, if the namespace holds records that are not in the file, or if the sample semantic searches miss.

To roll back, redeploy an earlier build in Railway: it syncs that build's content. `npm run init-pinecone` still works by hand (for example after the index is recreated), but it writes the checked-out content to the live namespace, so run it only from an up-to-date `main`. Locally, `npm start` and `docker compose` never sync. Do not create extra namespaces; the chat route reads only the one in `lib/resume-index.json`.

### Resume Chat Guidelines

Both chat modes enforce strict guidelines (defined in `route.ts`):
- Only answer David Larrimore-related questions
- Keep responses concise (2-3 sentences)
- Include job/company context when relevant
- Decline off-topic questions politely
- Maintain conversation history for follow-ups

### Analytics

Google Analytics integrated via `app/components/Analytics.tsx`:
- Loads GA4 script if `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` is set
- Custom hook in `app/hooks/useAnalytics.ts` for page view tracking

### Deployment

- Primary deployment: Railway platform
- CI/CD: Railway's GitHub integration deploys every push to `main` (no GitHub Actions workflow); each production start syncs Pinecone first (`scripts/start.sh`)
- `scripts/prune-merged-branches.sh` deletes branches whose PR has merged (it asks GitHub, so it handles squash merges)
- Uses npm (not pnpm despite lockfile presence)
