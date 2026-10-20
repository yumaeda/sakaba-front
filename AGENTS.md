# AGENTS.md

## Project Overview
This is the frontend repository for **Sakaba Link (酒場 s)**, a platform for Tokyo restaurants focusing on takeout services. The application is built with **Next.js 16** (App Router), TypeScript, and uses React Server Components.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: SCSS (globals.css, scss/)
- **Routing**: Next.js App Router (`app/` directory)
- **Authentication**: JWT-based (HTTP-only cookies via Next.js API routes)
- **Build Tool**: Turborepo

## Project Structure
```
apps/
└── web/
     ├── app/                         # Next.js App Router
     │    ├── [area]/                  # Area listing pages
     │    │    └── [restaurant]/       # Restaurant detail within area
     │    ├── admin/                   # Admin dashboard routes
     │    │    ├── components/          # Admin-specific components
     │    │    │    ├── AdminRestaurantSelector.tsx
     │    │    │    └── PhotoUploadZone.tsx
     │    │    ├── index/               # Admin home
     │    │    ├── menu/                # Menu management
     │    │    ├── photo/               # Photo management
     │    │    ├── restaurant/          # Restaurant management
     │    │    ├── restaurant-drink/    # Drink management
     │    │    └── restaurant-genre/    # Genre management
     │    ├── api/                     # API routes
     │    │    ├── auth/                # Auth API routes
     │    │    │    ├── home/
     │    │    │    ├── menu/
     │    │    │    ├── photo/
     │    │    │    ├── restaurant/
     │    │    │    ├── restaurant-drink/
     │    │    │    ├── restaurant-genre/
     │    │    │    └── verify/          # JWT token validation
     │    │    ├── dishes/
     │    │    ├── drinks/
     │    │    ├── genres/
     │    │    ├── latest-photos/
     │    │    ├── login/
     │    │    ├── rankings/
     │    │    └── restaurants/
     │    ├── components/              # Shared app-level components
     │    │    └── ListingPage.tsx
     │    ├── dishes/                  # Dish listing pages
     │    ├── drinks/                  # Drink listing pages
     │    ├── genres/                  # Genre listing pages
     │    ├── geolocation/             # Geolocation page
     │    ├── member/                  # Member pages
     │    ├── ranking/                 # Ranking pages
     │    ├── signin/                  # Sign-in pages
     │    ├── layout.tsx               # Root layout
     │    └── page.tsx                 # Home page
     ├── components/                    # React components
     │    ├── Address.tsx
     │    ├── CategoryDropDown.tsx
     │    ├── CategorySwitch.tsx
     │    ├── DishPhotoList.tsx
     │    ├── Dropdown.tsx
     │    ├── Footer.tsx
     │    ├── LatestPhotoList.tsx
     │    ├── MenuList.tsx
     │    ├── MenuPrice.tsx
     │    ├── OpenHours.tsx
     │    ├── PhoneNumber.tsx
     │    ├── RestaurantDropdown.tsx
     │    ├── RestaurantList.tsx
     │    ├── RestaurantPageLink.tsx
     │    ├── RestaurantVideoList.tsx
     │    ├── RestaurantView.tsx
     │    └── UI/                      # UI subdirectory
     │         ├── IconLink.tsx
     │         ├── LoadingSpinner.tsx
     │         ├── SelectDropdown.tsx
     │         └── WebPImage.tsx
     ├── constants/                    # API_URL, IMG_URL, WEB_URL, geolocation defaults, localstorage keys
     │    ├── Global.ts
     │    └── StorageKeys.ts
     ├── interfaces/                    # TypeScript type definitions
     │    ├── Area.ts
     │    ├── Category.ts
     │    ├── Dish.ts
     │    ├── Drink.ts
     │    ├── Genre.ts
     │    ├── Geolocation.ts
     │    ├── Item.ts
     │    ├── JwtPayload.ts
     │    ├── Menu.ts
     │    ├── Photo.ts
     │    ├── Restaurant.ts
     │    ├── RestaurantInfo.ts
     │    └── Video.ts
     ├── scss/                          # SCSS source files
     │    ├── _Admin.scss
     │    ├── _Body.scss
     │    ├── _Menu.scss
     │    └── index.scss
     ├── types/                         # TypeScript type declarations
     │    └── css.d.ts
     ├── utils/                         # Utility functions
     │    ├── CookieUtility.ts
     │    ├── GeoLocationUtility.ts
     │    ├── HttpAuth.ts              # HTTP-only cookie → Bearer token
     │    ├── HttpUtility.ts
     │    ├── RestaurantIdHash.ts
     │    ├── usePhotoUpload.ts        # Custom photo upload hook
     │    └── hooks/
     │         ├── useAsyncData.ts
     │         ├── useAuth.ts
     │         └── useRestaurantList.ts
     ├── public/                        # Static assets (dist/ compiled CSS, images/ area & drink-category background images)
     ├── Dockerfile                     # Docker image (standalone Next.js build, non-root runtime)
     ├── next.config.js                 # output: 'standalone', reactStrictMode, CloudFront image patterns
     ├── package.json
     └── tsconfig.json                  # extends root tsconfig (project references)
```

