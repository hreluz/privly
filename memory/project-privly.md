---
name: project-privly
description: Privly Next.js project — architecture, tech choices, and key patterns
metadata:
  type: project
---

Privly is a privacy-first link gateway demo app implemented as a Next.js 16 App Router project.

**Why:** Full implementation of a DC (Design Component) prototype into a proper Next.js component architecture with hooks, services, and contexts using mock data.

## Tech stack
- Next.js 16.2.9 App Router, React 19, TypeScript, Tailwind CSS v4
- Fonts: JetBrains Mono + IBM Plex Sans via next/font/google
- Node.js 24.13.1 (nvm required)

## Route structure
- `/` — Landing (client component, no sidebar)
- `/(app)/dashboard` — Dashboard (LinksProvider + AppShell sidebar)
- `/(app)/dashboard/create` — Create link
- `/(app)/dashboard/links/[id]` — Analytics (client, reads from LinksContext)
- `/(app)/settings` — Settings (accent picker, privacy toggles)
- `/[alias]` — Visitor gateway catch-all (server component, reads from mockLinks)

## Key architectural decisions
- Route group `(app)` shares sidebar layout; landing and gateway don't
- `AccentProvider` + `ToastProvider` at root level (app/providers.tsx)
- `LinksProvider` only in `(app)/layout.tsx` — not on landing or gateway
- Gateway `/[alias]` is a Server Component; passes link to GatewayCard/BlockedCard client components
- Analytics page uses React 19 `use()` hook to unwrap getLinkAnalytics promise
- Accent colors set as CSS custom props on :root (`--accent`, `--accent-dim`, `--accent-glow`)
- All Tailwind v4 theme (colors, fonts, animations) configured in app/globals.css @theme block

## How to apply
- Before adding features, check (app)/layout.tsx vs root layout.tsx for correct provider scope
- New screens inside the app shell: add to `app/(app)/` 
- Visitor-facing public pages: add at `app/` root level (no sidebar, no LinksContext)
