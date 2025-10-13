# Sui Generis Store - Development Setup Script (PowerShell)
# This script sets up the development environment for the Sui Generis Store

$ErrorActionPreference = "Stop"

Write-Host "🚀 Setting up Sui Generis Store development environment..." -ForegroundColor Green

# Check if Docker is installed
if (!(Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Docker is not installed. Please install Docker Desktop first." -ForegroundColor Red
    exit 1
}

# Check if Node.js is installed
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js is not installed. Please install Node.js 18+ first." -ForegroundColor Red
    exit 1
}

# Check if pnpm is installed
if (!(Get-Command pnpm -ErrorAction SilentlyContinue)) {
    Write-Host "📦 Installing pnpm..." -ForegroundColor Yellow
    npm install -g pnpm
}

Write-Host "📋 Copying environment files..." -ForegroundColor Blue

# Copy environment files
if (!(Test-Path "apps/api/.env")) {
    Copy-Item "apps/api/.env.example" "apps/api/.env"
    Write-Host "✅ Created apps/api/.env from example" -ForegroundColor Green
}

if (!(Test-Path "apps/web/.env.local")) {
    Copy-Item "apps/web/.env.example" "apps/web/.env.local"
    Write-Host "✅ Created apps/web/.env.local from example" -ForegroundColor Green
}

Write-Host "🐳 Starting Docker services..." -ForegroundColor Blue
# Start Docker services
docker-compose -f docker-compose.dev.yml up -d

Write-Host "⏳ Waiting for services to be ready..." -ForegroundColor Yellow
# Wait for services to be ready
Start-Sleep -Seconds 30

Write-Host "📦 Installing dependencies..." -ForegroundColor Blue
# Install dependencies
pnpm install

Write-Host "🗃️ Setting up database..." -ForegroundColor Blue
# Generate Prisma client
Set-Location "apps/api"
pnpm prisma generate

# Run database migrations
pnpm prisma migrate dev --name init

# Seed the database
pnpm prisma db seed

Set-Location "../.."

Write-Host "🎉 Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 To start the development servers:" -ForegroundColor Cyan
Write-Host "   pnpm dev" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Application URLs:" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "   API: http://localhost:3001" -ForegroundColor White
Write-Host "   API Docs: http://localhost:3001/api" -ForegroundColor White
Write-Host ""
Write-Host "🛠️ Development Tools:" -ForegroundColor Cyan
Write-Host "   Database Studio: pnpm db:studio" -ForegroundColor White
Write-Host "   MinIO Console: http://localhost:9001" -ForegroundColor White
Write-Host "   Meilisearch: http://localhost:7700" -ForegroundColor White
Write-Host ""
Write-Host "📚 For more information, see README.md" -ForegroundColor Cyan
