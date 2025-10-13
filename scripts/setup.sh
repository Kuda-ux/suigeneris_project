#!/bin/bash

# Sui Generis Store - Development Setup Script
# This script sets up the development environment for the Sui Generis Store

set -e

echo "🚀 Setting up Sui Generis Store development environment..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm
fi

echo "📋 Copying environment files..."
# Copy environment files
if [ ! -f "apps/api/.env" ]; then
    cp apps/api/.env.example apps/api/.env
    echo "✅ Created apps/api/.env from example"
fi

if [ ! -f "apps/web/.env.local" ]; then
    cp apps/web/.env.example apps/web/.env.local
    echo "✅ Created apps/web/.env.local from example"
fi

echo "🐳 Starting Docker services..."
# Start Docker services
docker-compose -f docker-compose.dev.yml up -d

echo "⏳ Waiting for services to be ready..."
# Wait for services to be ready
sleep 30

echo "📦 Installing dependencies..."
# Install dependencies
pnpm install

echo "🗃️ Setting up database..."
# Generate Prisma client
cd apps/api
pnpm prisma generate

# Run database migrations
pnpm prisma migrate dev --name init

# Seed the database
pnpm prisma db seed

cd ../..

echo "🎉 Setup complete!"
echo ""
echo "🚀 To start the development servers:"
echo "   pnpm dev"
echo ""
echo "🌐 Application URLs:"
echo "   Frontend: http://localhost:3000"
echo "   API: http://localhost:3001"
echo "   API Docs: http://localhost:3001/api"
echo ""
echo "🛠️ Development Tools:"
echo "   Database Studio: pnpm db:studio"
echo "   MinIO Console: http://localhost:9001"
echo "   Meilisearch: http://localhost:7700"
echo ""
echo "📚 For more information, see README.md"
