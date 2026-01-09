# Midscene Skills User Guide

## 🚀 Quick Start

### Prerequisites

Before getting started, please configure the required environment variables for Midscene. For detailed configuration instructions, refer to:
[Midscene Model Configuration Guide](https://midscenejs.com/model-config.html)

Create a `.env` file in the project root and configure the appropriate API keys and model name.

### Method 1: Use Interactive Agent (Recommended)

This is the simplest way to use the tool. You can have a conversation with the AI assistant and let it automate browser operations for you:

```bash
cd /Users/bytedance/personal/midscene-skills

# Start interactive session
pnpm claude

# Or directly give it a task
pnpm claude "Open Google, search for midscene, tell me the first result"
```

#### Example Conversation:
```
You: Open https://example.com
AI: Sure, I'll navigate to that website...
[Automatically executes: node dist/src/cli.js navigate "https://example.com"]

You: What is the page title?
AI: Let me query that...
[Automatically executes: node dist/src/cli.js query "What is the page title?"]

You: Close the browser
AI: Okay, closing the browser
[Automatically executes: node dist/src/cli.js close]
```

### Method 2: Use CLI Commands Directly

If you want to control each step directly, you can use CLI commands:

#### 1. Navigate to a Web Page
```bash
node dist/src/cli.js navigate "https://www.google.com"
```

Example output:
```json
{
  "success": true,
  "message": "Successfully navigated to https://www.google.com",
  "screenshot": "/Users/bytedance/personal/midscene-skills/agent/browser_screenshots/screenshot-2025-12-22T11-00-00-000Z.png"
}
```

#### 2. Perform Actions (Click, Input, etc.)
```bash
# Click the search box
node dist/src/cli.js act "click the search box"

# Input text
node dist/src/cli.js act "type 'midscene' in the search box"

# Click the search button
node dist/src/cli.js act "click the search button"
```

#### 3. Query Page Information
```bash
# Query page title
node dist/src/cli.js query "What is the page title?"

# Get search results
node dist/src/cli.js query "List the titles of the first 5 search results"

# Extract structured data
node dist/src/cli.js query "Extract all product names and prices in JSON format"
```

#### 4. Assert (Verify)
```bash
# Verify if an element exists
node dist/src/cli.js assert "The search button is visible"

# Verify content
node dist/src/cli.js assert "The page contains 'midscene' text"

# Verify count
node dist/src/cli.js assert "There are 10 search results"
```

#### 5. Screenshot
```bash
node dist/src/cli.js screenshot
```

#### 6. Close Browser
```bash
node dist/src/cli.js close
```

## 📝 Complete Examples

### Example 1: Google Search
```bash
# Open Google
node dist/src/cli.js navigate "https://www.google.com"

# Type in search box
node dist/src/cli.js act "type 'GitHub Midscene' in the search box"

# Click search button
node dist/src/cli.js act "click the Google Search button"

# Wait 2 seconds for page to load
sleep 2

# Query first search result
node dist/src/cli.js query "What is the title of the first search result?"

# Take screenshot
node dist/src/cli.js screenshot

# Close browser
node dist/src/cli.js close
```

### Example 2: News Website Scraping
```bash
# Open Hacker News
node dist/src/cli.js navigate "https://news.ycombinator.com"

# Get top news
node dist/src/cli.js query "List the titles and links of the first 10 news items in JSON format"

# Click first news item
node dist/src/cli.js act "click the first news item"

# Save screenshot
node dist/src/cli.js screenshot

# Close
node dist/src/cli.js close
```

### Example 3: Shell Script Automation
Create `demo.sh`:
```bash
#!/bin/bash

echo "=== Starting automation task ==="

# Navigate to target website
echo "1. Opening website..."
node dist/src/cli.js navigate "https://example.com"

# Perform action
echo "2. Clicking..."
node dist/src/cli.js act "click the login button"

# Query result
echo "3. Querying page information..."
RESULT=$(node dist/src/cli.js query "What is the current page title?")
echo "Page title: $RESULT"

# Screenshot
echo "4. Taking screenshot..."
node dist/src/cli.js screenshot

# Cleanup
echo "5. Closing browser..."
node dist/src/cli.js close

echo "=== Task completed ==="
```

Run it:
```bash
chmod +x demo.sh
./demo.sh
```

## 🎯 Practical Tips

### 1. Natural Language Descriptions
The power of Midscene lies in understanding natural language, so you can describe actions like this:

**Good descriptions:**
```bash
node dist/src/cli.js act "click the blue login button in the top right corner"
node dist/src/cli.js act "type 'admin' in the username input field"
node dist/src/cli.js act "select 'United States' from the country dropdown"
```

**Short descriptions also work:**
```bash
node dist/src/cli.js act "click login"
node dist/src/cli.js act "enter email"
```

### 2. Query Returns Structured Data
```bash
# Return JSON
node dist/src/cli.js query "Extract all product information including name, price, and stock, return as JSON array"

# Return list
node dist/src/cli.js query "List all link texts on the page"

# Return simple value
node dist/src/cli.js query "What is the price of this product?"
```

### 3. Browser Session Persistence
The browser stays open between commands, so you can:
```bash
node dist/src/cli.js navigate "https://example.com"
# Browser stays open
node dist/src/cli.js act "click menu"
# Browser is still open
node dist/src/cli.js query "What content is displayed?"
# Only closes when explicitly commanded
node dist/src/cli.js close
```

### 4. Combine with jq for JSON Processing
```bash
# Get JSON data
RESULT=$(node dist/src/cli.js query "Extract product list as JSON")

# Process with jq
echo $RESULT | jq -r '.result'
```

## 🔍 View Results

### Screenshot Location
All screenshots are saved in:
```
agent/browser_screenshots/screenshot-2025-12-22T11-30-00-000Z.png
```

### Downloaded Files
If the page has downloads, files will be saved to:
```
agent/downloads/
```

### Chrome Configuration
Browser profile:
```
.chrome-profile/
```

## ⚡ Advanced Usage

### Combine with Other Tools

**Combine with curl and APIs:**
```bash
# First get data with midscene
DATA=$(node dist/src/cli.js query "Get product ID")

# Then call API
curl -X POST https://api.example.com/products -d "$DATA"
```

**Scheduled Tasks:**
```bash
# Add to crontab
0 */6 * * * cd /Users/bytedance/personal/midscene-skills && node dist/src/cli.js navigate "https://example.com" && node dist/src/cli.js query "Check for new content" && node dist/src/cli.js close
```

## 🐛 Common Issues

### Q: Browser doesn't close automatically?
A: Run `node dist/src/cli.js close` or restart the terminal

### Q: Element not found?
A: Try a more detailed description, like "click the blue button in the top right corner"

### Q: Commands are slow?
A: The first execution is slower (AI model loading), subsequent runs are much faster. Keeping the browser open also speeds things up

### Q: How to debug?
A: Check screenshot files, or use `node dist/src/cli.js screenshot` to take screenshots anytime

## 📚 More Examples

Want to see more examples? Try interactive mode:
```bash
pnpm claude
```

Then try these tasks:
- "Open GitHub, search for midscene, tell me the star count"
- "Open IMDb Top 250 movies, get information about the first 10 movies"
- "Open Amazon, search for a product, tell me the price range"

Enjoy the automation! 🎉
