---
name: iOS Device Automation
description: |
  Vision-driven iOS device automation using Midscene CLI. Operates entirely from screenshots — no DOM or accessibility labels required. Can interact with all visible elements on screen regardless of technology stack.
  Control iOS devices and simulators with natural language commands via WebDriverAgent.
  Triggers: ios, iphone, ipad, ios app, tap on iphone, swipe, ios simulator, mobile app ios,
  ios device, ios testing, iphone automation, ipad automation, ios screen, ios navigate

  Powered by Midscene.js (https://midscenejs.com)
allowed-tools:
  - Bash
---

# iOS Device Automation

> **CRITICAL RULES — VIOLATIONS WILL BREAK THE WORKFLOW:**
>
> 1. **Never run midscene commands in the background.** Each command must run synchronously so you can read its output (especially screenshots) before deciding the next action. Background execution breaks the screenshot-analyze-act loop.
> 2. **Run only one midscene command at a time.** Wait for the previous command to finish, read the screenshot, then decide the next action. Never chain multiple commands together.
> 3. **Allow enough time for each command to complete.** Midscene commands involve AI inference and screen interaction, which can take longer than typical shell commands. A typical command needs about 1 minute; `act` commands with multi-step operations may need even longer.

Automate iOS devices and simulators using `npx @midscene/ios`. Each CLI command maps directly to an MCP tool — you (the AI agent) act as the brain, deciding which actions to take based on screenshots.

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

### Connect to Device

```bash
npx @midscene/ios connect
```

### Take Screenshot

```bash
npx @midscene/ios take_screenshot
```

After taking a screenshot, read the saved image file to understand the current screen state before deciding the next action.

### Perform Actions

Use actionSpace tools to interact with the device:

```bash
npx @midscene/ios Tap --locate '{"prompt":"the Settings icon"}'
npx @midscene/ios Input --locate '{"prompt":"search field"}' --content 'hello world'
npx @midscene/ios Scroll --direction down
npx @midscene/ios Swipe --locate '{"prompt":"the notification panel"}' --direction down
npx @midscene/ios KeyboardPress --value Enter
npx @midscene/ios LongPress --locate '{"prompt":"the message bubble"}'
npx @midscene/ios Launch --uri 'com.apple.Preferences'
```

### Natural Language Action

Use `act` to execute multi-step operations in a single command — useful for transient UI interactions:

```bash
npx @midscene/ios act --prompt "tap Delete, then confirm in the alert dialog"
```

### Disconnect

```bash
npx @midscene/ios disconnect
```

## Workflow Pattern

Since CLI commands are stateless between invocations, follow this pattern:

1. **Connect** to establish a session
2. **Take screenshot** to see the current state
3. **Analyze** the screenshot to decide the next action
4. **Execute action** (Tap, Input, Scroll, etc.)
5. **Take screenshot** again to verify the result
6. **Repeat** steps 3-5 until the task is complete
7. **Disconnect** when done

## Best Practices

1. **Take screenshots frequently**: Before and after each action to verify state changes.
2. **Describe UI elements clearly**: Use visible text labels, icons, or positional descriptions (e.g., `"the Settings icon in the top-right corner"` rather than vague references).
3. **Use JSON for locate parameter**: Always pass `--locate` as a JSON string with a `prompt` field describing the target element visually.
4. **Chain actions sequentially**: Execute one action at a time and verify the result before moving to the next step.
5. **Never run in background**: Every midscene command must run synchronously — background execution breaks the screenshot-analyze-act loop.

### Handle Transient UI

Action sheets, alerts, popup menus, and share sheets **disappear** between commands. When interacting with transient UI:

- **Use `act` for multi-step transient interactions** — it executes everything in a single process
- **Or execute commands rapidly in sequence** — do NOT take screenshots between steps
- **Do NOT pause to analyze** — run all commands for the transient interaction back-to-back
- Persistent UI (app screens, tab bars, navigation bars) is fine to interact with across separate commands

**Example — Alert dialog using `act` (recommended for transient UI):**

```bash
npx @midscene/ios act --prompt "tap the Delete button, then confirm in the alert dialog"
npx @midscene/ios take_screenshot
```

**Example — Alert dialog using individual commands (alternative):**

```bash
# Tap the button that triggers the alert, then interact with the alert back-to-back
npx @midscene/ios Tap --locate '{"prompt":"the Delete button"}'
npx @midscene/ios Tap --locate '{"prompt":"Confirm in the alert dialog"}'
# NOW take a screenshot to verify the result
npx @midscene/ios take_screenshot
```

## Troubleshooting

### WebDriverAgent Not Running
**Symptom:** Connection refused or timeout errors.
**Solution:**
- Ensure WebDriverAgent is installed and running on the device/simulator.
- For simulators: check that `http://localhost:8100/status` returns a valid response.
- See https://midscenejs.com/zh/usage-ios.html for setup instructions.

### Device Not Found
**Symptom:** No device detected or connection errors.
**Solution:**
- For physical devices: ensure the device is connected via USB and trusted.
- For simulators: verify a simulator is booted with `xcrun simctl list devices booted`.

### API Key Issues
**Symptom:** Authentication or model errors.
**Solution:**
- Check `.env` file contains `MIDSCENE_MODEL_API_KEY=<your-key>`.
- See https://midscenejs.com/zh/model-common-config.html for details.

## Safety Warning

AI-driven UI automation may produce unpredictable results. Please evaluate the risks carefully before use.
