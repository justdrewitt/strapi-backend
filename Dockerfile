# Build stage
FROM node:18.19.0-bullseye as builder
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Create .strapi directory if it doesn't exist
RUN mkdir -p .strapi

# Create a script to force SWC to use JavaScript
RUN echo "#!/bin/sh\nexport SWC_JIT=0\nexec \"$@\"" > /usr/local/bin/swc-force-js && \
    chmod +x /usr/local/bin/swc-force-js

# Build the application
RUN npm run build

# Production stage
FROM node:18.19.0-bullseye
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN npm install --legacy-peer-deps --production

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/admin ./admin
COPY --from=builder /app/config ./config
COPY --from=builder /app/extensions ./extensions
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.strapi ./

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose the port
EXPOSE 1337

# Start the application
CMD ["npm", "run", "start"] 