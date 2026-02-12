---
name: Browser Automation
description: |
  AI-powered browser automation using Midscene. Use this skill when the user wants to:
  - Browse, navigate, or open web pages
  - Scrape, extract, or collect data from websites
  - Fill out forms, click buttons, or interact with web elements
  - Verify, validate, or test frontend UI behavior
  - Take screenshots of web pages
  - Automate multi-step web workflows
  - Run browser automation or check website content

  Opens a new browser tab for each target URL via Puppeteer (headless Chrome).

  Trigger keywords: browse, navigate, open url, web page, website, scrape, extract, crawl,
  fill form, click, interact, verify, validate, test, assert, screenshot, frontend, UI test,
  web automation, search web, check page, puppeteer, headless, CI
allowed-tools:
  - Bash
---

# Browser Automation

> **CRITICAL RULES — VIOLATIONS WILL BREAK THE WORKFLOW:**
>
> 1. **Never run midscene commands in the background.** Each command must run synchronously so you can read its output (especially screenshots) before deciding the next action. Background execution breaks the screenshot-analyze-act loop.
> 2. **Run only one midscene command at a time.** Wait for the previous command to finish, read the screenshot, then decide the next action. Never chain multiple commands together.
> 3. **Allow enough time for each command to complete.** Midscene commands involve AI inference and screen interaction, which can take longer than typical shell commands. A typical command needs about 1 minute; `act` commands with multi-step operations may need even longer.

Automate web browsing using `npx @midscene/web`. Launches a headless Chrome via Puppeteer that **persists across CLI calls** — no session loss between commands. Each CLI command maps directly to an MCP tool — you (the AI agent) act as the brain, deciding which actions to take based on screenshots.

## When to Use

Use this skill when:
- The user wants to browse or navigate to a specific URL
- You need to scrape, extract, or collect data from websites
- You want to verify or test frontend UI behavior
- The user wants screenshots of web pages

If you need to preserve login sessions or work with the user's existing browser tabs, use the **Chrome Bridge Automation** skill instead.

## Prerequisites

Midscene requires models with strong visual grounding capabilities. The following environment variables must be configured — either as system environment variables or in a `.env` file in the current working directory (Midscene loads `.env` automatically):

```bash
MIDSCENE_MODEL_API_KEY="your-api-key"
MIDSCENE_MODEL_NAME="model-name"
MIDSCENE_MODEL_BASE_URL="https://..."
MIDSCENE_MODEL_FAMILY="family-identifier"
```

Example: Gemini (Gemini-3-Flash)

```bash
MIDSCENE_MODEL_API_KEY="your-google-api-key"
MIDSCENE_MODEL_NAME="gemini-3-flash"
MIDSCENE_MODEL_BASE_URL="https://generativelanguage.googleapis.com/v1beta/openai/"
MIDSCENE_MODEL_FAMILY="gemini"
```

Example: Qwen3-VL

```bash
MIDSCENE_MODEL_API_KEY="your-openrouter-api-key"
MIDSCENE_MODEL_NAME="qwen/qwen3-vl-235b-a22b-instruct"
MIDSCENE_MODEL_BASE_URL="https://openrouter.ai/api/v1"
MIDSCENE_MODEL_FAMILY="qwen3-vl"
```

Example: Doubao Seed 1.6

```bash
MIDSCENE_MODEL_API_KEY="your-doubao-api-key"
MIDSCENE_MODEL_NAME="doubao-seed-1-6-250615"
MIDSCENE_MODEL_BASE_URL="https://ark.cn-beijing.volces.com/api/v3"
MIDSCENE_MODEL_FAMILY="doubao-vision"
```

Commonly used models: Doubao Seed 1.6, Qwen3-VL, Zhipu GLM-4.6V, Gemini-3-Pro, Gemini-3-Flash.

