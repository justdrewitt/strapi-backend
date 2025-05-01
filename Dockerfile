# Build stage
FROM node:18-alpine AS build
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app

# Copy built assets from build stage
COPY --from=build /app ./

# Install production dependencies only
RUN npm install --omit=dev

# Expose the port the app runs on
EXPOSE 8080

# Start the application
CMD ["npm", "run", "start"] 