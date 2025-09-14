# Rural Healthcare MVP - Windows Setup Script

Write-Host "🏥 Rural Healthcare MVP Setup" -ForegroundColor Green
Write-Host "==============================" -ForegroundColor Green

# Check Node.js installation
try {
    $nodeVersion = node -v
    Write-Host "✅ Node.js $nodeVersion detected" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js v16+ first." -ForegroundColor Red
    exit 1
}

# Install backend dependencies
Write-Host "📦 Installing backend dependencies..." -ForegroundColor Yellow
Set-Location backend
npm install

# Copy environment file
if (!(Test-Path .env)) {
    Copy-Item .env.example .env
    Write-Host "📝 Created .env file - Please update with your configuration" -ForegroundColor Yellow
}

# Install frontend dependencies
Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location ../frontend
npm install

# Initialize database
Write-Host "🗄️ Initializing database..." -ForegroundColor Yellow
Set-Location ../backend
New-Item -ItemType Directory -Path ../database -Force | Out-Null

# Build frontend
Write-Host "🏗️ Building frontend..." -ForegroundColor Yellow
Set-Location ../frontend
npm run build

Write-Host ""
Write-Host "✨ Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "To start the application:" -ForegroundColor Cyan
Write-Host "  Backend:  cd backend; npm run dev" -ForegroundColor White
Write-Host "  Frontend: cd frontend; npm start" -ForegroundColor White
Write-Host ""
Write-Host "For production deployment:" -ForegroundColor Cyan
Write-Host "  docker-compose up -d" -ForegroundColor White
Write-Host ""
Write-Host "Live Demo Available at:" -ForegroundColor Cyan
Write-Host "  https://gautamkapil9080.github.io/NEW-SIHMVP/" -ForegroundColor White

Set-Location ..