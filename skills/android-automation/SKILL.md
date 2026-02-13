---
name: Android Device Automation
description: >
  Vision-driven Android device automation using Midscene.
  Operates entirely from screenshots — no DOM or accessibility labels required. Can interact with all visible elements on screen regardless of technology stack.
  Control Android devices with natural language commands via ADB.
  Perform taps, swipes, text input, app launches, screenshots, and more.
  
  Trigger keywords: android, phone, mobile app, tap, swipe, install app, open app on phone, android device, mobile automation, adb, launch app, mobile screen

  Powered by Midscene.js (https://midscenejs.com)
allowed-tools:
  - Bash
---

# Android Device Automation

> **CRITICAL RULES — VIOLATIONS WILL BREAK THE WORKFLOW:**
>
> 1. **Never run midscene commands in the background.** Each command must run synchronously so you can read its output (especially screenshots) before deciding the next action. Background execution breaks the screenshot-analyze-act loop.
> 2. **Run only one midscene command at a time.** Wait for the previous command to finish, read the screenshot, then decide the next action. Never chain multiple commands together.
> 3. **Allow enough time for each command to complete.** Midscene commands involve AI inference and screen interaction, which can take longer than typical shell commands. A typical command needs about 1 minute; `act` commands with multi-step operations may need even longer.

Automate Android devices using `npx @midscene/android@1`. Each CLI command maps directly to an MCP tool — you (the AI agent) act as the brain, deciding which actions to take based on screenshots.

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
npx @midscene/android@1 connect
npx @midscene/android@1 connect --deviceId emulator-5554
```

### Take Screenshot

```bash
npx @midscene/android@1 take_screenshot
```

After taking a screenshot, read the saved image file to understand the current screen state before deciding the next action.

### Perform Actions

Use actionSpace tools to interact with the device. Each action uses `--locate` to describe which element to target:

```bash
npx @midscene/android@1 tap --locate '{"prompt":"the Settings icon"}'
npx @midscene/android@1 input --locate '{"prompt":"search field"}' --content 'hello world'
npx @midscene/android@1 scroll --direction down
npx @midscene/android@1 swipe --locate '{"prompt":"the notification panel"}' --direction down
npx @midscene/android@1 keyboardPress --value Enter
npx @midscene/android@1 longPress --locate '{"prompt":"the message bubble"}'
npx @midscene/android@1 launch --uri 'com.android.settings'
```

### Natural Language Action

Use `act` to execute multi-step operations in a single command — useful for transient UI interactions:

```bash
npx @midscene/android@1 act --prompt "long press the message, then tap Delete in the popup menu"
```

### Disconnect

```bash
npx @midscene/android@1 disconnect
```

## Workflow Pattern

Since CLI commands are stateless between invocations, follow this pattern:

1. **Connect** to establish a session
2. **Take screenshot** to see the current state
3. **Analyze** the screenshot to decide the next action
4. **Execute action** (tap, input, scroll, etc.)
5. **Take screenshot** again to verify the result
6. **Repeat** steps 3-5 until the task is complete
7. **Disconnect** when done

## Best Practices

1. **Prefer ADB to launch apps**: Use `adb shell am start` to launch applications instead of midscene, as ADB commands are significantly faster.
2. **Take screenshots frequently**: Before and after each action to verify state changes.
3. **Describe UI elements clearly**: Use visible text labels, icons, or positional descriptions (e.g., `"the search icon at the top right"` rather than vague references).
4. **Use JSON for locate parameter**: Always pass `--locate` as a JSON string with a `prompt` field describing the target element visually.
5. **Chain actions sequentially**: Execute one action at a time and verify the result before moving to the next step.
6. **Never run in background**: Every midscene command must run synchronously — background execution breaks the screenshot-analyze-act loop.

### Handle Transient UI

Popup menus, toasts, bottom sheets, and snackbars **disappear** between commands. When interacting with transient UI:

- **Use `act` for multi-step transient interactions** — it executes everything in a single process
- **Or execute commands rapidly in sequence** — do NOT take screenshots between steps
- **Do NOT pause to analyze** — run all commands for the transient interaction back-to-back
- Persistent UI (app screens, navigation drawers that stay open) is fine to interact with across separate commands

**Example — Long press popup menu using `act` (recommended for transient UI):**

```bash
npx @midscene/android@1 act --prompt "long press the message bubble, then tap Delete in the popup menu"
npx @midscene/android@1 take_screenshot
```

**Example — Long press popup menu using individual commands (alternative):**

```bash
# These commands must be run back-to-back WITHOUT screenshots in between
npx @midscene/android@1 longPress --locate '{"prompt":"the message bubble"}'
npx @midscene/android@1 tap --locate '{"prompt":"Delete option in the popup menu"}'
# NOW take a screenshot to verify the result
npx @midscene/android@1 take_screenshot
```

## Troubleshooting

| Problem | Solution |
|---|---|
| **ADB not found** | Install Android SDK Platform Tools: `brew install android-platform-tools` (macOS) or download from [developer.android.com](https://developer.android.com/tools/releases/platform-tools). |
| **Device not listed** | Check USB connection, ensure USB debugging is enabled in Developer Options, and run `adb devices`. |
| **Device shows "unauthorized"** | Unlock the device and accept the USB debugging authorization prompt. Then run `adb devices` again. |
| **Device shows "offline"** | Disconnect and reconnect the USB cable. Run `adb kill-server && adb start-server`. |
| **Command timeout** | The device screen may be off or locked. Wake the device with `adb shell input keyevent KEYCODE_WAKEUP` and unlock it. |
| **API key error** | Check `.env` file contains `MIDSCENE_MODEL_API_KEY=<your-key>`. See [Model Configuration](https://midscenejs.com/zh/model-common-config.html). |
| **Wrong device targeted** | If multiple devices are connected, use `--deviceId <id>` flag with the `connect` command. |