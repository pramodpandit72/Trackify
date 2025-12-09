# Trackify Setup Script for Windows
# This script sets up the development environment

Write-Host "🚀 Trackify Setup Script" -ForegroundColor Cyan
Write-Host "========================" -ForegroundColor Cyan

# Check Node.js
Write-Host "`n✓ Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "  Found Node.js $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "  ✗ Node.js not found. Please install Node.js from https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Setup Backend
Write-Host "`n📦 Setting up Backend..." -ForegroundColor Cyan
$backendPath = "$(Get-Location)\backend"
Set-Location $backendPath

Write-Host "  Installing dependencies..." -ForegroundColor Yellow
npm install

# Create .env file
Write-Host "  Creating .env file..." -ForegroundColor Yellow
$envContent = @"
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017
DB_NAME=trackify
CORS_ORIGIN=http://localhost:5173
"@

if (-not (Test-Path ".\.env")) {
    $envContent | Out-File -FilePath ".\.env" -Encoding UTF8
    Write-Host "  ✓ .env file created" -ForegroundColor Green
} else {
    Write-Host "  ✓ .env file already exists" -ForegroundColor Green
}

# Setup Frontend
Write-Host "`n🎨 Setting up Frontend..." -ForegroundColor Cyan
$frontendPath = "$(Get-Location)\..\frontend"
Set-Location $frontendPath

Write-Host "  Installing dependencies..." -ForegroundColor Yellow
npm install

# Create .env.local file
Write-Host "  Creating .env.local file..." -ForegroundColor Yellow
$envLocalContent = @"
VITE_API_URL=http://localhost:5000
"@

if (-not (Test-Path ".\.env.local")) {
    $envLocalContent | Out-File -FilePath ".\.env.local" -Encoding UTF8
    Write-Host "  ✓ .env.local file created" -ForegroundColor Green
} else {
    Write-Host "  ✓ .env.local file already exists" -ForegroundColor Green
}

# Summary
Write-Host "`n✅ Setup Complete!" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Start MongoDB (if using locally):"
Write-Host "   - Windows: mongod"
Write-Host "2. Start Backend (in new terminal):"
Write-Host "   - cd backend"
Write-Host "   - npm run dev"
Write-Host "3. Start Frontend (in new terminal):"
Write-Host "   - cd frontend"
Write-Host "   - npm run dev"
Write-Host "4. Open browser and visit: http://localhost:5173"
Write-Host ""
