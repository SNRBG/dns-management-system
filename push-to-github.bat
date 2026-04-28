@echo off
REM GitHub Push Script - Windows

echo 🚀 Pushing DNS Management System to GitHub
echo ==========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git is not installed. Please install Git first.
    pause
    exit /b 1
)

REM Initialize git if not already
if not exist ".git" (
    echo 📝 Initializing git repository...
    call git init
    echo.
)

REM Check if remote exists
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo ⚠️  No remote 'origin' found.
    echo.
    set /p REPO_URL="Enter your GitHub repository URL: "
    call git remote add origin %REPO_URL%
    echo ✅ Remote added: %REPO_URL%
) else (
    echo ✅ Remote 'origin' already exists
    for /f "tokens=*" %%i in ('git remote get-url origin') do set REMOTE_URL=%%i
    echo Remote URL: %REMOTE_URL%
)

echo.
echo 📦 Adding files...
call git add .
echo ✅ Files added

echo.
echo 📝 Committing changes...
call git commit -m "Initial commit: Complete DNS Management System"
echo ✅ Committed

echo.
echo 📌 Checking branch...
for /f "tokens=*" %%i in ('git rev-parse --abbrev-ref HEAD') do set BRANCH=%%i
echo Current branch: %BRANCH%

if "%BRANCH%"=="master" (
    echo.
    echo Renaming branch from 'master' to 'main'...
    call git branch -M main
    echo ✅ Branch renamed to 'main'
)

echo.
echo 🚀 Pushing to GitHub...
call git push -u origin main

echo.
echo ✅ Push complete!
echo.
echo 🎉 Your project is now on GitHub!
echo Visit: https://github.com/YOUR-USERNAME/dns-management-system
echo.
pause
