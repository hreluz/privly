@AGENTS.md

# Node.js version

This project requires Node.js 24.13.1. Use nvm to set the correct version before running any commands:

```sh
nvm install 24.13.1
nvm use 24.13.1
```

# Dev server

```sh
npm run dev      # starts Next.js on http://localhost:3000
npm run build    # production build
npm run lint     # ESLint
```

# Architecture

- **Framework**: Next.js 16 (App Router) with React 19 and TypeScript
- **Styling**: Tailwind CSS v4 — theme config lives entirely in `app/globals.css` (`@theme` block), no `tailwind.config.js`
- **Fonts**: JetBrains Mono (mono) + IBM Plex Sans (sans) via `next/font/google`

## Route structure

```
app/
  page.tsx                          ← / landing
  (app)/
    layout.tsx                      ← shared sidebar shell (LinksProvider + AppShell)
    dashboard/page.tsx              ← /dashboard
    dashboard/create/page.tsx       ← /dashboard/create
    dashboard/links/[id]/page.tsx   ← /dashboard/links/:id analytics
    settings/page.tsx               ← /settings
  [alias]/page.tsx                  ← /:alias visitor gateway (catch-all, lower priority)
```

## Data flow

Mock data lives in `lib/mock-data.ts`. Services (`services/`) are async functions returning mock data — swapping to a real API means replacing those functions only.

State shared across the app:
- `contexts/links-context.tsx` — mutable link list, scoped to `(app)` route group
- `contexts/accent-context.tsx` — accent color + scanlines, persisted to `localStorage`, root-level
- `contexts/toast-context.tsx` — global toast, root-level

## Key conventions

- All interactive components (state, events, hooks) must have `'use client'` at the top
- Use `next/link` for navigation links; `useRouter().push()` for programmatic navigation
- Accent colors are CSS custom properties (`--accent`, `--accent-dim`, `--accent-glow`) set on `:root` by `AccentProvider`; use `var(--accent)` in inline styles or `text-[var(--accent)]` in Tailwind classes
- Custom Tailwind animation utilities: `animate-blink`, `animate-pulse-glow`, `animate-flicker`, `animate-spin-fast`, `animate-rise`
