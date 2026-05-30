#!/bin/bash

# GitHub Pages Deployment Script for SoftServe Website
# Usage: ./github-deploy.sh YOUR_GITHUB_USERNAME repository-name

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo ""
echo "=========================================="
echo "  GitHub Pages Deployment"
echo "=========================================="
echo ""

# Check if username provided
if [ -z "$1" ]; then
    echo -e "${YELLOW}⚠ Usage: ./github-deploy.sh YOUR_GITHUB_USERNAME repository-name${NC}"
    echo ""
    echo "Example: ./github-deploy.sh johndoe softserve-internships"
    echo ""
    exit 1
fi

GITHUB_USERNAME=$1
REPO_NAME=${2:-softserve-internships}
REPO_URL="https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"

echo -e "${BLUE}ℹ GitHub Username: $GITHUB_USERNAME${NC}"
echo -e "${BLUE}ℹ Repository Name: $REPO_NAME${NC}"
echo -e "${BLUE}ℹ Repository URL: $REPO_URL${NC}"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}⚠ Git not initialized. Initializing...${NC}"
    git init
    git add .
    git commit -m "Initial commit: SoftServe Technologies website"
    echo -e "${GREEN}✓ Git initialized and first commit created${NC}"
fi

# Check if remote already exists
if git remote | grep -q "origin"; then
    echo -e "${YELLOW}⚠ Remote 'origin' already exists${NC}"
    CURRENT_REMOTE=$(git remote get-url origin)
    echo -e "${BLUE}ℹ Current remote: $CURRENT_REMOTE${NC}"
    echo ""
    read -p "Do you want to update it to $REPO_URL? [y/N]: " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git remote set-url origin $REPO_URL
        echo -e "${GREEN}✓ Remote URL updated${NC}"
    fi
else
    # Add remote
    echo -e "${BLUE}ℹ Adding remote repository...${NC}"
    git remote add origin $REPO_URL
    echo -e "${GREEN}✓ Remote added: $REPO_URL${NC}"
fi

# Rename branch to main
echo -e "${BLUE}ℹ Ensuring branch is named 'main'...${NC}"
git branch -M main
echo -e "${GREEN}✓ Branch set to 'main'${NC}"

echo ""
echo "=========================================="
echo "  Ready to Push!"
echo "=========================================="
echo ""
echo -e "${YELLOW}⚠ IMPORTANT: Before pushing, make sure you:${NC}"
echo "  1. Created repository '$REPO_NAME' on GitHub"
echo "  2. Go to: https://github.com/new"
echo "  3. Repository name: $REPO_NAME"
echo "  4. Set to PUBLIC (required for free GitHub Pages)"
echo "  5. DO NOT initialize with README"
echo "  6. Click 'Create repository'"
echo ""
read -p "Have you created the repository on GitHub? [y/N]: " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}⚠ Please create the repository first, then run this script again.${NC}"
    echo ""
    echo "Quick link: https://github.com/new"
    echo ""
    exit 0
fi

# Push to GitHub
echo ""
echo -e "${BLUE}ℹ Pushing to GitHub...${NC}"
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "=========================================="
    echo -e "${GREEN}✓ Successfully pushed to GitHub!${NC}"
    echo "=========================================="
    echo ""
    echo "Next steps:"
    echo ""
    echo "1. Enable GitHub Pages:"
    echo "   → Go to: https://github.com/$GITHUB_USERNAME/$REPO_NAME/settings/pages"
    echo "   → Source: Deploy from branch 'main' / (root)"
    echo "   → Click Save"
    echo ""
    echo "2. Wait 2-5 minutes for deployment"
    echo ""
    echo "3. Your website will be live at:"
    echo "   → https://$GITHUB_USERNAME.github.io/$REPO_NAME/"
    echo ""
    echo "4. Visit your repository:"
    echo "   → https://github.com/$GITHUB_USERNAME/$REPO_NAME"
    echo ""
    echo -e "${GREEN}🎉 Deployment complete!${NC}"
    echo ""
else
    echo ""
    echo -e "${YELLOW}⚠ Push failed. Common issues:${NC}"
    echo ""
    echo "1. Repository doesn't exist on GitHub"
    echo "   → Create it at: https://github.com/new"
    echo ""
    echo "2. Wrong username or repository name"
    echo "   → Check: $REPO_URL"
    echo ""
    echo "3. Authentication required"
    echo "   → Enter your GitHub credentials when prompted"
    echo "   → Or set up SSH keys"
    echo ""
fi
