#!/bin/bash

# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Create new project
railway init

# Add PostgreSQL database
railway add

# Set environment variables
railway variables set \
  DATABASE_CLIENT=postgres \
  NODE_ENV=production \
  JWT_SECRET=$(openssl rand -base64 32) \
  ADMIN_JWT_SECRET=$(openssl rand -base64 32)

# Deploy
railway up 