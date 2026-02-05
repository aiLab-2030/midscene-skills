---
name: Midscene Browser Automation
description: Automate web browser interactions and frontend verification using natural language via Midscene CLI. Use when the user asks to browse websites, navigate web pages, extract data from websites, take screenshots, fill forms, click buttons, interact with web applications, or verify/check/validate frontend pages. Triggers include "browse", "navigate to", "go to website", "extract data from webpage", "screenshot", "web scraping", "fill out form", "click on", "search for on the web", "verify", "check", "validate", "test my page", "verify frontend", "check if page works", "validate UI", "验证", "检查", "测试一下". Midscene uses AI-powered visual and semantic understanding for intelligent element identification without selectors.
allowed-tools: Bash
---

# Midscene Browser Automation

Automate browser interactions using Midscene with Claude. This skill provides natural language control over a Chrome browser through command-line tools for navigation, interaction, data extraction, and screenshots.

## Overview

This skill uses a CLI-based approach where Claude calls browser automation commands via bash. The browser stays open between commands for faster sequential operations and preserves browser state (cookies, sessions, etc.).

**Key Features**:
- 🧠 **Natural language understanding** of page elements
- 🎯 **Intelligent element identification** without CSS selectors
- 👁️ **Visual and semantic understanding** of web pages
- 🤖 **AI-powered** interactions and data extraction

## Setup Verification

**IMPORTANT: Before using any browser commands, you MUST check setup.json in this directory.**

### First-Time Setup Check

1. **Read `setup.json`** (located in `skills/midscene-automation/setup.json`)
2. **Check `setupComplete` field**:
   - If `true`: All prerequisites are met, proceed with browser commands
   - If `false`: Setup required - follow the steps below

### If Setup is Required (`setupComplete: false`)

1. **Set API key** (required):
   ```bash
   export MIDSCENE_MODEL_API_KEY="your-api-key"
   ```

2. **Set model** (optional):
   ```bash
   export MIDSCENE_MODEL_NAME="gpt-4o"
   export MIDSCENE_MODEL_BASE_URL="https://api.openai.com/v1"
   ```

3. **Ensure Google Chrome is installed** on your system.