If the model is not configured, ask the user to set it up. See [Model Configuration](https://midscenejs.com/model-common-config) for supported providers.

## Commands

### Connect to a Web Page

```bash
npx @midscene/web connect --url https://example.com
```

### Take Screenshot

```bash
npx @midscene/web take_screenshot
```

After taking a screenshot, read the saved image file to understand the current page state before deciding the next action.

### Perform Actions

Use actionSpace tools to interact with the page:

```bash
npx @midscene/web Tap --locate '{"prompt":"the Login button"}'
npx @midscene/web Input --locate '{"prompt":"the email field"}' --value 'user@example.com'
npx @midscene/web Scroll --direction down
npx @midscene/web Hover --locate '{"prompt":"the navigation menu"}'
npx @midscene/web KeyboardPress --value Enter
npx @midscene/web DragAndDrop --locate '{"prompt":"the draggable item"}' --target '{"prompt":"the drop zone"}'
```

### Natural Language Action

Use `act` to execute multi-step operations in a single command — useful for transient UI interactions:

```bash
npx @midscene/web act --prompt "click the country dropdown and select Japan"
```

### Disconnect

Disconnect from the page but keep the browser running:

```bash
npx @midscene/web disconnect
```

### Close Browser

Close the browser completely when finished:

```bash
npx @midscene/web close
```

## Workflow Pattern

The browser **persists across CLI calls** via a background Chrome process. Follow this pattern:

1. **Connect** to a URL to open a new tab
2. **Take screenshot** to see the current state
3. **Analyze** the screenshot to decide the next action
4. **Execute action** (Tap, Input, Scroll, etc.)
5. **Take screenshot** again to verify the result
6. **Repeat** steps 3-5 until the task is complete
7. **Close** the browser when done (or **disconnect** to keep it for later)

## Best Practices

1. **Always connect first**: Navigate to the target URL with `connect --url` before any interaction.
2. **Take screenshots frequently**: Before and after each action to verify state changes.
3. **Be specific in locate prompts**: Instead of `"the button"`, say `"the blue Submit button in the contact form"`.
4. **Use natural language**: Describe what you see on the page, not CSS selectors. Say `"the red Buy Now button"` instead of `"#buy-btn"`.
5. **Handle loading states**: After navigation or actions that trigger page loads, take a screenshot to verify the page has loaded.
6. **Close when done**: Use `close` to shut down the browser and free resources.
7. **Never run in background**: Every midscene command must run synchronously — background execution breaks the screenshot-analyze-act loop.

### Handle Transient UI

Dropdowns, autocomplete popups, tooltips, and confirm dialogs **disappear** between commands. When interacting with transient UI:

- **Use `act` for multi-step transient interactions** — it executes everything in a single process
- **Or execute commands rapidly in sequence** — do NOT take screenshots between steps
- **Do NOT pause to analyze** — run all commands for the transient interaction back-to-back
- Persistent UI (page content, navigation bars, sidebars) is fine to interact with across separate commands

**Example — Dropdown selection using `act` (recommended for transient UI):**

```bash
npx @midscene/web act --prompt "click the country dropdown and select Japan"
npx @midscene/web take_screenshot
```

**Example — Dropdown selection using individual commands (alternative):**

```bash
# These commands must be run back-to-back WITHOUT screenshots in between
npx @midscene/web Tap --locate '{"prompt":"the country dropdown"}'
npx @midscene/web Tap --locate '{"prompt":"Japan option in the dropdown list"}'
# NOW take a screenshot to verify the result
npx @midscene/web take_screenshot
```

## Common Patterns

### Simple Browsing

```bash
npx @midscene/web connect --url 'https://news.ycombinator.com'
npx @midscene/web take_screenshot
# Read the screenshot, then decide next action
npx @midscene/web close
```

### Multi-Step Interaction

```bash
npx @midscene/web connect --url 'https://example.com'
npx @midscene/web Tap --locate '{"prompt":"the Sign In link"}'
npx @midscene/web take_screenshot
npx @midscene/web Input --locate '{"prompt":"the email field"}' --value 'user@example.com'
npx @midscene/web Input --locate '{"prompt":"the password field"}' --value 'password123'
npx @midscene/web Tap --locate '{"prompt":"the Log In button"}'
npx @midscene/web take_screenshot
npx @midscene/web close
```

### Frontend Verification

```bash
npx @midscene/web connect --url 'http://localhost:3000'
npx @midscene/web take_screenshot
# Analyze: verify login form is visible
npx @midscene/web Input --locate '{"prompt":"the email field"}' --value 'test@example.com'
npx @midscene/web Input --locate '{"prompt":"the password field"}' --value 'password'
npx @midscene/web Tap --locate '{"prompt":"the Submit button"}'
npx @midscene/web take_screenshot
# Analyze: verify the welcome message is displayed
npx @midscene/web close
```

### Data Extraction

```bash
npx @midscene/web connect --url 'https://example.com/products'
npx @midscene/web take_screenshot
# Read the screenshot to extract product names, prices, and ratings
npx @midscene/web close
```

## Frontend Verification Workflow

When asked to verify or test a frontend application:

1. **Start the dev server** if not already running (e.g., `npm run dev`).
2. **Connect** to the local URL (e.g., `http://localhost:3000`).
3. **Take a screenshot** to see the initial state.
4. **Analyze the screenshot** to verify expected UI elements are present.
5. **Perform interactions** (Tap, Input, Scroll) to test user flows.
6. **Take screenshots** after each step to verify outcomes.
7. **Close** the browser when finished.

## Troubleshooting

### Connection Failures
- Ensure Chrome/Chromium is installed on the system (Puppeteer downloads its own by default).
- Check that no firewall blocks local Chrome debugging ports.

### API Key Errors
- Check `.env` file contains `MIDSCENE_MODEL_API_KEY=<your-key>`.
- Verify the key is valid for the configured model provider.

### Timeouts
- Web pages may take time to load. After connecting, take a screenshot to verify readiness before interacting.
- For slow pages, wait briefly between steps.

### Screenshots Not Displaying
- The screenshot path is an absolute path to a local file. Use the Read tool to view it.

## Safety Warning

AI-driven UI automation may produce unpredictable results. Please evaluate the risks carefully before use.
