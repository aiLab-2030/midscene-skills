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

Automate the user's real Chrome browser using `npx @midscene/web@1.3.12-beta-20260211110624.0`. This connects via the Midscene Chrome Extension (Bridge mode), preserving cookies, sessions, and login state. Each CLI command maps directly to an MCP tool — you (the AI agent) act as the brain, deciding which actions to take based on screenshots.

## When to Use

Use Chrome Bridge mode when:
- The user is already logged in and you need to preserve their session
- You need access to cookies, extensions, or browser state
- The user wants to see the automation happening in their own browser
- Working with pages that require authentication

If you get a "Bridge call timeout" error, consider using the **Browser Automation** skill instead, which launches a separate Chrome instance via Puppeteer and does not require the Chrome Extension.

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

3. **Ensure Chrome is open** with the [Midscene Chrome Extension](https://midscenejs.com/bridge-mode-by-chrome-extension.html) installed and showing "Connected" status.

See [Model Configuration](https://midscenejs.com/zh/model-common-config.html) for details.

## Command Discovery

First, run help to see all available commands:

```bash
npx @midscene/web@1.3.12-beta-20260211110624.0 --help
```

## Common Commands

### Connect to a Web Page

```bash
npx @midscene/web@1.3.12-beta-20260211110624.0 connect --url https://example.com
```

### Take Screenshot

```bash
npx @midscene/web@1.3.12-beta-20260211110624.0 take_screenshot
```

After taking a screenshot, read the saved image file to understand the current page state before deciding the next action.

### Perform Actions

Use actionSpace tools to interact with the page:

```bash
npx @midscene/web@1.3.12-beta-20260211110624.0 Tap --locate '{"prompt":"the Login button"}'
npx @midscene/web@1.3.12-beta-20260211110624.0 Input --locate '{"prompt":"the email field"}' --value 'user@example.com'
npx @midscene/web@1.3.12-beta-20260211110624.0 Scroll --direction down
npx @midscene/web@1.3.12-beta-20260211110624.0 Hover --locate '{"prompt":"the navigation menu"}'
npx @midscene/web@1.3.12-beta-20260211110624.0 KeyboardPress --value Enter
npx @midscene/web@1.3.12-beta-20260211110624.0 DragAndDrop --locate '{"prompt":"the draggable item"}' --target '{"prompt":"the drop zone"}'
```

### Disconnect

```bash
npx @midscene/web@1.3.12-beta-20260211110624.0 disconnect
```

## Workflow Pattern

Since CLI commands are stateless between invocations, follow this pattern:

1. **Connect** to a URL to establish a session
2. **Take screenshot** to see the current state
3. **Analyze** the screenshot to decide the next action
4. **Execute action** (Tap, Input, Scroll, etc.)
5. **Take screenshot** again to verify the result
6. **Repeat** steps 3-5 until the task is complete
7. **Disconnect** when done

## Best Practices

1. **Always connect first**: Navigate to the target URL with `connect --url` before any interaction.
2. **Take screenshots frequently**: Before and after each action to verify state changes.
3. **Be specific in locate prompts**: Instead of `"the button"`, say `"the blue Submit button in the contact form"`.
4. **Use natural language**: Describe what you see on the page, not CSS selectors. Say `"the red Buy Now button"` instead of `"#buy-btn"`.
5. **Handle loading states**: After navigation or actions that trigger page loads, take a screenshot to verify the page has loaded.
6. **Disconnect when done**: Always disconnect to free resources.

### Handle Transient UI

Dropdowns, autocomplete popups, tooltips, and confirm dialogs **disappear** between commands. When interacting with transient UI:

- **Execute commands rapidly in sequence** — do NOT take screenshots between steps
- **Do NOT pause to analyze** — run all commands for the transient interaction back-to-back
- Persistent UI (page content, navigation bars, sidebars) is fine to interact with across separate commands

**Example — Dropdown selection (transient):**

```bash
# These commands must be run back-to-back WITHOUT screenshots in between
npx @midscene/web@1.3.12-beta-20260211110624.0 Tap --locate '{"prompt":"the country dropdown"}'
npx @midscene/web@1.3.12-beta-20260211110624.0 Tap --locate '{"prompt":"Japan option in the dropdown list"}'
# NOW take a screenshot to verify the result
npx @midscene/web@1.3.12-beta-20260211110624.0 take_screenshot
```

## Common Patterns

### Simple Browsing

```bash
npx @midscene/web@1.3.12-beta-20260211110624.0 connect --url 'https://news.ycombinator.com'
npx @midscene/web@1.3.12-beta-20260211110624.0 take_screenshot
# Read the screenshot, then decide next action
npx @midscene/web@1.3.12-beta-20260211110624.0 disconnect
```

### Multi-Step Interaction

```bash
npx @midscene/web@1.3.12-beta-20260211110624.0 connect --url 'https://example.com'
npx @midscene/web@1.3.12-beta-20260211110624.0 Tap --locate '{"prompt":"the Sign In link"}'
npx @midscene/web@1.3.12-beta-20260211110624.0 take_screenshot
npx @midscene/web@1.3.12-beta-20260211110624.0 Input --locate '{"prompt":"the email field"}' --value 'user@example.com'
npx @midscene/web@1.3.12-beta-20260211110624.0 Input --locate '{"prompt":"the password field"}' --value 'password123'
npx @midscene/web@1.3.12-beta-20260211110624.0 Tap --locate '{"prompt":"the Log In button"}'
npx @midscene/web@1.3.12-beta-20260211110624.0 take_screenshot
npx @midscene/web@1.3.12-beta-20260211110624.0 disconnect
```

### Frontend Verification

```bash
npx @midscene/web@1.3.12-beta-20260211110624.0 connect --url 'http://localhost:3000'
npx @midscene/web@1.3.12-beta-20260211110624.0 take_screenshot
# Analyze: verify login form is visible
npx @midscene/web@1.3.12-beta-20260211110624.0 Input --locate '{"prompt":"the email field"}' --value 'test@example.com'
npx @midscene/web@1.3.12-beta-20260211110624.0 Input --locate '{"prompt":"the password field"}' --value 'password'
npx @midscene/web@1.3.12-beta-20260211110624.0 Tap --locate '{"prompt":"the Submit button"}'
npx @midscene/web@1.3.12-beta-20260211110624.0 take_screenshot
# Analyze: verify the welcome message is displayed
npx @midscene/web@1.3.12-beta-20260211110624.0 disconnect
```

## Troubleshooting

### Bridge Mode Connection Failures
- Ensure Chrome is open with the Midscene Extension installed and enabled.
- Check that the extension shows "Connected" status.
- See the [Bridge Mode documentation](https://midscenejs.com/bridge-mode-by-chrome-extension.html).

### API Key Errors
- Ensure `MIDSCENE_MODEL_API_KEY` is set in the environment.
- Verify the key is valid for the configured model provider.

### Timeouts
- Web pages may take time to load. After connecting, take a screenshot to verify readiness before interacting.
- For slow pages, wait briefly between steps.

### Screenshots Not Displaying
- The screenshot path is an absolute path to a local file. Use the Read tool to view it.

### If Bridge Mode Fails
If you get a "Bridge call timeout" error, consider using the **Browser Automation** skill instead, which launches a separate Chrome instance via Puppeteer and does not require the Chrome Extension.
