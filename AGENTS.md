# AGENTS.md

## Project Overview
This is the frontend repository for **Sakaba Link (酒場 s)**, a platform for Tokyo restaurants focusing on takeout services. The application is built with **Next.js 14** (App Router), TypeScript, and uses React Server Components.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: SCSS + Tailwind (globals.css)
- **Routing**: Next.js App Router (`app/` directory) + React Router (legacy `components/pages/`)
- **Authentication**: JWT-based (HTTP-only cookies via Next.js API routes)

## Project Structure
```
apps/
└── web/
    ├── app/                    # Next.js App Router
    │    ├── (layout)/          # Root layout wrapper
    │    ├── admin/             # Admin dashboard routes
    │    │    ├── index/
    │    │    ├── menu/
    │    │    ├── photo/
    │    │    ├── restaurant/
    │    │    ├── restaurant-drink/
    │    │    └── restaurant-genre/
    │    ├── area/              # Area listing pages
    │    ├── dishes/            # Dish listing pages
    │    ├── drinks/            # Drink listing pages
    │    ├── genres/            # Genre listing pages
    │    ├── geolocation/       # Geolocation page
    │    ├── member/            # Member pages
    │    ├── ranking/           # Ranking pages
    │    ├── restaurant/        # Restaurant detail pages
    │    ├── signin/            # Sign-in pages
    │    ├── layout.tsx         # Root layout
    │    └── page.tsx           # Home page
    ├── components/             # Legacy React components
    │    ├── pages/            # Old page components (React Router)
    │    │    └── admin/       # Legacy admin pages
    │    ├── Address.tsx
    │    ├── CategorySwitch.tsx
    │    ├── MenuList.tsx
    │    └── ...
    ├── constants/              # API_URL, IMG_URL, cookie keys
    ├── interfaces/             # TypeScript type definitions
    ├── scss/                   # SCSS source files
    ├── utils/                  # HTTP, cookie, geolocation helpers
    ├── index.tsx               # Entry point (legacy)
    └── package.json
```

## Development

### Prerequisites
- Node.js 18+
- pnpm (installed via `brew install pnpm`)

### Setup
```bash
# Install dependencies (requires GitHub token for private packages)
export NODE_AUTH_TOKEN=ghp_your_token
pnpm install
```

### Commands
```bash
# Start development server
pnpm run dev

# Build for production
pnpm run build

# Start production server
pnpm start

# Lint
pnpm run lint
```

## Architecture Notes
- **Next.js App Router**: New routes live in `app/` directory with file-based routing
- **Server Components**: Default component type in `app/` (async functions)
- **Client Components**: Marked with `'use client'` directive for interactivity
- **Admin API**: RESTful API routes in `app/api/` directory
- **Legacy Code**: `components/pages/` directory maintained for backward compatibility
- **Data fetching**: Native `fetch()` in server components, automatic caching/revalidation

## Deployment
- Automatic deployment via GitHub Actions upon commit to `main` branch
- Configuration in `.github/workflows/deploy.yml`
- Target: Google Cloud Storage bucket `gs://sakabas.com/`

## Code Style
- TypeScript strict mode enabled
- Next.js 14 App Router patterns (server components by default)
- React functional components with hooks
- Functional API routes in `app/api/`

## Important Dependencies
- `@yumaeda/sakaba-interface` (1.2.0) — private npm package
- `jwt-decode` — token parsing
- `react-window` — virtualized rendering
- `yet-another-react-lightbox` — image gallery
