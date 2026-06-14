# sakaba-front
Repository for Sakabas Frontend - A Next.js 16 restaurant browsing platform for Tokyo restaurants.

## Features
- Browse restaurants by area, dish type, drink category, or genre
- View restaurant details with menus, photos, and videos
- Admin dashboard for restaurant management (menus, photos, restaurant info)
- JWT-based authentication via HTTP-only cookies

## Deployment
- Automatically deployed by GitHub Action upon commit to the main branch
- Target: Google Cloud Storage bucket `gs://sakabas.com/`

## Preparation
### Install Node
```zsh
brew install node
```

### Enable pnpm corepack
```zsh
brew install corepack
corepack enable
```

## Running locally
### Install packages
```zsh
pnpm install
```

### Build
```zsh
pnpm run build
```

### Start running locally
```zsh
pnpm run dev
```

## Docker

### Build Docker image
```zsh
docker build -t sakabas-nextjs -f apps/web/Dockerfile .
```

### Run Docker container locally
```zsh
docker run -p 3000:3000 sakabas-nextjs
```

### Run with environment variables
```zsh
docker run -p 3000:3000 \
    -e API_URL=https://api.sakabas.com \
    -e IMG_URL=https://d1ds2m6k69pml3.cloudfront.net \
  sakabas-nextjs
```

The container will serve the application on `http://localhost:3000`.

## Trouble Shooting
Launch Chrome by disabling CORS
```zsh
open -n -a "Google Chrome" --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security
```

## Reference
- https://britishgeologicalsurvey.github.io/development/migrating-from-npm-to-pnpm/