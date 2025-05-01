# Extremely lightweight build for Railway
FROM node:18-alpine
WORKDIR /app

# Install essential build tools
RUN apk add --no-cache python3 make g++ git

# Copy only package files first
COPY package.json ./

# Install dependencies with specific versions
RUN npm install --no-audit --no-fund --legacy-peer-deps && \
    npm install @babel/plugin-proposal-class-properties@7.18.6 \
                @babel/plugin-proposal-private-methods@7.18.6 \
                @babel/plugin-proposal-private-property-in-object@7.21.0 \
                --save-dev --no-audit --no-fund

# Copy application code
COPY . .

# Set environment variables
ENV NODE_ENV=production
ENV PORT=1337

# Expose port
EXPOSE 1337

# Start command
CMD ["npm", "run", "start"]