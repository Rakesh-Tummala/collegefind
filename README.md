# College Discovery Platform

Production-ready Track B internship assignment built with Next.js 15 App Router, React, TypeScript, TailwindCSS, PostgreSQL, Prisma ORM, NextAuth, and Zod.

## Folder Structure

```text
CollegeDiscoveryPlatform/
  app/
    api/
      auth/[...nextauth]/route.ts
      auth/signup/route.ts
      colleges/[id]/route.ts
      colleges/route.ts
      save/[id]/route.ts
      save/route.ts
    college/[id]/page.tsx
    compare/page.tsx
    login/page.tsx
    saved/page.tsx
    signup/page.tsx
    globals.css
    layout.tsx
    loading.tsx
    not-found.tsx
    page.tsx
  components/
    auth/auth-form.tsx
    college/college-card.tsx
    college/college-filters.tsx
    college/save-button.tsx
    compare/compare-button.tsx
    compare/compare-client.tsx
    layout/header.tsx
    providers/session-provider.tsx
    ui/badge.tsx
    ui/button.tsx
    ui/empty-state.tsx
    ui/input.tsx
    ui/pagination.tsx
    ui/select.tsx
    ui/skeleton.tsx
    ui/table.tsx
  lib/
    auth.ts
    format.ts
    prisma.ts
    repositories/college-repository.ts
    repositories/user-repository.ts
    services/college-service.ts
    types/api.ts
    validators/auth.ts
    validators/college.ts
  prisma/
    schema.prisma
    seed.ts
  types/
    next-auth.d.ts
  docker-compose.yml
  eslint.config.mjs
  middleware.ts
  next.config.ts
  package.json
  tailwind.config.ts
  vercel.json
```

## Local Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy environment variables:
   ```bash
   cp .env.example .env
   ```
3. Create a Neon PostgreSQL database and paste its pooled connection string into `DATABASE_URL`. For local-only development, run `docker compose up -d` and use `postgresql://college:college@localhost:5432/college_discovery`.
4. Generate Prisma client and run migrations:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate -- --name init
   ```
5. Seed 100 Indian colleges:
   ```bash
   npm run db:seed
   ```
6. Start the app:
   ```bash
   npm run dev
   ```

Demo login after seeding:

- Email: `demo@collegehub.in`
- Password: `Password123!`

## Deployment: Vercel + Neon

1. Push the repository to GitHub.
2. Create a Neon PostgreSQL project and copy the production connection string.
3. Import the GitHub repo into Vercel.
4. Add environment variables in Vercel:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` set to the deployed Vercel URL.
5. Set the Vercel build command to `npm run build`.
6. Run migrations against production:
   ```bash
   npm run prisma:deploy
   ```
7. Seed production if needed:
   ```bash
   npm run db:seed
   ```
