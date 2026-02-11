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

Automate web browsing using `npx @midscene/web@1.3.12-beta-20260211123127.0`. Launches a headless Chrome via Puppeteer that **persists across CLI calls** — no session loss between commands. Each CLI command maps directly to an MCP tool — you (the AI agent) act as the brain, deciding which actions to take based on screenshots.

## When to Use

Use this skill when:
- The user wants to browse or navigate to a specific URL
- You need to scrape, extract, or collect data from websites
- You want to verify or test frontend UI behavior
- The user wants screenshots of web pages

If you need to preserve login sessions or work with the user's existing browser tabs, use the **Chrome Bridge Automation** skill instead.

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

See [Model Configuration](https://midscenejs.com/zh/model-common-config.html) for details.

## Command Discovery

First, run help to see all available commands:

```bash
npx @midscene/web@1.3.12-beta-20260211123127.0 --help
```

## Common Commands

### Connect to a Web Page

```bash
npx @midscene/web@1.3.12-beta-20260211123127.0 connect --url https://example.com
```

### Take Screenshot

```bash
npx @midscene/web@1.3.12-beta-20260211123127.0 take_screenshot
```

After taking a screenshot, read the saved image file to understand the current page state before deciding the next action.

### Perform Actions

Use actionSpace tools to interact with the page:

```bash
npx @midscene/web@1.3.12-beta-20260211123127.0 Tap --locate '{"prompt":"the Login button"}'
npx @midscene/web@1.3.12-beta-20260211123127.0 Input --locate '{"prompt":"the email field"}' --value 'user@example.com'
npx @midscene/web@1.3.12-beta-20260211123127.0 Scroll --direction down
npx @midscene/web@1.3.12-beta-20260211123127.0 Hover --locate '{"prompt":"the navigation menu"}'
npx @midscene/web@1.3.12-beta-20260211123127.0 KeyboardPress --value Enter
npx @midscene/web@1.3.12-beta-20260211123127.0 DragAndDrop --locate '{"prompt":"the draggable item"}' --target '{"prompt":"the drop zone"}'
```

### Natural Language Action

Use `act` to execute multi-step operations in a single command — useful for transient UI interactions:

```bash
npx @midscene/web@1.3.12-beta-20260211123127.0 act --prompt "click the country dropdown and select Japan"
```

### Disconnect

Disconnect from the page but keep the browser running:

```bash
npx @midscene/web@1.3.12-beta-20260211123127.0 disconnect
```

### Close Browser

Close the browser completely when finished:

```bash
npx @midscene/web@1.3.12-beta-20260211123127.0 close
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

### Handle Transient UI

Dropdowns, autocomplete popups, tooltips, and confirm dialogs **disappear** between commands. When interacting with transient UI:

- **Use `act` for multi-step transient interactions** — it executes everything in a single process
- **Or execute commands rapidly in sequence** — do NOT take screenshots between steps
- **Do NOT pause to analyze** — run all commands for the transient interaction back-to-back
- Persistent UI (page content, navigation bars, sidebars) is fine to interact with across separate commands

**Example — Dropdown selection using `act` (recommended for transient UI):**

```bash
npx @midscene/web@1.3.12-beta-20260211123127.0 act --prompt "click the country dropdown and select Japan"
npx @midscene/web@1.3.12-beta-20260211123127.0 take_screenshot
```

**Example — Dropdown selection using individual commands (alternative):**

```bash
# These commands must be run back-to-back WITHOUT screenshots in between
npx @midscene/web@1.3.12-beta-20260211123127.0 Tap --locate '{"prompt":"the country dropdown"}'
npx @midscene/web@1.3.12-beta-20260211123127.0 Tap --locate '{"prompt":"Japan option in the dropdown list"}'
# NOW take a screenshot to verify the result
npx @midscene/web@1.3.12-beta-20260211123127.0 take_screenshot
```

## Common Patterns

### Simple Browsing

```bash
npx @midscene/web@1.3.12-beta-20260211123127.0 connect --url 'https://news.ycombinator.com'
npx @midscene/web@1.3.12-beta-20260211123127.0 take_screenshot
# Read the screenshot, then decide next action
npx @midscene/web@1.3.12-beta-20260211123127.0 close
```

### Multi-Step Interaction

```bash
npx @midscene/web@1.3.12-beta-20260211123127.0 connect --url 'https://example.com'
npx @midscene/web@1.3.12-beta-20260211123127.0 Tap --locate '{"prompt":"the Sign In link"}'
npx @midscene/web@1.3.12-beta-20260211123127.0 take_screenshot
npx @midscene/web@1.3.12-beta-20260211123127.0 Input --locate '{"prompt":"the email field"}' --value 'user@example.com'
npx @midscene/web@1.3.12-beta-20260211123127.0 Input --locate '{"prompt":"the password field"}' --value 'password123'
npx @midscene/web@1.3.12-beta-20260211123127.0 Tap --locate '{"prompt":"the Log In button"}'
npx @midscene/web@1.3.12-beta-20260211123127.0 take_screenshot
npx @midscene/web@1.3.12-beta-20260211123127.0 close
```

### Frontend Verification

```bash
npx @midscene/web@1.3.12-beta-20260211123127.0 connect --url 'http://localhost:3000'
npx @midscene/web@1.3.12-beta-20260211123127.0 take_screenshot
# Analyze: verify login form is visible
npx @midscene/web@1.3.12-beta-20260211123127.0 Input --locate '{"prompt":"the email field"}' --value 'test@example.com'
npx @midscene/web@1.3.12-beta-20260211123127.0 Input --locate '{"prompt":"the password field"}' --value 'password'
npx @midscene/web@1.3.12-beta-20260211123127.0 Tap --locate '{"prompt":"the Submit button"}'
npx @midscene/web@1.3.12-beta-20260211123127.0 take_screenshot
# Analyze: verify the welcome message is displayed
npx @midscene/web@1.3.12-beta-20260211123127.0 close
```

### Data Extraction

```bash
npx @midscene/web@1.3.12-beta-20260211123127.0 connect --url 'https://example.com/products'
npx @midscene/web@1.3.12-beta-20260211123127.0 take_screenshot
# Read the screenshot to extract product names, prices, and ratings
npx @midscene/web@1.3.12-beta-20260211123127.0 close
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
- Ensure `MIDSCENE_MODEL_API_KEY` is set in the environment.
- Verify the key is valid for the configured model provider.

### Timeouts
- Web pages may take time to load. After connecting, take a screenshot to verify readiness before interacting.
- For slow pages, wait briefly between steps.

### Screenshots Not Displaying
- The screenshot path is an absolute path to a local file. Use the Read tool to view it.
