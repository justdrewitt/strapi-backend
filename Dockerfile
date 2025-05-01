# Builder stage
FROM node:18-alpine as builder
WORKDIR /app

# Install build tools for native modules
RUN apk add --no-cache python3 make g++

# Copy dependency files
COPY package.json package-lock.json ./

# Install all dependencies for building
RUN npm ci --legacy-peer-deps --no-audit --no-fund

# Copy source code
COPY . .

# Build the app
RUN NODE_OPTIONS="--max-old-space-size=2048" npm run build

# Production image
FROM node:18-alpine
WORKDIR /app

# Install build tools for native modules (if needed at runtime)
RUN apk add --no-cache python3 make g++

# Copy dependency files
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm ci --only=production --no-audit --no-fund

# Copy built app from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/config ./config
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

EXPOSE 1337
CMD ["npm", "run", "start"]