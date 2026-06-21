# Privly

A privacy-first link gateway demo built with Next.js 16, React 19, and Tailwind CSS v4.

Wrap any URL behind `privly.to/your-alias` and gate it with a password, an access limit, an expiry, or a one-time burn. See exactly who opened it and revoke it instantly.

## Getting started

```sh
nvm install 24.13.1
nvm use 24.13.1
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Screens

| Route | Screen |
|---|---|
| `/` | Landing page |
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
- **JetBrains Mono** + **IBM Plex Sans** via `next/font/google`
- Mock data in `lib/mock-data.ts` — services are async wrappers ready for a real API

## Project structure

```
lib/          Types, mock data, utility functions
services/     Async data functions (links, analytics, gateway)
contexts/     AccentContext · LinksContext · ToastContext
hooks/        use-links · use-link · use-accent · use-toast · use-gateway
components/
  ui/         icons · stat-card · toggle · sparkline · status-badge
  layout/     sidebar · app-shell
  landing/    landing-nav · hero · terminal-mock · feature-row
  dashboard/  stat-cards-row · variant-switcher · links-table · links-cards · links-console · live-feed
  create/     create-form · access-control-row · gateway-preview
  analytics/  analytics-header · summary-row · opens-chart · geo-breakdown · access-log
  gateway/    gateway-card · blocked-card
  settings/   identity-card · accent-picker · privacy-toggles · danger-zone
app/          Next.js App Router pages and layouts
```