See [Model Configuration](https://midscenejs.com/zh/model-common-config.html) for more options.

### Prerequisites Summary

- ✅ Google Chrome installed on your system
- ✅ AI Model API key configured via environment variable or `.env` file

**DO NOT attempt to use browser commands if `setupComplete: false` in setup.json. Guide the user through setup first.**

## Available Commands

### Navigate to URLs
```bash
node dist/src/cli.js navigate <url>
```

**When to use**: Opening any website, loading a specific URL, going to a web page.

**Example usage**:
- `node dist/src/cli.js navigate https://example.com`
- `node dist/src/cli.js navigate https://news.ycombinator.com`

**Output**: JSON with success status, message, and screenshot path

### Interact with Pages
```bash
node dist/src/cli.js act "<action>"
```

**When to use**: Clicking buttons, filling forms, scrolling, selecting options, typing text.

**Example usage**:
- `node dist/src/cli.js act "click the Sign In button"`
- `node dist/src/cli.js act "type 'test@example.com' into the email field"`
- `node dist/src/cli.js act "scroll down to the footer"`
- `node dist/src/cli.js act "select 'United States' from the country dropdown"`

**Important**: 
- Be as specific as possible - details make a world of difference
- Midscene uses AI to understand page structure and locate elements semantically
- No CSS selectors needed - just describe what you want to interact with

**Output**: JSON with success status, message, and screenshot path

### Extract Data
```bash
node dist/src/cli.js query "<query>"
```

**When to use**: Scraping data, getting specific information, extracting structured content from the page.

**Example usage**:
- `node dist/src/cli.js query "What is the page title?"`
- `node dist/src/cli.js query "List all product names and prices"`
- `node dist/src/cli.js query "Extract all article headlines in JSON format"`
- `node dist/src/cli.js query "What is the price of the first item?"`

**Output**: JSON with success status, extracted data (result field), and screenshot path

### Verify Conditions
```bash
node dist/src/cli.js assert "<condition>"
```

**When to use**: Verifying page state, checking if elements exist, validating content.

**Example usage**:
- `node dist/src/cli.js assert "the login button is visible"`
- `node dist/src/cli.js assert "the user is logged in"`
- `node dist/src/cli.js assert "there are more than 5 items in the list"`
- `node dist/src/cli.js assert "the page contains 'Welcome' text"`

**Output**: JSON with success status (true if assertion passes) and message

### Take Screenshots
```bash
node dist/src/cli.js screenshot
```

**When to use**: Visual verification, documenting page state, debugging, creating records.

**Notes**:
- Screenshots are saved to the plugin directory's `agent/browser_screenshots/` folder
- Filename includes timestamp for uniqueness
- Full page screenshots by default

**Output**: JSON with success status and screenshot path

### Clean Up
```bash
node dist/src/cli.js close
```

**When to use**: After completing all browser interactions, to free up resources.

**Output**: JSON with success status and message

## Browser Behavior

**Persistent Browser**: The browser stays open between commands for faster sequential operations and to preserve browser state (cookies, sessions, etc.).

**Reuse Existing**: If Chrome is already running on port 9222, it will reuse that instance.

**Safe Cleanup**: The browser only closes when you explicitly call the `close` command.

**AI-Powered**: Midscene uses AI vision models to understand page structure and content, enabling intelligent interactions without brittle selectors.

## Best Practices

1. **Always navigate first**: Before interacting with a page, navigate to the URL
2. **📸 Always view screenshots**: After each command (navigate, act, query, assert), use the Read tool to view the screenshot and verify the command worked correctly
3. **Use natural language**: Describe actions and queries as you would instruct a human
4. **Be specific**: More context helps Midscene understand what you want ("the blue Submit button in the login form" vs "the button")
5. **Handle errors gracefully**: Check the `success` field in JSON output; if false, read the error message and screenshot
6. **Close when done**: Always clean up browser resources after completing tasks
7. **Chain commands**: Run multiple commands sequentially without reopening the browser
8. **Use query for extraction**: `query` command is optimized for data extraction and understanding page content
9. **Use assert for verification**: `assert` command is perfect for validation and testing scenarios

## Common Patterns

### Simple browsing task
```bash
node dist/src/cli.js navigate https://example.com
node dist/src/cli.js act "click the login button"
node dist/src/cli.js screenshot
node dist/src/cli.js close
```

### Data extraction task
```bash
node dist/src/cli.js navigate https://example.com/products
node dist/src/cli.js query "Extract all product names and prices in JSON format"
node dist/src/cli.js close
```

### Multi-step interaction
```bash
node dist/src/cli.js navigate https://example.com/login
node dist/src/cli.js act "type 'user@example.com' into the email field"
node dist/src/cli.js act "type 'mypassword' into the password field"
node dist/src/cli.js act "click the submit button"
node dist/src/cli.js assert "the user is logged in"
node dist/src/cli.js screenshot
node dist/src/cli.js close
```

### Search and extract workflow
```bash
node dist/src/cli.js navigate https://www.google.com
node dist/src/cli.js act "type 'Midscene AI' into the search box"
node dist/src/cli.js act "press Enter"
node dist/src/cli.js query "What are the titles of the first 3 search results?"
node dist/src/cli.js close
```

### Validation workflow
```bash
node dist/src/cli.js navigate https://example.com
node dist/src/cli.js assert "the page title contains 'Example'"
node dist/src/cli.js assert "there is a login button visible"
node dist/src/cli.js assert "the navigation menu has 5 items"
node dist/src/cli.js close
```

## Frontend Verification

This skill is optimized for frontend verification. When the user asks to verify, check, or validate a page, follow this workflow.

### Verification Workflow

1. **Navigate** to the target URL
2. **Identify verification points** based on the user's request
3. **Execute each check** using `assert` or `query` commands
4. **Take screenshots** as evidence for each step
5. **Summarize results** in a structured format

### Result Summary Format

After completing verification, always present results in this format:

```
## Verification Results

| # | Check | Status | Details |
|---|-------|--------|---------|
| 1 | Page title is correct | PASS | - |
| 2 | Login form is visible | PASS | - |
| 3 | Error message on invalid input | FAIL | No error shown |

**Result**: 2/3 passed
```

### Common Verification Scenarios

#### Form Validation
```bash
node dist/src/cli.js navigate http://localhost:3000/login
node dist/src/cli.js act "click the submit button without filling any fields"
node dist/src/cli.js assert "error messages are shown for required fields"
node dist/src/cli.js act "type 'invalid-email' into the email field"
node dist/src/cli.js act "click submit"
node dist/src/cli.js assert "email format validation error is displayed"
```

#### Page Content Verification
```bash
node dist/src/cli.js navigate http://localhost:3000
node dist/src/cli.js assert "the page title is visible"
node dist/src/cli.js assert "the navigation menu contains expected items"
node dist/src/cli.js assert "the footer contains copyright information"
```

#### User Flow Verification
```bash
node dist/src/cli.js navigate http://localhost:3000/login
node dist/src/cli.js act "type 'user@test.com' into email field"
node dist/src/cli.js act "type 'password123' into password field"
node dist/src/cli.js act "click login button"
node dist/src/cli.js assert "redirected to dashboard page"
node dist/src/cli.js assert "welcome message is displayed"
```

#### Interactive Feedback Verification
```bash
node dist/src/cli.js navigate http://localhost:3000/settings
node dist/src/cli.js act "click the save button"
node dist/src/cli.js assert "success toast or notification appears"
node dist/src/cli.js act "click the delete button"
node dist/src/cli.js assert "confirmation dialog is shown"
```

### Verification Best Practices

1. **Be specific about what to verify**: "the error message says 'Email is required'" is better than "there is an error"
2. **Verify one thing at a time**: Each `assert` should check a single condition
3. **Always take screenshots**: Visual evidence helps when verification fails
4. **Check both positive and negative cases**: Verify what should appear AND what should not
5. **Use `query` for data verification**: When you need to extract and compare values, use `query` instead of `assert`

## Troubleshooting

**Page not loading**: Wait a few seconds after navigation. Midscene usually handles this automatically.

**Element not found**: Be more specific in your natural language description. Instead of "the button", try "the blue Submit button at the bottom of the form"

**Action fails**: Check the screenshot to see the current page state. The element you're looking for might be hidden, in a different location, or have a different appearance.

**Screenshots missing**: Check the plugin directory's `agent/browser_screenshots/` folder for saved files

**Chrome not found**: Install Google Chrome or check if it's installed at the standard location

**Port 9222 in use**: Another Chrome debugging session is running. Close it or the CLI will reuse it.

**API Key issues**: Make sure your `.env` file is properly configured with valid API credentials. Check [Midscene Model Configuration Guide](https://midscenejs.com/model-config.html)

**Query returns unexpected results**: Be more specific in your query. Include context about what data format you want (e.g., "in JSON format", "as a comma-separated list")

For detailed examples, see [EXAMPLES.md](EXAMPLES.md).
For API reference and technical details, see [REFERENCE.md](REFERENCE.md).

## Dependencies

This skill requires:

```bash
pnpm install
```

Key dependencies:
- `@midscene/web` - Midscene web automation library
- `@midscene/core` - Midscene core functionality
- `puppeteer-core` - Browser control
- AI Model API (OpenAI, Anthropic, or compatible providers)
