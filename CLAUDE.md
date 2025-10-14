# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 personal website for David Larrimore featuring AI-powered interactive projects. The site showcases professional experience, skills, and includes two main AI features: an AI Resume Chat and an AI Scavenger Hunt game.

## Development Commands

```bash
# Development
npm run dev              # Start dev server with Turbo (runs on localhost:3000)
npm run build            # Build for production
npm run start            # Start production server

# Pinecone Setup (for RAG features)
npm run csv-to-resume-chunks  # Convert CSV resume data to JSON format
npm run init-pinecone         # Initialize Pinecone vector database with resume chunks
npm run check-pinecone        # Verify Pinecone setup and connection

# Asset Generation
npm run generate-favicons     # Generate favicon files from SVG icon
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
  - `layout.tsx`: Root layout with Analytics integration
  - `page.tsx`: Homepage

- **lib/**: Shared utilities
  - `config.ts`: Centralized environment variable configuration (site, contact, social, analytics)
  - `scavenger-hunt-questions.ts`: Question bank for scavenger hunt
  - `gtag.ts`: Google Analytics helpers

- **scripts/**: Data processing and Pinecone initialization scripts
  - `csv-to-resume-chunks.js`: Converts CSV resume data to JSON
  - `init-pinecone.js`: Creates/updates Pinecone index with resume embeddings
  - `check-pinecone.js`: Validates Pinecone configuration
  - `resume_chunks.csv`: Source resume data
  - `resume_chunks.json`: Processed resume chunks for Pinecone

- **public/files/**: Static content
  - `resume.md`: Full resume markdown (used in basic chat mode)

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
   - Embedding dimension: 1536 (note: init script uses mock embeddings)

Both modes:
- Use Claude 3 Haiku model via Anthropic API
- Maintain conversation context (last 10 messages)
- Follow strict guidelines to only answer David Larrimore-related questions
- Return formatted markdown responses

#### Scavenger Hunt (app/api/projects/scavenger-hunt/chat/route.ts)

- Simple chat interface with Claude 3 Haiku
- Context-specific system prompts based on challenge
- Designed to teach prompt engineering skills

### Environment Configuration

All environment variables centralized in `lib/config.ts`:
- Site configuration (name, URL)
- Contact information (email)
- Social media links (GitHub, LinkedIn, Twitter)
- Analytics (Google Analytics ID)
- API keys accessed directly in API routes (ANTHROPIC_API_KEY, PINECONE_API_KEY, etc.)

See `.env.example` for required environment variables.

### Styling

- Tailwind CSS v3.4 with dark mode support
- Custom CSS in `app/globals.css` and page-specific CSS (e.g., `resume/resume.css`)
- Dark mode: Uses CSS `dark:` prefix classes, automatic system detection

### Key Dependencies

- **@anthropic-ai/sdk**: Claude AI integration
- **@pinecone-database/pinecone**: Vector database for RAG
- **react-markdown**: Markdown rendering
- **react-icons**: Icon components

## Important Implementation Details

### Pinecone Setup

The RAG mode requires Pinecone initialization:
1. Resume data stored in `scripts/resume_chunks.csv`
2. Run `npm run csv-to-resume-chunks` to convert to JSON
3. Run `npm run init-pinecone` to create index and upload embeddings
4. **Note**: Current implementation uses mock embeddings in `init-pinecone.js` (line 28)
   - For production, replace with real embeddings from a model like OpenAI's text-embedding-ada-002

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
- CI/CD: GitHub Actions triggers Railway deployment on main branch merges
- Uses npm (not pnpm despite lockfile presence)
