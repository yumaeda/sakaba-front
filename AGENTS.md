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
     │    │    ├── index/               # Admin home
     │    │    ├── menu/                # Menu management
     │    │    ├── photo/               # Photo management
     │    │    ├── restaurant/            # Restaurant management
     │    │    ├── restaurant-drink/    # Drink management
     │    │    └── restaurant-genre/    # Genre management
     │    ├── api/                     # API routes
     │    │    ├── auth/                # Auth API routes
     │    │    │    ├── home/
     │    │    │    ├── menu/
     │    │    │    ├── photo/
     │    │    │    ├── restaurant/
     │    │    │    ├── restaurant-drink/
     │    │    │    └── restaurant-genre/
     │    │    ├── categories/          # Category routes
     │    │    ├── dishes/
     │    │    ├── drinks/
     │    │    ├── genres/
     │    │    ├── latest-photos/
     │    │    ├── login/
     │    │    ├── menus/
     │    │    ├── rankings/
     │    │    ├── restaurants/
     │    │    └── restaurant-counts/
     │    ├── components/              # Shared listing page component
     │    ├── dishes/                  # Dish listing pages
     │    ├── drinks/                  # Drink listing pages
     │    ├── genres/                  # Genre listing pages
     │    ├── geolocation/             # Geolocation page
     │    ├── member/                  # Member pages
     │    ├── ranking/                 # Ranking pages
     │    ├── restaurant/              # Restaurant detail pages
     │    ├── signin/                  # Sign-in pages
     │    ├── globals.css              # Global CSS
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
     │    ├── PhotoCacheContext.tsx
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
     ├── constants/                    # API_URL, IMG_URL, cookie/localstorage keys
     │    ├── CookieKeys.ts
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
     │    ├── HttpUtility.ts
     │    ├── RestaurantIdHash.ts
     │    └── hooks/
     │         ├── useAsyncData.ts
     │         ├── useAuth.ts
     │         └── useRestaurantList.ts
     ├── public/                        # Static assets
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
- **Data fetching**: Native `fetch()` in server components, automatic caching/revalidation

## Deployment
- Automatic deployment via GitHub Actions upon commit to `main` branch
- Configuration in `.github/workflows/`
- Target: Google Cloud Storage bucket `gs://sakabas.com/`

## Code Style
- TypeScript strict mode enabled
- Next.js 16 App Router patterns (server components by default)
- React functional components with hooks
- Functional API routes in `app/api/`

## Important Dependencies
- `jwt-decode` — token parsing
- `yet-another-react-lightbox` — image gallery
- `uuid` — UUID generation
- `camelcase-keys` — object key transformation
