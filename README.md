# Privly

A privacy-first link gateway built with Next.js 16, React 19, Tailwind CSS v4, and Supabase.

Wrap any URL behind `privly.to/your-alias` and gate it with a password, an access limit, an expiry, or a one-time burn. See exactly who opened it and revoke it instantly.

## Getting started

```sh
nvm install 24.13.1
nvm use 24.13.1
npm install
```

Copy environment variables and fill in your Supabase project credentials:

```sh
cp .env.local.example .env.local
```

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

For local development, start Supabase first:

```sh
supabase start
supabase db reset   # applies migrations
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Screens

| Route | Screen |
|---|---|
| `/` | Landing page |
| `/login` | Sign in |
| `/register` | Create account |
| `/dashboard` | Links overview (table / cards / console views) |
| `/dashboard/create` | Create a gated link |
| `/dashboard/links/:id` | Per-link analytics |
| `/settings` | Account settings, accent color, privacy defaults |
| `/:alias` | Visitor gateway (password gate, blocked states) |

Demo gateway links to try:

- [`/q4-report`](http://localhost:3000/q4-report) — password-protected (password: `phoenix`)
- [`/beta-invite`](http://localhost:3000/beta-invite) — limit reached
- [`/press-kit`](http://localhost:3000/press-kit) — expired
- [`/nda-draft`](http://localhost:3000/nda-draft) — one-time armed
- [`/wallet-seed`](http://localhost:3000/wallet-seed) — burned

## Tech stack

- **Next.js 16** App Router with Server + Client Components
- **React 19** with `use()` hook for async data
- **Tailwind CSS v4** — all theme config in `app/globals.css`
- **Supabase** — Auth + `public.users` profile table
- **JetBrains Mono** + **IBM Plex Sans** via `next/font/google`
- **Vitest** + **@testing-library/react** for unit and hook tests

## Project structure

```
lib/
  supabase/   Supabase browser client factory
  types.ts    Shared TypeScript interfaces
  mock-data.ts  Mock link data
  utils.ts    Helpers (accentMap, statusMeta, ago…)
services/     Async data functions (auth, links, analytics, gateway)
contexts/     AuthContext · AccentContext · LinksContext · ToastContext
hooks/        use-auth · use-links · use-link · use-accent · use-toast · use-gateway
components/
  ui/         icons · stat-card · toggle · sparkline · status-badge
  layout/     sidebar · app-shell
  auth/       login-form · register-form
  landing/    landing-nav · hero · terminal-mock · feature-row
  dashboard/  stat-cards-row · variant-switcher · links-table · links-cards · links-console · live-feed
  create/     create-form · access-control-row · gateway-preview
  analytics/  analytics-header · summary-row · opens-chart · geo-breakdown · access-log
  gateway/    gateway-card · blocked-card
  settings/   identity-card · accent-picker · privacy-toggles · danger-zone
app/          Next.js App Router pages and layouts
supabase/
  migrations/ SQL migration files
__tests__/
  services/   auth.test.ts
  hooks/      use-auth.test.tsx
```

## Running tests

```sh
npm run test:run       # single run
npm run test           # watch mode
npm run test:coverage  # coverage report
```
