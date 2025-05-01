# Build stage
FROM node:18-alpine AS build
WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app

# Install production dependencies
RUN apk add --no-cache python3 make g++

# Copy built assets from build stage
COPY --from=build /app ./

# Install production dependencies only
RUN npm install --omit=dev --legacy-peer-deps

# Expose the port the app runs on
EXPOSE 1337

# Start the application
CMD ["npm", "run", "start"] 