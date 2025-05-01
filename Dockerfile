# Build stage
FROM node:18-alpine
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./

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