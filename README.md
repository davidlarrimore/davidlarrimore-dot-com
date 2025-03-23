# David Larrimore's Personal Website

A modern, responsive personal website and portfolio built with Next.js, Tailwind CSS, and TypeScript. This site showcases my professional experience, technical skills, and projects.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 15, Tailwind CSS, and TypeScript
- **Responsive Design**: Optimized for all device sizes
- **Dark Mode Support**: Automatic and manual dark mode switching
- **Interactive Resume**: Detailed professional experience with a downloadable PDF version
- **AI-Powered Resume Chat**: Talk to an AI assistant about my experience and skills
  - Basic Mode: Uses the entire resume as context
  - RAG Mode: Leverages vector search to retrieve only relevant information
- **AI Scavenger Hunt**: Test your prompt engineering skills with challenging puzzles
- **Railway Deployment**: Seamless deployment to Railway platform

## 🔧 Tech Stack

- **Frontend**: Next.js 15, React 18, Tailwind CSS
- **Language**: TypeScript
- **AI Integration**: Claude AI via Anthropic API
- **Vector Database**: Pinecone for RAG implementation
- **Deployment**: Railway Platform
- **Version Control**: Git/GitHub
- **CI/CD**: GitHub Actions for automated Railway deployment

## 📋 Project Structure

```
├── app                     # Next.js application files
│   ├── api                 # API routes for AI features
│   ├── components          # React components
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── projects            # Project pages
│   │   ├── resumeChat      # Resume chatbot project
│   │   └── ScavengerHunt   # AI scavenger hunt
│   └── resume              # Resume page
├── lib                     # Utility functions and configuration
├── public                  # Static assets
├── scripts                 # Utility scripts for AI setup
│   ├── resume_chunks.csv   # Resume data in CSV format
│   ├── resume_chunks.json  # Resume data processed for Pinecone
│   ├── csv-to-resume-chunks.js # Converter for resume data
│   ├── init-pinecone.js    # Script to initialize Pinecone index
│   └── check-pinecone.js   # Script to verify Pinecone setup
├── PINECONE_SETUP.md       # Detailed guide for Pinecone setup
└── tailwind.config.js      # Tailwind configuration
```

## 🤖 AI Features

### Resume Chatbot

Ask questions about my professional experience, skills, and background. The chatbot has two modes:

- **Basic Mode**: Uses my entire resume as context for answering questions
- **RAG Mode** (Retrieval-Augmented Generation): Leverages Pinecone's vector database to retrieve only the most relevant sections of my resume based on your question

For detailed instructions on setting up the Pinecone vector database for the RAG feature, see [PINECONE_SETUP.md](./PINECONE_SETUP.md)

### AI Scavenger Hunt

Test your prompt engineering skills with a series of challenges. Each challenge requires crafting effective prompts to extract specific information from the AI assistant.

## 🚀 Deployment

This project is deployed on Railway. Deployments happen automatically when changes are merged to the main branch via GitHub Actions.

### Manual Deployment

```bash
# Deploy via Railway CLI
railway up
```

## 🛠️ Local Development

```bash
# Clone the repository
git clone https://github.com/davidlarrimore/personal-website.git
cd personal-website

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Set up Pinecone for RAG features (optional)
# See PINECONE_SETUP.md for detailed instructions
npm run setup-resume      # Set up your resume markdown file
npm run csv-to-resume-chunks
npm run init-pinecone

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Environment Variables

The following environment variables are required for full functionality:

```
# General Settings
PUBLIC_SITE_URL="davidlarrimore.com"
PUBLIC_SITE_NAME="David Larrimore | Personal Website"

# Contact
CONTACT_EMAIL="davidlarrimore@gmail.com"

# Social Media
CONTACT_GITHUB_URL="https://github.com/davidlarrimore"
CONTACT_LINKEDIN_URL="https://linkedin.com/in/davidlarrimore"
CONTACT_X_URL="https://twitter.com/davidlarrimore"

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