# Build stage
FROM node:18-alpine
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache python3 make g++ libc6-compat

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