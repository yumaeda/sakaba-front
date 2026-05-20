# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Sakaba Link (酒場s)** is a React frontend for a Tokyo restaurant takeout platform. The app lets users browse restaurants by area, dish type, drink category, or genre, and provides an admin dashboard for restaurant management.

## Monorepo Structure

```
├── apps/web/              # Single app — the restaurant browsing site
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── pages/     # Page components (HomePage, RestaurantPage, etc.)
│   │   │   │   └── admin/ # Admin dashboard pages
│   │   │   └── ...        # Shared UI components
│   │   ├── constants/     # API_URL, IMG_URL, cookie/localstorage keys
│   │   ├── interfaces/    # TypeScript type definitions
│   │   └── utils/         # HTTP, cookie, geolocation helpers
│   ├── scss/              # SCSS source files
│   ├── webpack.config.js  # Dual entry: TSX + SCSS
│   └── package.json
├── packages/              # (empty — reserved for shared packages)
├── turbo.json             # Turborepo configuration
├── pnpm-workspace.yaml    # Workspace definition
└── package.json           # Root workspace manifest
```

## Key Architecture Points

- **Build**: Webpack 5 with dual entry points — `src/index.tsx` (React app) and `scss/index.scss` (styles). Output: `index.min.js` + `index.css`.
- **Routing**: React Router DOM v6 with `BrowserRouter`. Routes defined in `apps/web/src/components/Root.tsx`.
- **Authentication**: JWT stored as an HTTP-only cookie. `PrivateRoute` component validates token expiry before rendering admin pages.
- **API**: All API calls go to `https://api.sakabas.com`. Images served from CloudFront (`https://d1ds2m6k69pml3.cloudfront.net`).
- **State**: Each page component manages its own state via React hooks (no global state manager).
- **Data fetching**: Direct `fetch()` calls in `useEffect` with `JSON.parse(JSON.stringify())` for cloning (no axios or React Query).
- **Virtualized lists**: `react-window` used for performance on long lists.

## Commands

```bash
# Install dependencies (requires GitHub token for private package @yumaeda/sakaba-interface)
export NODE_AUTH_TOKEN=ghp_your_token
pnpm install

# Development (starts web app dev server)
pnpm run dev

# Production build (runs webpack + tsc)
pnpm run build

# Lint (not configured yet)
pnpm run lint
```

## Deployment

- **CI/CD**: GitHub Actions (`.github/workflows/deploy.yml`) triggers on push to `main`.
- **Auth**: GCP Workload Identity Federation (no service account keys).
- **Target**: Google Cloud Storage bucket `gs://sakabas.com/`.
- **Deployed files**: `index.html`, `index.min.js`, `main.css`, `robots.txt`, `sitemap.xml`, `favicon.ico`.

## TypeScript Configuration

- Strict mode enabled (`strictNullChecks`, `noImplicitAny`, `noImplicitReturns`, `noUnusedLocals`, `noUnusedParameters`).
- Target: ES5, JSX: react.
- Each app has its own `tsconfig.json` extending the root.

## Skills

- `/create-pr` — Create a new Pull Request on GitHub from local changes (defined in `.claude/skills/create-pr/SKILL.md`)

## Important Dependencies

- `@yumaeda/sakaba-interface` (1.2.0) — private npm package, requires `NODE_AUTH_TOKEN`.
- `react-window` — virtualized rendering.
- `jwt-decode` — token parsing.
- `react-router-dom` v6 — routing.
