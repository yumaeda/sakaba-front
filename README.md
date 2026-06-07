# sakaba-front
Repository for Sakabas Frontend

## Deployment
- Automatically deployed by GitHub Action upon commit to the main branch.

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
export NODE_AUTH_TOKEN=ghp_xxxxxxxxxxxxxxxx
pnpm install
```

### Build
```zsh
pnpm run build
```

### Start running locally
```zsh
pnpm start
```

## Docker

### Build Docker image
```zsh
cd apps/web
docker build -t sakaba-front .
```

### Run Docker container locally
```zsh
docker run -p 3000:3000 sakaba-front
```

### Run with environment variables
```zsh
docker run -p 3000:3000 \
   -e API_URL=https://api.sakabas.com \
   -e IMG_URL=https://d1ds2m6k69pml3.cloudfront.net \
  sakaba-front
```

The container will serve the application on `http://localhost:3000`.

## Reference
- https://britishgeologicalsurvey.github.io/development/migrating-from-npm-to-pnpm/
