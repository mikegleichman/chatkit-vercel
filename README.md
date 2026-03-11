# ChatKit Vercel Deployment

A minimal, working deployment of OpenAI's ChatKit + Agent Builder for Vercel.

## Setup

1. Fork or upload this repo to GitHub
2. Import the repo into [Vercel](https://vercel.com)
3. Add these two Environment Variables in Vercel project settings:
   - `OPENAI_API_KEY` — your OpenAI API key (must be from the same project as your Agent Builder workflow)
   - `OPENAI_WORKFLOW_ID` — your Agent Builder workflow ID (starts with `wf_...`)
4. Deploy
5. Add your Vercel domain to the OpenAI domain allowlist:
   👉 https://platform.openai.com/settings/organization/security/domain-allowlist

## Structure

- `api/session.js` — Vercel serverless function that creates a ChatKit session
- `public/index.html` — Frontend page that loads the ChatKit web component
- `vercel.json` — Routing config for Vercel
