@echo off
REM DNS Management System - Deployment Script for SNRBG
REM This script is personalized for GitHub user: SNRBG

echo 🚀 DNS Management System - GitHub Push for SNRBG
echo ================================================
echo.
echo Your GitHub Username: SNRBG
echo Your Repository: https://github.com/SNRBG/dns-management-system
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git is not installed. Please install Git first.
    echo Download from: https://git-scm.com
    pause
    exit /b 1
)

REM Navigate to project
cd /d "%~dp0"

REM Check if .git exists
if not exist ".git" (
    echo 📝 Initializing git repository...
    call git init
    echo ✅ Git repository initialized
    echo.
)

REM Check if remote exists
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo ⚠️  Adding GitHub remote...
    call git remote add origin https://github.com/SNRBG/dns-management-system.git
    echo ✅ Remote added: https://github.com/SNRBG/dns-management-system.git
) else (
    echo ✅ Remote already configured
    for /f "tokens=*" %%i in ('git remote get-url origin') do set CURRENT_REMOTE=%%i
    echo    URL: !CURRENT_REMOTE!
)

echo.
echo 📦 Adding files...
call git add .
echo ✅ Files added

echo.
echo 📝 Creating commit...
call git commit -m "Initial commit: DNS Management System - Full Stack App"
echo ✅ Commit created

echo.
echo 📌 Checking branch...
for /f "tokens=*" %%i in ('git rev-parse --abbrev-ref HEAD') do set BRANCH=%%i
echo    Current branch: !BRANCH!

if "!BRANCH!"=="master" (
    echo.
    echo Renaming branch from 'master' to 'main'...
    call git branch -M main
    echo ✅ Branch renamed
)

echo.
echo 🚀 Pushing to GitHub...
echo    Repository: https://github.com/SNRBG/dns-management-system
echo.

call git push -u origin main

echo.
echo ✅ Push complete!
echo.
echo 🎉 Your project is now on GitHub!
echo.
echo 📊 Next Steps:
echo    1. Visit: https://github.com/SNRBG/dns-management-system
echo    2. Verify all files are uploaded
echo    3. Deploy on Vercel (see DEPLOYMENT_FOR_SNRBG.md)
echo.
echo 📚 Documentation:
echo    - DEPLOYMENT_FOR_SNRBG.md (Personalized guide)
echo    - QUICK_DEPLOY.md (Quick reference)
echo    - DEPLOYMENT_GUIDE.md (Detailed guide)
echo.
pause
