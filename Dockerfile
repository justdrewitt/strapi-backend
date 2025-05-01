# Single-stage build for Railway with minimal memory usage
FROM node:18-alpine
WORKDIR /app

# Install essential build tools
RUN apk add --no-cache python3 make g++ git

# Copy only package files first
COPY package.json ./

# Install dependencies with minimal memory usage
RUN npm install --production=false --no-audit --no-fund

# Copy application code
COPY . .

# Set environment variables
ENV NODE_ENV=production
ENV PORT=1337

# Expose port
EXPOSE 1337

# Start command
CMD ["npm", "run", "start"]