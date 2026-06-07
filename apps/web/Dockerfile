# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@11.0.0 --activate

# Copy package files
COPY ../../pnpm-workspace.yaml ./
COPY ../../package.json ./
COPY ./package.json ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Stage 2: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@11.0.0 --activate

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY ../../pnpm-workspace.yaml ./
COPY ../../package.json ./
COPY ./package.json ./

# Copy source code
COPY . .

# Build the application
RUN pnpm build

# Stage 3: Production
FROM node:20-alpine AS runner
WORKDIR /app

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Install pnpm
RUN corepack enable && corepack prepare pnpm@11.0.0 --activate

# Copy node_modules from builder
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/apps/web/node_modules ./node_modules

# Copy package.json
COPY ./package.json ./

# Copy next.config.mjs if it exists
COPY ./next.config.mjs ./

# Copy built application
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./.next/static

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

# Create public directory
RUN mkdir -p /app/public && chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
