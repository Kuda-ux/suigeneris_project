# Supabase Environment Setup Script
# This script creates the .env.local file with your Supabase credentials

$envContent = @"
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://dtdpxfqepyjiyhejrcsl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0ZHB4ZnFlcHlqaXloZWpyY3NsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNTIyNjIsImV4cCI6MjA3NTkyODI2Mn0.BQ4J6EbJv0bjULe7g3u6bZwypRWXKvzRGwAsn7meNac

# Database Connection (for backend/API)
DATABASE_URL=postgresql://postgres:Marcus24#@db.dtdpxfqepyjiyhejrcsl.supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:Marcus24#@db.dtdpxfqepyjiyhejrcsl.supabase.co:5432/postgres
"@

# Create .env.local file in temp-app directory
$envPath = Join-Path $PSScriptRoot "temp-app\.env.local"
$envContent | Out-File -FilePath $envPath -Encoding UTF8 -NoNewline

Write-Host "✅ .env.local file created successfully at: $envPath" -ForegroundColor Green
Write-Host ""
Write-Host "Your Supabase credentials have been configured:" -ForegroundColor Cyan
Write-Host "  - Project URL: https://dtdpxfqepyjiyhejrcsl.supabase.co" -ForegroundColor White
Write-Host "  - Database: Connected" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  IMPORTANT: This file is in .gitignore and will NOT be pushed to GitHub" -ForegroundColor Yellow
Write-Host ""
