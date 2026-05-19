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

## Reference
- https://britishgeologicalsurvey.github.io/development/migrating-from-npm-to-pnpm/
