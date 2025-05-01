# Build stage
FROM node:18.19.0-bullseye
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Set environment variables for native module compilation
ENV NODE_ENV=production
ENV npm_config_build_from_source=true
ENV npm_config_target_arch=x64
ENV npm_config_target_platform=linux

# Install dependencies with specific flags
RUN npm install --legacy-peer-deps --no-optional

# Rebuild native modules
RUN npm rebuild @swc/core --build-from-source

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose the port
EXPOSE 1337

# Start the application
CMD ["npm", "run", "start"] 