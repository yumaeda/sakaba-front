# AGENTS.md

## Project Overview
This is the frontend repository for **Sakaba Link**, a platform for Tokyo restaurants focusing on takeout services. The application is built with React, TypeScript, and Webpack.

## Tech Stack
- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Webpack 5
- **Package Manager**: pnpm
- **Styling**: SCSS
- **Routing**: React Router DOM v6
- **Authentication**: JWT-based (jwt-decode)

## Project Structure
```
src/
├── components/          # React components
│   ├── pages/           # Page components (Home, Restaurant, Admin, etc.)
│   │   └── admin/       # Admin dashboard components
│   ├── Address.tsx
│   ├── CategorySwitch.tsx
│   ├── MenuList.tsx
│   └── ...
├── constants/           # Global constants and keys
├── interfaces/          # TypeScript interfaces
├── utils/               # Utility functions
└── index.tsx            # Entry point
```

## Development

### Prerequisites
- Node.js
- pnpm (installed via `brew install pnpm`)

### Setup
```bash
# Install dependencies (requires GitHub token for private packages)
export NODE_AUTH_TOKEN=ghp_your_token_here
pnpm install
```

### Commands
```bash
# Start development server
pnpm start

# Build for production
pnpm run build
```

## Architecture Notes
- The project uses a custom interface package `@yumaeda/sakaba-interface` for shared types
- Admin functionality is separated into dedicated admin pages under `src/components/pages/admin/`
- Restaurant pages are dynamically generated based on content type (Dish, Drink, Genre, etc.)

## Deployment
- Automatic deployment via GitHub Actions upon commit to `main` branch
- Configuration in `.github/workflows/deploy.yml`

## Code Style
- TypeScript strict mode enabled
- Webpack for bundling with SCSS processing
- React functional components with hooks

## Important Dependencies
- `react-window` for virtualized list rendering (performance optimization)
- `jwt-decode` for authentication token handling
- `uuid` for unique identifier generation
