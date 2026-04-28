@echo off
REM DNS Management System - Quick Start Script for Windows

echo 🚀 DNS Management System - Quick Start
echo ========================================
echo.

REM Check if Node is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js v14 or higher.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js detected: %NODE_VERSION%
echo.

REM Backend Setup
echo 📦 Setting up Backend...
cd back-end

if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
)

if not exist ".env" (
    echo Creating .env file from .env.example...
    copy .env.example .env
    echo ⚠️  Please update back-end\.env with your MongoDB URI
)

cd ..

REM Frontend Setup
echo.
echo 📦 Setting up Frontend...
cd front-end

if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
)

if not exist ".env" (
    echo Creating .env file from .env.example...
    copy .env.example .env
)

cd ..

echo.
echo ✅ Setup Complete!
echo.
echo 🎯 Next Steps:
echo.
echo 1️⃣  Start Backend (in Terminal 1):
echo    cd back-end
echo    npm run dev
echo.
echo 2️⃣  Start Frontend (in Terminal 2):
echo    cd front-end
echo    npm start
echo.
echo 3️⃣  Open your browser:
echo    http://localhost:3000
echo.
echo 📚 See README.md for detailed instructions
echo.
pause
