---
name: Chrome Bridge Automation
description: |
  AI-powered browser automation using Midscene Bridge mode. Use this skill when the user wants to:
  - Browse, navigate, or open web pages in the user's own Chrome browser
  - Interact with pages that require login sessions, cookies, or existing browser state
  - Scrape, extract, or collect data from websites using the user's real browser
  - Fill out forms, click buttons, or interact with web elements
  - Verify, validate, or test frontend UI behavior
  - Take screenshots of web pages
  - Automate multi-step web workflows
  - Check website content or appearance

  This mode connects to the user's real Chrome browser via the Midscene Chrome Extension,
  preserving cookies, sessions, and login state.

  Trigger keywords: browse, navigate, open url, web page, website, scrape, extract, crawl,
  fill form, click, interact, verify, validate, test, assert, screenshot, frontend, UI test,
  web automation, search web, check page, login, submit, chrome, bridge
allowed-tools:
  - Bash
---

# Chrome Bridge Automation

## Overview

This skill provides browser automation powered by Midscene AI in **Bridge mode**. It connects to the user's real Chrome browser via the Midscene Chrome Extension, preserving cookies, sessions, and login state.

All commands are executed via:

```
npx @midscene/cli@1.3.11-beta-20260211031343.0 do <command> --bridge
```

Midscene uses AI visual understanding to interact with web pages using natural language descriptions — no CSS selectors or XPath needed.

## When to Use

Use Chrome Bridge mode when:
- The user is already logged in and you need to preserve their session
- You need access to cookies, extensions, or browser state
- The user wants to see the automation happening in their own browser
- Working with pages that require authentication

**Prerequisite:** The [Midscene Chrome Extension](https://midscenejs.com/bridge-mode-by-chrome-extension.html) must be installed and enabled in Chrome.

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

4. **Ensure Chrome is open** with the Midscene Extension installed and showing "Connected" status.

See [Model Configuration](https://midscenejs.com/zh/model-common-config.html) for details.

## Available Commands

### navigate — Open a URL

```bash
npx @midscene/cli@1.3.11-beta-20260211031343.0 do navigate "https://example.com" --bridge
```

### act — Interact with the page

Perform actions using natural language descriptions.

```bash
npx @midscene/cli@1.3.11-beta-20260211031343.0 do act "click the Login button" --bridge
npx @midscene/cli@1.3.11-beta-20260211031343.0 do act "type 'hello world' into the search box" --bridge
npx @midscene/cli@1.3.11-beta-20260211031343.0 do act "scroll down to the footer" --bridge
npx @midscene/cli@1.3.11-beta-20260211031343.0 do act "select 'Large' from the size dropdown" --bridge
```

### query — Extract data from the page

Ask questions about page content and get structured results.

```bash
npx @midscene/cli@1.3.11-beta-20260211031343.0 do query "what are all the product names and prices on this page?" --bridge
npx @midscene/cli@1.3.11-beta-20260211031343.0 do query "get the main headline text" --bridge
npx @midscene/cli@1.3.11-beta-20260211031343.0 do query "list all navigation menu items" --bridge
```

### assert — Verify conditions

Assert that something is true about the current page state. Returns success or failure.

```bash
npx @midscene/cli@1.3.11-beta-20260211031343.0 do assert "the page title contains 'Dashboard'" --bridge
npx @midscene/cli@1.3.11-beta-20260211031343.0 do assert "there is a login form visible" --bridge
npx @midscene/cli@1.3.11-beta-20260211031343.0 do assert "the error message is not displayed" --bridge
```

### screenshot — Capture the current page

```bash
npx @midscene/cli@1.3.11-beta-20260211031343.0 do screenshot --bridge
```

### close — Close the browser

```bash
npx @midscene/cli@1.3.11-beta-20260211031343.0 close --bridge
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
7. **Combine transient UI interactions.** Dropdowns, autocomplete popups, tooltips, and confirm dialogs may disappear between commands. Combine all interactions with transient UI into a single `act` (e.g., `"click the country dropdown and select 'Japan'"`).

## Common Patterns

### Simple Browsing

```bash
npx @midscene/cli@1.3.11-beta-20260211031343.0 do navigate "https://news.ycombinator.com" --bridge
npx @midscene/cli@1.3.11-beta-20260211031343.0 do query "what are the top 5 stories on the front page?" --bridge
npx @midscene/cli@1.3.11-beta-20260211031343.0 close --bridge
```

### Data Extraction

```bash
npx @midscene/cli@1.3.11-beta-20260211031343.0 do navigate "https://example.com/products" --bridge
npx @midscene/cli@1.3.11-beta-20260211031343.0 do query "extract all product names, prices, and ratings as a JSON array" --bridge
npx @midscene/cli@1.3.11-beta-20260211031343.0 close --bridge
```

### Multi-Step Interaction

```bash
npx @midscene/cli@1.3.11-beta-20260211031343.0 do navigate "https://example.com" --bridge
npx @midscene/cli@1.3.11-beta-20260211031343.0 do act "click the Sign In link" --bridge
npx @midscene/cli@1.3.11-beta-20260211031343.0 do act "type 'user@example.com' into the email field" --bridge
npx @midscene/cli@1.3.11-beta-20260211031343.0 do act "type 'password123' into the password field" --bridge
npx @midscene/cli@1.3.11-beta-20260211031343.0 do act "click the Log In button" --bridge
npx @midscene/cli@1.3.11-beta-20260211031343.0 do screenshot --bridge
npx @midscene/cli@1.3.11-beta-20260211031343.0 close --bridge
```

### Frontend Verification

```bash
npx @midscene/cli@1.3.11-beta-20260211031343.0 do navigate "http://localhost:3000" --bridge
npx @midscene/cli@1.3.11-beta-20260211031343.0 do assert "the login form is visible with email and password fields" --bridge
npx @midscene/cli@1.3.11-beta-20260211031343.0 do act "type 'test@example.com' into the email field" --bridge
npx @midscene/cli@1.3.11-beta-20260211031343.0 do act "type 'password' into the password field" --bridge
npx @midscene/cli@1.3.11-beta-20260211031343.0 do act "click the Submit button" --bridge
npx @midscene/cli@1.3.11-beta-20260211031343.0 do assert "the welcome message is displayed" --bridge
npx @midscene/cli@1.3.11-beta-20260211031343.0 close --bridge
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

### Bridge Mode Connection Failures
- Ensure Chrome is open with the Midscene Extension installed and enabled.
- Check that the extension shows "Connected" status.
- See the [Bridge Mode documentation](https://midscenejs.com/bridge-mode-by-chrome-extension.html).

### API Key Errors
- Ensure `MIDSCENE_MODEL_API_KEY` is set in the environment.
- Verify the key is valid for the configured model provider.

### Timeouts
- Web pages may take time to load. After navigation, take a screenshot to verify readiness before interacting.
- For slow pages, wait briefly between steps.

### Screenshots Not Displaying
- The screenshot path is an absolute path to a temporary file. Use the Read tool to view it.

### If Bridge Mode Fails
If you get a "Bridge call timeout" error, consider using the **Browser Automation** skill instead, which launches a separate Chrome instance via Puppeteer and does not require the Chrome Extension.
