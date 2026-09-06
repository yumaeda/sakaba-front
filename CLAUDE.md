# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Sakaba Link (酒場 s)** is a Next.js 16 frontend for a Tokyo restaurant takeout platform. The app lets users browse restaurants by area, dish type, drink category, or genre, and provides an admin dashboard for restaurant management.

## Monorepo Structure

```
├── apps/
│   └── web/                        # Next.js 16 restaurant browsing site
│       ├── app/                    # App Router (file-based routing)
│       │   ├── [area]/               # Area listing pages
│       │   │   └── [restaurant]/       # Restaurant detail within area
│       │   ├── admin/                # Admin dashboard routes
│       │   │   ├── components/         # Admin-specific components
│       │   │   ├── index/
│       │   │   ├── menu/
│       │   │   ├── photo/
│       │   │   ├── restaurant/
│       │   │   ├── restaurant-drink/
│       │   │   └── restaurant-genre/
│       │   ├── api/                  # API routes
│       │   │   ├── auth/               # Auth API routes
│       │   │   │   ├── home/
│       │   │   │   ├── menu/
│       │   │   │   ├── photo/
│       │   │   │   ├── restaurant/
│       │   │   │   ├── restaurant-drink/
│       │   │   │   └── restaurant-genre/
│       │   │   ├── categories/
│       │   │   ├── dishes/
│       │   │   ├── drinks/
│       │   │   ├── genres/
│       │   │   ├── latest-photos/
│       │   │   ├── login/
│       │   │   ├── menus/
│       │   │   ├── rankings/
│       │   │   ├── restaurants/            # + /areas, /dishes, /drinks, /genres
│       │   │   └── restaurant-counts/      # /[latitude]/[longitude]
│       │   ├── components/           # Shared listing page component
│       │   ├── dishes/               # Dish listing pages
│       │   ├── drinks/               # Drink listing pages
│       │   ├── genres/               # Genre listing pages
│       │   ├── geolocation/          # Geolocation page
│       │   ├── member/               # Member pages
│       │   ├── ranking/              # Ranking pages
│       │   ├── signin/               # Sign-in pages
│       │   ├── globals.css           # Global CSS
│       │   ├── layout.tsx            # Root layout
│       │   └── page.tsx              # Home page
│       ├── components/               # React components
│       │   ├── UI/                   # UI subdirectory
│       │   ├── Address.tsx
│       │   ├── CategoryDropDown.tsx
│       │   ├── CategorySwitch.tsx
│       │   ├── DishPhotoList.tsx
│       │   ├── Dropdown.tsx
│       │   ├── Footer.tsx
│       │   ├── LatestPhotoList.tsx
│       │   ├── MenuList.tsx
│       │   ├── MenuPrice.tsx
│       │   ├── OpenHours.tsx
│       │   ├── PhoneNumber.tsx
│       │   ├── PhotoCacheContext.tsx
│       │   ├── RestaurantDropdown.tsx
│       │   ├── RestaurantList.tsx
│       │   ├── RestaurantPageLink.tsx
│       │   ├── RestaurantVideoList.tsx
│       │   └── RestaurantView.tsx
│       ├── constants/              # API_URL, IMG_URL, WEB_URL, geolocation defaults, localstorage keys
│       │   ├── Global.ts
│       │   └── StorageKeys.ts
│       ├── interfaces/             # TypeScript type definitions
│       │   ├── Area.ts
│       │   ├── Category.ts
│       │   ├── Dish.ts
│       │   ├── Drink.ts
│       │   ├── Genre.ts
│       │   ├── Geolocation.ts
│       │   ├── Item.ts
│       │   ├── JwtPayload.ts
│       │   ├── Menu.ts
│       │   ├── Photo.ts
│       │   ├── Restaurant.ts
│       │   ├── RestaurantInfo.ts
│       │   └── Video.ts
│       ├── scss/                   # SCSS source files
│       │   ├── _Admin.scss
│       │   ├── _Body.scss
│       │   ├── _Menu.scss
│       │   └── index.scss
│       ├── types/                  # TypeScript type declarations
│       │   └── css.d.ts
│       ├── utils/                  # Utility functions
│       │   ├── CookieUtility.ts
│       │   ├── GeoLocationUtility.ts
│       │   ├── HttpUtility.ts
│       │   ├── RestaurantIdHash.ts
│       │   └── hooks/
│       │       ├── useAsyncData.ts
│       │       ├── useAuth.ts
│       │       └── useRestaurantList.ts
│       ├── public/                 # Static assets (dist/ compiled CSS, images/ area & drink-category background images)
│       ├── Dockerfile              # Docker image (standalone Next.js build, non-root runtime)
│       ├── next.config.js          # output: 'standalone', reactStrictMode, CloudFront image patterns
│       ├── package.json
│       └── tsconfig.json           # extends root tsconfig (project references)
├── turbo.json                        # Turborepo configuration
├── pnpm-workspace.yaml               # Workspace definition
└── package.json                      # Root workspace manifest
```

