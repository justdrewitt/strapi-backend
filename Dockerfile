# Build stage
FROM node:18.19.0-bullseye as builder
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with memory optimization
RUN npm config set max-old-space-size=4096 && \
    npm install --legacy-peer-deps --no-audit --no-fund

# Copy source code
COPY . .

# Create .strapi directory if it doesn't exist
RUN mkdir -p .strapi

# Build the application
RUN npm config set max-old-space-size=4096 && \
    NODE_OPTIONS='--max-old-space-size=4096' npm run build

# Production stage
FROM node:18.19.0-bullseye
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Install production dependencies with memory optimization
RUN npm config set max-old-space-size=4096 && \
    NODE_OPTIONS='--max-old-space-size=4096' npm install --legacy-peer-deps --production --no-audit --no-fund

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/admin ./admin
COPY --from=builder /app/config ./config
COPY --from=builder /app/extensions ./extensions
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.strapi ./

# Remove unnecessary files
RUN rm -rf node_modules/.cache

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose the port
EXPOSE 1337

# Start the application
CMD ["npm", "run", "start"] 