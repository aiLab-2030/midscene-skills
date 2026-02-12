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

> **CRITICAL RULES — VIOLATIONS WILL BREAK THE WORKFLOW:**
>
> 1. **Never run midscene commands in the background.** Each command must run synchronously so you can read its output (especially screenshots) before deciding the next action. Background execution breaks the screenshot-analyze-act loop.
> 2. **Run only one midscene command at a time.** Wait for the previous command to finish, read the screenshot, then decide the next action. Never chain multiple commands together.
> 3. **Allow enough time for each command to complete.** Midscene commands involve AI inference and screen interaction, which can take longer than typical shell commands. A typical command needs about 1 minute; `act` commands with multi-step operations may need even longer.

Automate the user's real Chrome browser via the Midscene Chrome Extension (Bridge mode), preserving cookies, sessions, and login state. You (the AI agent) act as the brain, deciding which actions to take based on screenshots.

## Command Format

**CRITICAL — Every command MUST follow this EXACT format. Do NOT modify the command prefix.**

```
npx @midscene/web --bridge <subcommand> [args]
```

- `--bridge` flag is **MANDATORY** — it activates Bridge mode to connect to the user's real Chrome
- Without `--bridge`, the CLI launches a separate headless browser (wrong behavior for this skill)
- Do NOT use `-p` flag, do NOT use environment variables as substitutes — use `--bridge` exactly as shown

## Prerequisites

The user has already prepared Chrome and the Midscene Extension. Do NOT check browser or extension status — just connect directly.

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
npx @midscene/web --bridge connect --url https://example.com
```

### Take Screenshot

```bash
npx @midscene/web --bridge take_screenshot
```

After taking a screenshot, read the saved image file to understand the current page state before deciding the next action.

### Perform Actions

```bash
npx @midscene/web --bridge Tap --locate '{"prompt":"the Login button"}'
npx @midscene/web --bridge Input --locate '{"prompt":"the email field"}' --value 'user@example.com'
npx @midscene/web --bridge Scroll --direction down
npx @midscene/web --bridge Hover --locate '{"prompt":"the navigation menu"}'
npx @midscene/web --bridge KeyboardPress --value Enter
npx @midscene/web --bridge DragAndDrop --locate '{"prompt":"the draggable item"}' --target '{"prompt":"the drop zone"}'
```

### Natural Language Action

Use `act` to execute multi-step operations in a single command — useful for transient UI interactions:

```bash
npx @midscene/web --bridge act --prompt "click the country dropdown and select Japan"
```

### Disconnect

```bash
npx @midscene/web --bridge disconnect
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
7. **Never run in background**: Every midscene command must run synchronously — background execution breaks the screenshot-analyze-act loop.

### Handle Transient UI

Dropdowns, autocomplete popups, tooltips, and confirm dialogs **disappear** between commands. When interacting with transient UI:

- **Use `act` for multi-step transient interactions** — it executes everything in a single process
- **Or execute commands rapidly in sequence** — do NOT take screenshots between steps
- **Do NOT pause to analyze** — run all commands for the transient interaction back-to-back
- Persistent UI (page content, navigation bars, sidebars) is fine to interact with across separate commands

**Example — Dropdown selection using `act` (recommended for transient UI):**

```bash
npx @midscene/web --bridge act --prompt "click the country dropdown and select Japan"
npx @midscene/web --bridge take_screenshot
```

**Example — Dropdown selection using individual commands (alternative):**

```bash
# These commands must be run back-to-back WITHOUT screenshots in between
npx @midscene/web --bridge Tap --locate '{"prompt":"the country dropdown"}'
npx @midscene/web --bridge Tap --locate '{"prompt":"Japan option in the dropdown list"}'
# NOW take a screenshot to verify the result
npx @midscene/web --bridge take_screenshot
```

## Common Patterns

### Simple Browsing

```bash
npx @midscene/web --bridge connect --url 'https://news.ycombinator.com'
npx @midscene/web --bridge take_screenshot
# Read the screenshot, then decide next action
npx @midscene/web --bridge disconnect
```

### Multi-Step Interaction

```bash
npx @midscene/web --bridge connect --url 'https://example.com'
npx @midscene/web --bridge Tap --locate '{"prompt":"the Sign In link"}'
npx @midscene/web --bridge take_screenshot
npx @midscene/web --bridge Input --locate '{"prompt":"the email field"}' --value 'user@example.com'
npx @midscene/web --bridge Input --locate '{"prompt":"the password field"}' --value 'password123'
npx @midscene/web --bridge Tap --locate '{"prompt":"the Log In button"}'
npx @midscene/web --bridge take_screenshot
npx @midscene/web --bridge disconnect
```

## Troubleshooting

### Bridge Mode Connection Failures
- Ensure Chrome is open with the Midscene Extension installed and enabled.
- Check that the extension shows "Connected" status.
- See the [Bridge Mode documentation](https://midscenejs.com/bridge-mode-by-chrome-extension.html).

### API Key Errors
- Check `.env` file contains `MIDSCENE_MODEL_API_KEY=<your-key>`.
- Verify the key is valid for the configured model provider.

### Timeouts
- Web pages may take time to load. After connecting, take a screenshot to verify readiness before interacting.
- For slow pages, wait briefly between steps.

### Screenshots Not Displaying
- The screenshot path is an absolute path to a local file. Use the Read tool to view it.
