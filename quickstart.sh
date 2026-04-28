#!/bin/bash
# DNS Management System - Quick Start Script for Linux/Mac

echo "🚀 DNS Management System - Quick Start"
echo "========================================"
echo ""

# Check if Node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v14 or higher."
    exit 1
fi

echo "✅ Node.js detected: $(node --version)"
echo ""

# Backend Setup
echo "📦 Setting up Backend..."
cd back-end

if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please update back-end/.env with your MongoDB URI"
fi

cd ..

# Frontend Setup
echo ""
echo "📦 Setting up Frontend..."
cd front-end

if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
fi

cd ..

echo ""
echo "✅ Setup Complete!"
echo ""
echo "🎯 Next Steps:"
echo ""
echo "1️⃣  Start Backend (in Terminal 1):"
echo "   cd back-end"
echo "   npm run dev"
echo ""
echo "2️⃣  Start Frontend (in Terminal 2):"
echo "   cd front-end"
echo "   npm start"
echo ""
echo "3️⃣  Open your browser:"
echo "   http://localhost:3000"
echo ""
echo "📚 See README.md for detailed instructions"
