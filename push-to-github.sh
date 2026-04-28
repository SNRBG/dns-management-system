#!/bin/bash
# GitHub Push Script - Linux/Mac

echo "🚀 Pushing DNS Management System to GitHub"
echo "=========================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Initialize git if not already
if [ ! -d ".git" ]; then
    echo "📝 Initializing git repository..."
    git init
    echo ""
fi

# Check if remote exists
if git remote get-url origin &> /dev/null; then
    echo "✅ Remote 'origin' already exists"
    echo "Remote URL: $(git remote get-url origin)"
else
    echo "⚠️  No remote 'origin' found."
    echo ""
    read -p "Enter your GitHub repository URL: " REPO_URL
    git remote add origin $REPO_URL
    echo "✅ Remote added: $REPO_URL"
fi

echo ""
echo "📦 Adding files..."
git add .

echo "✅ Files added"
echo ""

# Check if there are changes
if git diff --cached --quiet; then
    echo "⚠️  No changes to commit"
else
    echo "📝 Committing changes..."
    git commit -m "Initial commit: Complete DNS Management System"
    echo "✅ Committed"
    echo ""
fi

# Check current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "📌 Current branch: $CURRENT_BRANCH"
echo ""

# Rename to main if on master
if [ "$CURRENT_BRANCH" = "master" ]; then
    echo "Renaming branch from 'master' to 'main'..."
    git branch -M main
    echo "✅ Branch renamed to 'main'"
    echo ""
fi

echo "🚀 Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Push complete!"
echo ""
echo "🎉 Your project is now on GitHub!"
echo "Visit: https://github.com/YOUR-USERNAME/dns-management-system"
