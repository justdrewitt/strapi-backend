# Build stage
FROM node:18.19.0-bullseye
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with specific flags
RUN npm install --legacy-peer-deps --no-optional

# Copy source code
COPY . .

# Force SWC to use JavaScript implementation
RUN npm install --save-dev @swc/core@latest && \
    npm config set @swc:registry https://registry.npmjs.org && \
    npm config set @swc:always-auth false

# Create a script to force SWC to use JavaScript
RUN echo "#!/bin/sh\nexport SWC_JIT=0\nexec \"$@\"" > /usr/local/bin/swc-force-js && \
    chmod +x /usr/local/bin/swc-force-js && \
    echo 'export PATH="/usr/local/bin:$PATH"' > /root/.bashrc

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose the port
EXPOSE 1337

# Start the application
CMD ["npm", "run", "start"] 