## Key Architecture Points

- **Build**: Next.js 16 App Router with TypeScript. `next.config.js` sets `output: 'standalone'` — `pnpm build` (Turborepo) produces a self-contained `.next/standalone` bundle, packaged for deployment by `apps/web/Dockerfile`.
- **Routing**: File-based routing in `app/` directory. URL maps to file path (`/dishes/[id]` → `dishes/[id]/page.tsx`).
- **Authentication**: JWT stored as HTTP-only cookie. Admin routes protected via API route handlers checking `Set-Cookie` header.
- **API**: All API calls go to `https://api.sakabas.com`. Images served from CloudFront (`https://d1ds2m6k69pml3.cloudfront.net`). Web URL: `https://sakabas.com`.
- **Server Components**: Default in `app/` directory (async functions). Use `'use client'` for interactivity.
- **State**: Server components fetch data directly; client components use React hooks for UI state.
- **Data fetching**: Native `fetch()` in server components with automatic caching. Client components use `useEffect` with `fetch()`.
- **Utilities**: Shared utilities in `utils/` (CookieUtility, GeoLocationUtility, HttpUtility, RestaurantIdHash) and custom hooks in `utils/hooks/` (useAsyncData, useAuth, useRestaurantList).

## Commands

```bash
pnpm install

# Development (starts Next.js dev server on port 3000)
pnpm run dev

# Production build
pnpm run build

# Start production server
pnpm start

# Lint
pnpm run lint
```

## Deployment

- **CI/CD**: GitHub Actions (`.github/workflows/push-docker-image.yml`) triggers on push to `main`.
- **Auth**: GCP Workload Identity Federation (no service account keys).
- **Target**: GCP Artifact Registry (us-central1), repository `sakabas-nextjs`, image `sakabas-nextjs:latest`.
- **Build**: Multi-stage Docker build (`apps/web/Dockerfile`): node:22-alpine + pnpm + standalone Next.js build, runs as a non-root user serving `apps/web/server.js` on port 3000.

## TypeScript Configuration

- Root `tsconfig.json` (project references) enables `strict`; `apps/web/tsconfig.json` extends it and adds `strictNullChecks`, `noImplicitAny`, `noImplicitThis`, `noImplicitReturns`, `noUnusedLocals`, `noUnusedParameters`.
- Target: ES5, JSX: preserve.
- App Router pages: Server Components by default (async functions).

## Skills

- `/create-pr` — Create a new Pull Request on GitHub from local changes (defined in `.claude/skills/create-pr/SKILL.md`)
- `/delete-local-branches` — Remove all local branches except `main`/`master` (defined in `.claude/skills/delete-local-branches/SKILL.md`)

## Important Dependencies

- `jwt-decode` — token parsing.
- `next` (^16.2.7) — React framework with App Router.
- `yet-another-react-lightbox` (^3.32.0) — image gallery.
- `react` (^19.2.6) — UI library.
- `react-dom` (^19.2.6) — DOM rendering.
- `uuid` (^7.0.3) — UUID generation.
- `camelcase-keys` (^10.0.2) — object key transformation.
