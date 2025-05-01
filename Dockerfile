# Absolute minimal Dockerfile for pre-built Strapi
FROM node:18-alpine-slim
WORKDIR /app

# Copy only the pre-built application
COPY ./dist ./dist
COPY ./config ./config
COPY ./public ./public
COPY ./src ./src
COPY ./database ./database
COPY ./.env ./.env
COPY ./favicon.png ./favicon.png
COPY ./types ./types
COPY ./package.json ./package.json
COPY ./node_modules ./node_modules

# Set environment variables
ENV NODE_ENV=production
ENV PORT=1337

# Expose port
EXPOSE 1337

# Start command
CMD ["npm", "run", "start"]