## Development

### Prerequisites
- Node.js 18+ (Docker build uses Node 22)
- pnpm 11.6.0 (via `brew install pnpm` or corepack)

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

### Authentication
- JWT stored as HTTP-only cookie (key defined in `constants/StorageKeys.ts` as `JWT_KEY`).
- **Server-side auth**: `utils/HttpAuth.ts` — reads the cookie via `next/headers` and returns a `Bearer` token. All admin API routes use this utility.
- **Token verification**: `app/api/auth/verify/route.ts` validates JWT existence and expiration (returns 200 if valid, 401 if invalid/expired).
- **Login**: `app/api/login/route.ts` handles authentication and sets the HTTP-only cookie.
- **Client-side auth**: `utils/hooks/useAuth.ts` provides a React hook for checking auth state in client components.

### Photo Upload
- **Custom hook**: `usePhotoUpload` (`utils/usePhotoUpload.ts`) — XMLHttpRequest-based upload with real-time progress tracking, per-file state management, abort controller support, and timeout.
- **Component**: `PhotoUploadZone` (`app/admin/components/PhotoUploadZone.tsx`) — drag-and-drop zone with per-file progress bars, status indicators, and file size formatting. Accepts `image/jpeg`, `image/png`, `image/webp`.
- **API routes**: `app/api/auth/photo/route.ts` and `app/api/auth/photo/select/route.ts` handle photo CRUD.

### Routing
- File-based routing in `app/` directory. URL maps to file path (`/dishes/[id]` → `dishes/[id]/page.tsx`).
- Server Components are the default in `app/` (async functions). Use `'use client'` for interactivity.

### Data Fetching
- Native `fetch()` in server components with automatic caching/revalidation.
- Client components use `useEffect` with `fetch()` or custom hooks (`useAsyncData`, `useRestaurantList`).

## Deployment
- GitHub Actions (`.github/workflows/push-docker-image.yml`) on push to `main`
- Builds the Docker image from `apps/web/Dockerfile` (multi-stage: pnpm + standalone Next.js build, non-root runtime user serving `apps/web/server.js` on port 3000)
- Target: GCP Artifact Registry (us-central1), repository `sakabas-nextjs`, image `sakabas-nextjs:latest`
- GCP auth: Workload Identity Federation (no service account keys)

## Code Style
- TypeScript strict mode enabled
- Root `tsconfig.json` (project references) enables `strict`; `apps/web/tsconfig.json` extends it with `strictNullChecks`, `noImplicitAny`, `noImplicitThis`, `noImplicitReturns`, `noUnusedLocals`, `noUnusedParameters`
- Target: ES5, JSX: preserve
- Next.js 16 App Router patterns (server components by default)
- React functional components with hooks
- Functional API routes in `app/api/`

## Important Dependencies
- `jwt-decode` — token parsing
- `yet-another-react-lightbox` — image gallery
- `uuid` — UUID generation
- `camelcase-keys` — object key transformation
- `react` (^19.2.6) — UI library
- `react-dom` (^19.2.6) — DOM rendering
- `next` (^16.2.7) — React framework with App Router
