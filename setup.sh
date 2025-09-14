#!/bin/bash

# Rural Healthcare MVP - Quick Setup Script

echo "🏥 Rural Healthcare MVP Setup"
echo "=============================="

# Check Node.js installation
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16+ first."
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install

# Copy environment file
if [ ! -f .env ]; then
    cp .env.example .env
    echo "📝 Created .env file - Please update with your configuration"
fi

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install

# Initialize database
echo "🗄️ Initializing database..."
cd ../backend
mkdir -p ../database

# Build frontend
echo "🏗️ Building frontend..."
cd ../frontend
npm run build

echo ""
echo "✨ Setup Complete!"
echo ""
echo "To start the application:"
echo "  Backend:  cd backend && npm run dev"
echo "  Frontend: cd frontend && npm start"
echo ""
echo "For production deployment:"
echo "  docker-compose up -d"
echo ""
echo "Live Demo Available at:"
echo "  https://gautamkapil9080.github.io/NEW-SIHMVP/"