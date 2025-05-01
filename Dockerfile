# Build stage
FROM node:18-bullseye
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Set environment variables for native module compilation
ENV NODE_ENV=production
ENV npm_config_build_from_source=true
ENV npm_config_target_arch=x64
ENV npm_config_target_platform=linux
ENV npm_config_target_libc=musl

# Install dependencies with specific flags
RUN npm install --legacy-peer-deps --no-optional

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose the port
EXPOSE 1337

# Start the application
CMD ["npm", "run", "start"] 