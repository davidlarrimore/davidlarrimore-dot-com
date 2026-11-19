#!/bin/sh
# Container entrypoint (Dockerfile CMD). In Railway production it first syncs the Pinecone
# `resume` namespace to the scripts/resume_chunks.json in this build, so the chatbot's
# knowledge always matches the deployed commit. A failed or slow sync never blocks startup:
# the chat route falls back to the full resume when retrieval fails.
if [ "$RAILWAY_ENVIRONMENT_NAME" = "production" ]; then
  timeout 90 node scripts/init-pinecone.js || echo "Pinecone sync failed or timed out; starting anyway."
fi
exec npm run start
