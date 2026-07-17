# Vercel production checklist

## 1. Repository connection
- Connect the GitHub repository in Vercel
- Select the correct production branch (main or master)

## 2. Environment variables
Add the values from [.env.production.example](.env.production.example) in Vercel Project Settings > Environment Variables.

## 3. Database
For production, use PostgreSQL instead of SQLite.
Recommended providers:
- Neon
- Supabase
- Railway
- PlanetScale

## 4. Automatic deployments
Once the project is connected, Vercel will deploy automatically on every push to the selected branch.
