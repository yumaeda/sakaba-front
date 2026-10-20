---
name: claude-code-guide
description: Comprehensive guide for Claude Code working with the Sakaba Link (酒場 s) Next.js 16 project.
---

# CLAUDE.md

This file provides guidance for Claude Code (and other AI agents) when working with the Sakaba Link project.

## Project Overview

**Sakaba Link (酒場 s)** is a Next.js 16 frontend for a Tokyo restaurant takeout platform. The app lets users browse restaurants by area, dish type, drink category, or genre, and provides an admin dashboard for restaurant management.

## Monorepo Structure

```
├── apps/
│   └── web/                        # Next.js 16 restaurant browsing site
│       ├── app/                    # App Router (file-based routing)
│       │   ├── [area]/               # Area listing pages
│       │   │   └── [restaurant]/       # Restaurant detail within area
│       │   ├── admin/                # Admin dashboard (layout.tsx + pages)
│       │   │   ├── components/         # Admin-specific components
│       │   │   │   ├── AdminRestaurantSelector.tsx
│       │   │   │   └── PhotoUploadZone.tsx
│       │   │   ├── index/
│       │   │   ├── menu/
│       │   │   ├── photo/
│       │   │   ├── restaurant/
│       │   │   ├── restaurant-drink/
│       │   │   └── restaurant-genre/
│       │   ├── api/                  # API routes
│       │   │   ├── auth/               # Admin auth middleware routes
│       │   │   │   ├── home/
│       │   │   │   ├── menu/
│       │   │   │   │   └── route/
│       │   │   │   ├── photo/
│       │   │   │   │   ├── route/
│       │   │   │   │   └── select/
│       │   │   │   ├── restaurant/
│       │   │   │   ├── restaurant-drink/
│       │   │   │   ├── restaurant-genre/
│       │   │   │   └── verify/         # JWT token validation
│       │   │   ├── categories/
│       │   │   │   └── [restaurantId]/
│       │   │   ├── dishes/
│       │   │   │   └── route/
│       │   │   ├── drinks/
│       │   │   │   └── route/
│       │   │   ├── genres/
│       │   │   │   └── route/
│       │   │   ├── latest-photos/
│       │   │   ├── login/
│       │   │   ├── rankings/
│       │   │   ├── restaurants/            # + /areas, /dishes, /drinks, /genres
│       │   │   │   └── route/
│       │   │   └── restaurant-counts/      # /[latitude]/[longitude]/route.ts
│       │   ├── components/           # Shared app-level components
│       │   │   └── ListingPage.tsx
│       │   ├── dishes/               # Dish listing pages
│       │   ├── drinks/               # Drink listing pages
│       │   ├── genres/               # Genre listing pages
│       │   ├── geolocation/          # Geolocation page
│       │   ├── member/               # Member pages
│       │   ├── ranking/              # Ranking pages
│       │   ├── signin/               # Sign-in page
│       │   ├── layout.tsx            # Root layout
│       │   └── page.tsx              # Home page
│       ├── components/               # React UI components
│       │   ├── UI/                   # UI subdirectory
│       │   │   ├── IconLink.tsx
│       │   │   ├── LoadingSpinner.tsx
│       │   │   ├── SelectDropdown.tsx
│       │   │   └── WebPImage.tsx
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
│       │   ├── HttpAuth.ts           # HTTP-only cookie → Bearer token
│       │   ├── HttpUtility.ts
│       │   ├── RestaurantIdHash.ts
│       │   ├── usePhotoUpload.ts     # Custom photo upload hook
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
- **Server Components**: Default in `app/` directory (async functions). Use `'use client'` for interactivity.
- **State**: Server components fetch data directly; client components use React hooks for UI state.
- **Data fetching**: Native `fetch()` in server components with automatic caching. Client components use `useEffect` with `fetch()`.

### Authentication

- JWT stored as HTTP-only cookie (`JWT_KEY` from `constants/StorageKeys.ts`).
- **Server-side auth**: `getAuthToken()` in `utils/HttpAuth.ts` is the single source of truth — it reads the cookie via `next/headers` and returns a `Bearer` token string. All admin API routes (`app/api/auth/*`) use this utility.
- **Token verification**: `app/api/auth/verify/route.ts` validates JWT existence and expiration (returns 200 if valid, 401 if invalid/expired).
- **Login**: `app/api/login/route.ts` handles authentication and sets the HTTP-only cookie.
- **Client-side auth**: `utils/hooks/useAuth.ts` provides a React hook for checking auth state in client components.

### Photo Upload

- **Custom hook**: `usePhotoUpload` (`utils/usePhotoUpload.ts`) — XMLHttpRequest-based upload with real-time progress tracking, per-file state management, abort controller support, and 5-minute timeout per upload.
- **Component**: `PhotoUploadZone` (`app/admin/components/PhotoUploadZone.tsx`) — drag-and-drop zone with per-file progress bars, status indicators, and file size formatting. Accepts `image/jpeg`, `image/png`, `image/webp`.
- **API routes**: `app/api/auth/photo/route.ts` and `app/api/auth/photo/select/route.ts` handle photo CRUD.

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
