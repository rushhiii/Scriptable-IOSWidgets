#!/bin/bash

# Script to ensure all VitePress files are properly committed

echo "🔍 Checking VitePress file status..."

# Check if all widget docs are tracked
echo "📱 Widget documentation files:"
git ls-files docs/widgets/*.md | wc -l
echo "Total widget files found: $(find docs/widgets -name "*.md" | wc -l)"

# Check if config is tracked
echo "⚙️ VitePress configuration:"
git ls-files docs/.vitepress/config.js

# Check package files
echo "📦 Package files:"
git ls-files package.json package-lock.json

# Check workflow
echo "🔄 GitHub Actions workflow:"
git ls-files .github/workflows/deploy.yml

# Show any untracked files
echo "❓ Untracked files:"
git ls-files --others --exclude-standard

echo "✅ All files check complete!"
