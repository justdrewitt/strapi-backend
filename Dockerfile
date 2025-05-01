# Production-only Dockerfile for pre-built Strapi
FROM node:18-alpine
WORKDIR /app

# Install minimal dependencies for production
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm install --production --no-audit --no-fund

# Copy pre-built application
COPY ./dist ./dist
COPY ./config ./config
COPY ./public ./public
COPY ./src ./src
COPY ./database ./database
COPY ./.env ./.env
COPY ./favicon.png ./favicon.png
COPY ./types ./types

# Set environment variables
ENV NODE_ENV=production
ENV PORT=1337

# Expose port
EXPOSE 1337

# Start command
CMD ["npm", "run", "start"]