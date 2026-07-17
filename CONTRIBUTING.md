# Contributing

## Development workflow

1. Install dependencies with `npm install`
2. Create a local `.env` file from `.env.example`
3. Run Prisma setup:
   - `npx prisma generate`
   - `npx prisma db push`
   - `npx prisma db seed`
4. Start the app with `npm run dev`

## Quality checks

Run before opening a PR:

```bash
npm run build
```
