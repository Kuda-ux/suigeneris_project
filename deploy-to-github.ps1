# Sui Generis Store - GitHub Deployment Script
# Run this script to push your code to GitHub

Write-Host "🚀 Sui Generis Store - GitHub Deployment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
}

# Add all files
Write-Host "Adding files to Git..." -ForegroundColor Yellow
git add .

# Commit
$commitMessage = Read-Host "Enter commit message (or press Enter for default)"
if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $commitMessage = "Deploy Sui Generis Store"
}

Write-Host "Committing changes..." -ForegroundColor Yellow
git commit -m "$commitMessage"

# Add remote if not exists
$remoteExists = git remote | Select-String -Pattern "origin"
if (-not $remoteExists) {
    Write-Host "Adding GitHub remote..." -ForegroundColor Yellow
    git remote add origin https://github.com/Kuda-ux/suigeneris_project.git
}

# Push to GitHub
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
git branch -M main
git push -u origin main

Write-Host ""
Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Go to https://github.com/Kuda-ux/suigeneris_project" -ForegroundColor White
Write-Host "2. Go to Settings → Secrets and variables → Actions" -ForegroundColor White
Write-Host "3. Add your Supabase credentials as secrets" -ForegroundColor White
Write-Host "4. Go to Settings → Pages and enable GitHub Pages" -ForegroundColor White
Write-Host "5. Go to Actions tab to see deployment progress" -ForegroundColor White
Write-Host ""
Write-Host "📖 For detailed instructions, see DEPLOYMENT_GUIDE.md" -ForegroundColor Cyan
