# Vercel deployment guide

## 1. Connect repository

Import the GitHub repository in Vercel.

## 2. Configure environment variables

Add the values from [.env.production.example](.env.production.example) in Vercel Project Settings > Environment Variables.

## 3. Enable automatic deployments

Vercel will deploy automatically on every push to the default branch.

## 4. Production database

Use a managed PostgreSQL database (for example Neon, Supabase, or Railway) and set `DATABASE_URL` accordingly.
