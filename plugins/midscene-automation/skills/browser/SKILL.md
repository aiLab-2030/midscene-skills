---
name: Browser Automation
description: |
  AI-powered browser automation using Midscene with Puppeteer. Use this skill when the user wants to:
  - Browse, navigate, or open web pages in an automated browser
  - Scrape, extract, or collect data from websites without needing login state
  - Fill out forms, click buttons, or interact with web elements
  - Verify, validate, or test frontend UI behavior
  - Take screenshots of web pages
  - Automate multi-step web workflows in a clean browser environment
  - Run browser automation in CI/CD or headless environments

  This mode launches a separate Chrome instance via Puppeteer. It does NOT preserve
  existing cookies, sessions, or login state from the user's browser.

  Trigger keywords: browse, navigate, open url, web page, website, scrape, extract, crawl,
  fill form, click, interact, verify, validate, test, assert, screenshot, frontend, UI test,
  web automation, search web, check page, puppeteer, headless, CI
allowed-tools:
  - Bash
---

# Browser Automation

## Overview

This skill provides browser automation powered by Midscene AI using **Puppeteer mode**. It automatically launches a separate Chrome instance for automation.

All commands are executed via:

```
npx @midscene/cli web <command>
```

Midscene uses AI visual understanding to interact with web pages using natural language descriptions — no CSS selectors or XPath needed.

## When to Use

Use Puppeteer (Browser) mode when:
- The Chrome Bridge mode fails with a connection timeout
- The user explicitly requests Puppeteer mode
- Running in CI/CD or headless environments
- You don't need to preserve existing cookies, sessions, or login state
- You want a clean browser environment for testing

**Note:** This mode launches a new Chrome instance. It does NOT share cookies, sessions, or extensions with the user's existing browser. If you need to preserve login state, use the **Chrome Bridge Automation** skill instead.

## Setup Verification

Before running commands, verify the environment is ready:

1. **Check Node.js** (>= 18.19.0):
   ```bash
   node --version
   ```

2. **Set API Key** (required):
   ```bash
   export MIDSCENE_MODEL_API_KEY="your-api-key"
   ```

3. **Optional model configuration:**
   ```bash
   export MIDSCENE_MODEL_NAME="gpt-4o"
   export MIDSCENE_MODEL_BASE_URL="https://api.openai.com/v1"
   ```

See [Model Configuration](https://midscenejs.com/zh/model-common-config.html) for details.

## Available Commands

### navigate — Open a URL

```bash
npx @midscene/cli web navigate "https://example.com"
```

### act — Interact with the page

Perform actions using natural language descriptions.

```bash
npx @midscene/cli web act "click the Login button"
npx @midscene/cli web act "type 'hello world' into the search box"
npx @midscene/cli web act "scroll down to the footer"
npx @midscene/cli web act "select 'Large' from the size dropdown"
```

### query — Extract data from the page

Ask questions about page content and get structured results.

```bash
npx @midscene/cli web query "what are all the product names and prices on this page?"
npx @midscene/cli web query "get the main headline text"
npx @midscene/cli web query "list all navigation menu items"
```

### assert — Verify conditions

Assert that something is true about the current page state. Returns success or failure.

```bash
npx @midscene/cli web assert "the page title contains 'Dashboard'"
npx @midscene/cli web assert "there is a login form visible"
npx @midscene/cli web assert "the error message is not displayed"
```

### screenshot — Capture the current page

```bash
npx @midscene/cli web screenshot
```

### close — Close the browser

```bash
npx @midscene/cli web close
```

## Output Format

All commands return JSON to stdout:

```json
{
  "success": true,
  "message": "Successfully navigated to https://example.com",
  "screenshot": "/tmp/midscene-screenshot-1234567890.png",
  "result": null
}
```

Fields:
- **success** (boolean): Whether the command succeeded
- **message** (string): Human-readable status message
- **screenshot** (string): Absolute path to the screenshot image file
- **result** (any): Data returned by `query` commands; null for other commands
- **error** (string): Error message when `success` is false

**IMPORTANT:** After every command, read the screenshot file to visually verify the page state before proceeding to the next step.

## Best Practices

1. **Always navigate first.** Before any interaction, navigate to the target URL.
2. **View screenshots after each step.** Read the screenshot file path from the JSON output to verify the page state.
3. **Be specific in action descriptions.** Instead of "click the button", say "click the Submit button in the contact form".
4. **Use natural language.** Describe what you see on the page, not CSS selectors. Say "the red Buy Now button" instead of "#buy-btn".
5. **Handle loading states.** After navigation or actions that trigger page loads, take a screenshot to verify the page has loaded.
6. **Close the browser when done.** Always run the close command when finished to free resources.

## Common Patterns

### Simple Browsing

```bash
npx @midscene/cli web navigate "https://news.ycombinator.com"
npx @midscene/cli web query "what are the top 5 stories on the front page?"
npx @midscene/cli web close
```

### Data Extraction

```bash
npx @midscene/cli web navigate "https://example.com/products"
npx @midscene/cli web query "extract all product names, prices, and ratings as a JSON array"
npx @midscene/cli web close
```

### Multi-Step Interaction

```bash
npx @midscene/cli web navigate "https://example.com"
npx @midscene/cli web act "click the Sign In link"
npx @midscene/cli web act "type 'user@example.com' into the email field"
npx @midscene/cli web act "type 'password123' into the password field"
npx @midscene/cli web act "click the Log In button"
npx @midscene/cli web screenshot
npx @midscene/cli web close
```

### Frontend Verification

```bash
npx @midscene/cli web navigate "http://localhost:3000"
npx @midscene/cli web assert "the login form is visible with email and password fields"
npx @midscene/cli web act "type 'test@example.com' into the email field"
npx @midscene/cli web act "type 'password' into the password field"
npx @midscene/cli web act "click the Submit button"
npx @midscene/cli web assert "the welcome message is displayed"
npx @midscene/cli web close
```

## Frontend Verification Workflow

When asked to verify or test a frontend application:

1. **Start the dev server** if not already running (e.g., `npm run dev`).
2. **Navigate** to the local URL (e.g., `http://localhost:3000`).
3. **Take a screenshot** to see the initial state.
4. **Run assertions** to verify expected UI elements are present.
5. **Perform interactions** (fill forms, click buttons) to test user flows.
6. **Assert outcomes** (success messages, navigation changes, data display).
7. **Close the browser** when finished.

## Troubleshooting

### "Could not find Chrome installation"
Chrome must be installed on the system. The CLI auto-detects Chrome at standard installation paths.

### "Chrome failed to start"
- Another Chrome instance may be using the debug port (9222). Close it or check for port conflicts.
- Try running `npx @midscene/cli web close` first.

### API Key Errors
- Ensure `MIDSCENE_MODEL_API_KEY` is set in the environment.
- Verify the key is valid for the configured model provider.

### Timeouts
- Web pages may take time to load. After navigation, take a screenshot to verify readiness before interacting.
- For slow pages, wait briefly between steps.

### Screenshots Not Displaying
- The screenshot path is an absolute path to a temporary file. Use the Read tool to view it.
