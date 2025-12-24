#!/bin/bash

# Midscene Skills Demo Script
# This script demonstrates how to use CLI commands for browser automation

echo "=========================================="
echo "  Midscene Skills Demo"
echo "=========================================="
echo ""

cd /Users/bytedance/personal/midscene-skills

echo "🚀 Step 1: Open Website"
echo "Command: tsx src/cli.ts navigate \"https://example.com\""
echo ""
tsx src/cli.ts navigate "https://example.com"
echo ""
echo "✅ Navigated to website with automatic screenshot"
echo ""

sleep 2

echo "🔍 Step 2: Query Page Information"
echo "Command: tsx src/cli.ts query \"What is the page title?\""
echo ""
tsx src/cli.ts query "What is the page title?"
echo ""

sleep 2

echo "✅ Step 3: Verify Page Content"
echo "Command: tsx src/cli.ts assert \"The page contains 'Example Domain' text\""
echo ""
tsx src/cli.ts assert "The page contains 'Example Domain' text"
echo ""

sleep 2

echo "📸 Step 4: Take Another Screenshot"
echo "Command: tsx src/cli.ts screenshot"
echo ""
tsx src/cli.ts screenshot
echo ""

echo "🧹 Step 5: Close Browser"
echo "Command: tsx src/cli.ts close"
echo ""
tsx src/cli.ts close
echo ""

echo "=========================================="
echo "  Demo Completed!"
echo "=========================================="
echo ""
echo "📁 Screenshots saved in: agent/browser_screenshots/"
echo ""
echo "💡 Try interactive mode:"
echo "   pnpm claude"
echo ""
echo "💡 Or give it a task:"
echo "   pnpm claude \"Open Google and search for midscene\""
echo ""
