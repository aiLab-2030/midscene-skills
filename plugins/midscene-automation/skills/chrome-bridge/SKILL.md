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

Automate the user's real Chrome browser via the Midscene Chrome Extension (Bridge mode), preserving cookies, sessions, and login state. You (the AI agent) act as the brain, deciding which actions to take based on screenshots.

## Command Format

**CRITICAL — Every command MUST use this EXACT format. Do NOT modify the syntax.**

```
MIDSCENE_USE_BRIDGE=1 npx @midscene/web@1.3.12-beta-20260212033510.0 <subcommand> [args]
```

- `MIDSCENE_USE_BRIDGE=1` — Required env var prefix that activates Bridge mode
- `npx @midscene/web@1.3.12-beta-20260212033510.0` — Package with pinned version. Do NOT use `npx -p` syntax
- `<subcommand>` — The command to execute (connect, take_screenshot, Tap, Input, etc.)

## Prerequisites

The user has already prepared Chrome and the Midscene Extension. Do NOT check browser or extension status — just connect directly.

Before first use, verify the API key is set:

```bash
echo $MIDSCENE_MODEL_API_KEY
```

If empty, ask the user for their API key. See [Model Configuration](https://midscenejs.com/zh/model-common-config.html) for supported providers.

## Commands

### Connect to a Web Page

```bash
MIDSCENE_USE_BRIDGE=1 npx @midscene/web@1.3.12-beta-20260212033510.0 connect --url https://example.com
```

### Take Screenshot

```bash
MIDSCENE_USE_BRIDGE=1 npx @midscene/web@1.3.12-beta-20260212033510.0 take_screenshot
```

After taking a screenshot, read the saved image file to understand the current page state before deciding the next action.

### Perform Actions

```bash
MIDSCENE_USE_BRIDGE=1 npx @midscene/web@1.3.12-beta-20260212033510.0 Tap --locate '{"prompt":"the Login button"}'
MIDSCENE_USE_BRIDGE=1 npx @midscene/web@1.3.12-beta-20260212033510.0 Input --locate '{"prompt":"the email field"}' --value 'user@example.com'
MIDSCENE_USE_BRIDGE=1 npx @midscene/web@1.3.12-beta-20260212033510.0 Scroll --direction down
MIDSCENE_USE_BRIDGE=1 npx @midscene/web@1.3.12-beta-20260212033510.0 Hover --locate '{"prompt":"the navigation menu"}'
MIDSCENE_USE_BRIDGE=1 npx @midscene/web@1.3.12-beta-20260212033510.0 KeyboardPress --value Enter
MIDSCENE_USE_BRIDGE=1 npx @midscene/web@1.3.12-beta-20260212033510.0 DragAndDrop --locate '{"prompt":"the draggable item"}' --target '{"prompt":"the drop zone"}'
```

### Natural Language Action

Use `act` to execute multi-step operations in a single command — useful for transient UI interactions:

```bash
MIDSCENE_USE_BRIDGE=1 npx @midscene/web@1.3.12-beta-20260212033510.0 act --prompt "click the country dropdown and select Japan"
```

### Disconnect

```bash
MIDSCENE_USE_BRIDGE=1 npx @midscene/web@1.3.12-beta-20260212033510.0 disconnect
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

- **Use `act` for multi-step transient interactions** — it executes everything in a single process
- **Or execute commands rapidly in sequence** — do NOT take screenshots between steps
- **Do NOT pause to analyze** — run all commands for the transient interaction back-to-back
- Persistent UI (page content, navigation bars, sidebars) is fine to interact with across separate commands

**Example — Dropdown selection using `act` (recommended for transient UI):**

```bash
MIDSCENE_USE_BRIDGE=1 npx @midscene/web@1.3.12-beta-20260212033510.0 act --prompt "click the country dropdown and select Japan"
MIDSCENE_USE_BRIDGE=1 npx @midscene/web@1.3.12-beta-20260212033510.0 take_screenshot
```

**Example — Dropdown selection using individual commands (alternative):**

```bash
# These commands must be run back-to-back WITHOUT screenshots in between
MIDSCENE_USE_BRIDGE=1 npx @midscene/web@1.3.12-beta-20260212033510.0 Tap --locate '{"prompt":"the country dropdown"}'
MIDSCENE_USE_BRIDGE=1 npx @midscene/web@1.3.12-beta-20260212033510.0 Tap --locate '{"prompt":"Japan option in the dropdown list"}'
# NOW take a screenshot to verify the result
MIDSCENE_USE_BRIDGE=1 npx @midscene/web@1.3.12-beta-20260212033510.0 take_screenshot
```

## Common Patterns

### Simple Browsing

```bash
MIDSCENE_USE_BRIDGE=1 npx @midscene/web@1.3.12-beta-20260212033510.0 connect --url 'https://news.ycombinator.com'
MIDSCENE_USE_BRIDGE=1 npx @midscene/web@1.3.12-beta-20260212033510.0 take_screenshot
# Read the screenshot, then decide next action
MIDSCENE_USE_BRIDGE=1 npx @midscene/web@1.3.12-beta-20260212033510.0 disconnect
```

### Multi-Step Interaction

```bash
MIDSCENE_USE_BRIDGE=1 npx @midscene/web@1.3.12-beta-20260212033510.0 connect --url 'https://example.com'
MIDSCENE_USE_BRIDGE=1 npx @midscene/web@1.3.12-beta-20260212033510.0 Tap --locate '{"prompt":"the Sign In link"}'
MIDSCENE_USE_BRIDGE=1 npx @midscene/web@1.3.12-beta-20260212033510.0 take_screenshot
MIDSCENE_USE_BRIDGE=1 npx @midscene/web@1.3.12-beta-20260212033510.0 Input --locate '{"prompt":"the email field"}' --value 'user@example.com'
MIDSCENE_USE_BRIDGE=1 npx @midscene/web@1.3.12-beta-20260212033510.0 Input --locate '{"prompt":"the password field"}' --value 'password123'
MIDSCENE_USE_BRIDGE=1 npx @midscene/web@1.3.12-beta-20260212033510.0 Tap --locate '{"prompt":"the Log In button"}'
MIDSCENE_USE_BRIDGE=1 npx @midscene/web@1.3.12-beta-20260212033510.0 take_screenshot
MIDSCENE_USE_BRIDGE=1 npx @midscene/web@1.3.12-beta-20260212033510.0 disconnect
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
