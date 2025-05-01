# Multi-stage build for Strapi
FROM node:18-bullseye-slim as builder

# Install build dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --production

# Install SWC core explicitly
RUN npm install --save-dev @swc/core

# Copy source code
COPY . .

# Build Strapi
RUN npm run build

# Production stage
FROM node:18-bullseye-slim

WORKDIR /app

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/config ./config
COPY --from=builder /app/public ./public
COPY --from=builder /app/src ./src
COPY --from=builder /app/database ./database
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/favicon.png ./favicon.png
COPY --from=builder /app/types ./types
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Set environment variables
ENV NODE_ENV=production
ENV PORT=1337

# Expose port
EXPOSE 1337

# Start command
CMD ["npm", "run", "start"]