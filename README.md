# David Larrimore's Personal Website

A modern, responsive personal website and portfolio built with Next.js, Tailwind CSS, and TypeScript. This site showcases my professional experience, technical skills, and projects.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 16, Tailwind CSS, and TypeScript
- **Design System v2**: Bold, dark-mode-forward visual language (HUD-style cards, mono eyebrows, accent glows) implemented as reusable `ds-*` components and CSS tokens
- **Responsive Design**: Optimized for all device sizes
- **Blog**: Markdown-file-backed blog with GFM (tables, task lists), syntax-highlighted code blocks, and live Mermaid diagram rendering — no CMS or database
- **Interactive Resume**: Detailed professional experience with a downloadable PDF version
- **AI-Powered Resume Chat**: Talk to an AI assistant about my experience and skills
  - Basic Mode: Uses the entire resume as context
  - RAG Mode: Leverages vector search to retrieve only relevant information
- **AI Scavenger Hunt**: Test your prompt engineering skills with challenging puzzles
- **Railway Deployment**: Auto-deploys to Railway on every push to `main`

## 🔧 Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS 3
- **Language**: TypeScript
- **AI Integration**: Claude (Haiku 4.5) via the Anthropic Messages API, called directly with `fetch()` — no SDK
- **Vector Database**: Pinecone for RAG implementation
- **Markdown**: react-markdown + remark-gfm + rehype-highlight + Mermaid for blog rendering
- **Deployment**: Railway (GitHub integration, auto-deploy on push to `main`)
- **Local Dev**: Docker Compose (optional alternative to `npm run dev`)
- **Version Control**: Git/GitHub

## 📋 Project Structure

```
├── app                     # Next.js application files
│   ├── api                 # API routes for AI features
│   ├── blog                # Blog list/post pages + markdown renderer, Mermaid component
│   ├── components          # React components
│   │   └── ds              # Design system v2 primitives (Card, Tag, Eyebrow, StatusPill, ...)
│   ├── globals.css         # Global styles + design system tokens (--bg, --fg, --accent, ds-* classes)
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── projects            # Project pages
│   │   ├── resumeChat      # Resume chatbot project
│   │   └── ScavengerHunt   # AI scavenger hunt
│   └── resume               # Resume page
├── lib                     # Utility functions and configuration
│   ├── config.ts           # Centralized environment variable access
│   └── blog.ts             # Reads/parses markdown posts from public/blog/posts
├── public
│   └── blog                # Blog content (source of truth, not code)
│       ├── posts           # One markdown file per post (frontmatter + body)
│       └── images          # Post images, referenced as absolute /blog/images/... paths
├── scripts                 # Utility scripts for AI setup
│   ├── resume_chunks.csv   # Resume data in CSV format
│   ├── resume_chunks.json  # Resume data processed for Pinecone
│   ├── csv-to-resume-chunks.js # Converter for resume data
│   ├── init-pinecone.js    # Script to initialize Pinecone index
│   └── check-pinecone.js   # Script to verify Pinecone setup
├── Dockerfile / docker-compose.yml  # Local dev container (hot reload, bind-mounted)
└── tailwind.config.js      # Tailwind configuration
```

## 🤖 AI Features

### Resume Chatbot

Ask questions about my professional experience, skills, and background. The chatbot has two modes:

- **Basic Mode**: Uses my entire resume as context for answering questions
- **RAG Mode** (Retrieval-Augmented Generation): Leverages Pinecone's vector database to retrieve only the most relevant sections of my resume based on your question

To set up the Pinecone vector database for the RAG feature:

```bash
npm run csv-to-resume-chunks  # Convert scripts/resume_chunks.csv to JSON
npm run init-pinecone         # Create the index and upload embeddings
npm run check-pinecone        # Verify the setup
```

### AI Scavenger Hunt

Test your prompt engineering skills with a series of challenges. Each challenge requires crafting effective prompts to extract specific information from the AI assistant.

## ✍️ Blog

Posts are plain markdown files — no CMS or database. To publish a new post, add a `.md` file to `public/blog/posts/` with a frontmatter block:

```yaml
---
title: "Post title"
date: "2026-08-16"
excerpt: "One or two sentences shown in the list view."
tags: ["Tag One", "Tag Two"]
cover: "/blog/images/<slug>/cover.jpg"
draft: false
---
```

Images go under `public/blog/images/` and are referenced with an absolute `/blog/images/...` path. Fenced ` ```mermaid ` code blocks render as live diagrams; other fenced code blocks get syntax highlighting automatically.

## 🚀 Deployment

This project is deployed on Railway. Railway's GitHub integration auto-deploys on every push to the `main` branch — there's no separate CI workflow file in this repo.

### Manual Deployment

```bash
# Deploy via Railway CLI
railway up
```

## 🛠️ Local Development

```bash
# Clone the repository
git clone https://github.com/davidlarrimore/davidlarrimore-dot-com.git
cd davidlarrimore-dot-com

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Docker (alternative)

```bash
docker compose up -d --build   # Build and serve on :3000, bind-mounted with hot reload
docker compose down            # Stop and remove the container
```

If `package.json` changes (new dependency added), rebuild with `-V`/`--renew-anon-volumes` to refresh the container's `node_modules` volume:

```bash
docker compose up -d --build -V
```

### Environment Variables

The following environment variables are required for full functionality:

```
# General Settings
NEXT_PUBLIC_SITE_NAME="David Larrimore | Personal Website"
PUBLIC_SITE_URL="https://davidlarrimore.com"

# Contact
CONTACT_EMAIL="davidlarrimore@gmail.com"

# Social Media
CONTACT_GITHUB_URL="https://github.com/davidlarrimore"
CONTACT_LINKEDIN_URL="https://linkedin.com/in/davidlarrimore"
CONTACT_TWITTER_URL="https://twitter.com/davidlarrimore"

# Analytics (optional)
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID="G-XXXXXXXXXX"

# Anthropic (for AI features)
ANTHROPIC_API_KEY="your-anthropic-api-key"

# Pinecone (for RAG features)
PINECONE_API_KEY="your-pinecone-api-key"
PINECONE_RESUME_INDEX_HOST="your-pinecone-host"
PINECONE_RESUME_INDEX_NAME="davidlarrimore-resume"
```

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## 📃 License

[MIT](https://choosealicense.com/licenses/mit/)
