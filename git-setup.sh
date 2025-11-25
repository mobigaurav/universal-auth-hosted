#!/bin/bash

echo "🚀 Setting up Git repository for Universal Auth Hosted Service..."

# Initialize git if not already done
git init

# Add remote origin
git remote add origin https://github.com/mobigaurav/universal-auth-hosted.git

# Add all files
git add .

# Commit
git commit -m "Initial commit: Universal Auth Hosted Service

Features:
- Standalone hosted authentication service
- Complete auth flow: register, login, verify email, reset password
- User personas (Buyer/Seller) support
- URL parameter configuration
- Mobile deep linking support
- Custom theming support
- Uses published npm packages (@universal-auth/core@1.0.5, @universal-auth/react@1.0.5)
- Ready for Vercel deployment"

# Push to GitHub
git branch -M main
git push -u origin main

echo "✅ Code pushed to GitHub successfully!"
echo "🔗 Repository: https://github.com/mobigaurav/universal-auth-hosted"
echo "🚀 Ready to deploy to Vercel!"