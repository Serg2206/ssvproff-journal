# SSVproff Journal

Modern medical journal with AI-assisted editorial tools, built with Next.js, TypeScript, Prisma, and Tailwind CSS.

## Overview

SSVproff is a professional medical publishing platform focused on surgery, scientific research, and AI-enabled editorial workflows.

## Features

- Modern responsive UI
- AI-assisted article analysis and chatbot workflows
- Editorial and research-oriented content structure
- Prisma-backed data layer with SQLite for local development
- Ready for Vercel deployment with CI checks

## Tech stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Prisma ORM
- NextAuth-compatible architecture
- Vercel deployment support

## Requirements

- Node.js 20+
- npm
- Git

## Local development

```bash
git clone https://github.com/Serg2206/ssvproff-journal.git
cd ssvproff-journal
npm install
cp .env.example .env
npx prisma generate
npx prisma db push
npx prisma db seed
npm run dev
```

Open http://localhost:3000.

## Environment variables

Create a local .env file with:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=change-me
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
ABACUSAI_API_KEY=demo-key
```

## Deployment

### Vercel

1. Import the repository in Vercel
2. Set the framework to Next.js
3. Add environment variables in Vercel Project Settings
4. Deploy

The project already includes a Vercel config in [vercel.json](vercel.json).

### CI/CD

GitHub Actions workflow is configured in [.github/workflows/ci.yml](.github/workflows/ci.yml).

For production deployment, use the template in [.env.production.example](.env.production.example) and the deployment guide in [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md).

## Project structure

```text
app/                # App router pages and API routes
components/         # Reusable UI components
lib/                # Data access and helpers
prisma/             # Prisma schema and migrations
public/             # Static assets
scripts/            # Seed and utility scripts
```

## Quality checks

Run before opening a PR:

```bash
npm run build
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

See [LICENSE](LICENSE).
