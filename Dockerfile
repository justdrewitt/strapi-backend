# Builder stage
FROM node:18.19.0-bullseye as builder
WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./

# Install all dependencies for building
RUN npm ci --legacy-peer-deps --no-audit --no-fund

# Copy source code
COPY . .

# Build the app
RUN NODE_OPTIONS="--max-old-space-size=4096" npm run build

# Production image
FROM node:18.19.0-bullseye
WORKDIR /app

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