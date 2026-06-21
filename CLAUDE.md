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
npm run test:run # run all tests once
```

For local Supabase:

```sh
supabase start
supabase db reset   # applies all migrations in supabase/migrations/
```

# Architecture

- **Framework**: Next.js 16 (App Router) with React 19 and TypeScript
- **Styling**: Tailwind CSS v4 — theme config lives entirely in `app/globals.css` (`@theme` block), no `tailwind.config.js`
- **Fonts**: JetBrains Mono (mono) + IBM Plex Sans (sans) via `next/font/google`
- **Backend**: Supabase — Auth + `public.users` profile table
- **Testing**: Vitest + @testing-library/react (jsdom), config in `vitest.config.ts`

## Route structure

```
app/
  page.tsx                          ← / landing
  login/page.tsx                    ← /login
  register/page.tsx                 ← /register
  (app)/
    layout.tsx                      ← shared sidebar shell (LinksProvider + AppShell)
    dashboard/page.tsx              ← /dashboard
    dashboard/create/page.tsx       ← /dashboard/create
    dashboard/links/[id]/page.tsx   ← /dashboard/links/:id analytics
    settings/page.tsx               ← /settings
  [alias]/page.tsx                  ← /:alias visitor gateway (catch-all, lower priority)
```

## Data flow

Mock link data lives in `lib/mock-data.ts`. Services (`services/`) are async functions — swapping to a real API means replacing those functions only.

Auth uses Supabase directly via `services/auth.ts` (`login`, `register`, `logout`), backed by the browser client in `lib/supabase/client.ts`.

State shared across the app:
- `contexts/auth-context.tsx` — current user, auth status, login/register/logout; root-level
- `contexts/links-context.tsx` — mutable link list, scoped to `(app)` route group
- `contexts/accent-context.tsx` — accent color + scanlines, persisted to `localStorage`, root-level
- `contexts/toast-context.tsx` — global toast, root-level

Provider nesting order (outermost first): `AuthProvider → AccentProvider → ToastProvider`

## Key conventions

- All interactive components (state, events, hooks) must have `'use client'` at the top
- Use `next/link` for navigation links; `useRouter().push()` for programmatic navigation
- Accent colors are CSS custom properties (`--accent`, `--accent-dim`, `--accent-glow`) set on `:root` by `AccentProvider`; use `var(--accent)` in inline styles or `text-[var(--accent)]` in Tailwind classes
- Custom Tailwind animation utilities: `animate-blink`, `animate-pulse-glow`, `animate-flicker`, `animate-spin-fast`, `animate-rise`
- Context hooks are re-exported from `hooks/` (e.g. `useAuth` from `use-auth.ts`, `useLinks` from `use-links.ts`) — consume via the hook, not the context directly
- Auth/login pages live outside the `(app)` group and render without the sidebar

## Database

Migration files live in `supabase/migrations/`. Run `supabase db reset` to apply locally.

`public.users` table columns: `id` (FK → `auth.users`), `name`, `email`, `plan` (`free` | `pro`), `created_at`. RLS is enabled — users can only read/update their own row. A trigger (`handle_new_user`) auto-inserts a profile row on every Supabase Auth signup.

## Testing

Tests live in `__tests__/`. Service tests mock `@/lib/supabase/client`; hook tests mock `@/services/auth`. Use `vi.hoisted()` when mock factory functions reference module-level variables.
