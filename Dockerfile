# Build stage
FROM node:18.19.0-bullseye
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with specific flags to avoid SWC
RUN npm install --legacy-peer-deps --no-optional --ignore-scripts

# Copy source code
COPY . .

# Remove SWC and install Babel
RUN npm uninstall @swc/core && \
    npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/preset-react @babel/preset-typescript

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose the port
EXPOSE 1337

# Start the application
CMD ["npm", "run", "start"] 