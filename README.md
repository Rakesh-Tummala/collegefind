# College Discovery Platform

Track B internship assignment.

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


