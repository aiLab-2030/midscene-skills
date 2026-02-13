---
name: Desktop Computer Automation
description: |
  Vision-driven desktop automation using Midscene. Control your desktop (macOS, Windows, Linux) with natural language commands.
  Operates entirely from screenshots — no DOM or accessibility labels required. Can interact with all visible elements on screen regardless of technology stack.

  Triggers: open app, press key, desktop, computer, click on screen, type text, screenshot desktop,
  launch application, switch window, desktop automation, control computer, mouse click, keyboard shortcut,
  screen capture, find on screen, read screen, verify window, close app, minimize window, maximize window

  Powered by Midscene.js (https://midscenejs.com)
allowed-tools:
  - Bash
---

# Desktop Computer Automation

> **CRITICAL RULES — VIOLATIONS WILL BREAK THE WORKFLOW:**
>
> 1. **Never run midscene commands in the background.** Each command must run synchronously so you can read its output (especially screenshots) before deciding the next action. Background execution breaks the screenshot-analyze-act loop.
> 2. **Run only one midscene command at a time.** Wait for the previous command to finish, read the screenshot, then decide the next action. Never chain multiple commands together.
> 3. **Allow enough time for each command to complete.** Midscene commands involve AI inference and screen interaction, which can take longer than typical shell commands. A typical command needs about 1 minute; `act` commands with multi-step operations may need even longer.

Control your desktop (macOS, Windows, Linux) using `npx @midscene/computer@1`. Each CLI command maps directly to an MCP tool — you (the AI agent) act as the brain, deciding which actions to take based on screenshots.

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

### Connect to Desktop

```bash
npx @midscene/computer@1 connect
npx @midscene/computer@1 connect --displayId <id>
```

### List Displays

```bash
npx @midscene/computer@1 list_displays
```

### Take Screenshot

```bash
npx @midscene/computer@1 take_screenshot
```

After taking a screenshot, read the saved image file to understand the current screen state before deciding the next action.

### Perform Actions

Use actionSpace tools to interact with the desktop:

```bash
npx @midscene/computer@1 tap --locate '{"prompt":"the Safari icon in the Dock"}'
npx @midscene/computer@1 doubleClick --locate '{"prompt":"the Documents folder"}'
npx @midscene/computer@1 rightClick --locate '{"prompt":"the desktop background"}'
npx @midscene/computer@1 input --locate '{"prompt":"the search field"}' --content 'hello world'
npx @midscene/computer@1 scroll --direction down
npx @midscene/computer@1 keyboardPress --value 'Command+Space'
npx @midscene/computer@1 dragAndDrop --locate '{"prompt":"the file icon"}' --target '{"prompt":"the Trash icon"}'
```

### Natural Language Action

Use `act` to execute multi-step operations in a single command — useful for transient UI interactions like Spotlight:

```bash
npx @midscene/computer@1 act --prompt "press Command+Space, type Safari, press Enter"
```

### Disconnect

```bash
npx @midscene/computer@1 disconnect
```

## Workflow Pattern

Since CLI commands are stateless between invocations, follow this pattern:

1. **Connect** to establish a session
2. **Take screenshot** to see the current state
3. **Analyze** the screenshot to decide the next action
4. **Execute action** (tap, input, keyboardPress, etc.)
5. **Take screenshot** again to verify the result
6. **Repeat** steps 3-5 until the task is complete
7. **Disconnect** when done

## Best Practices

1. **Prefer shell commands to launch apps**: Use `open -a <AppName>` (macOS), `start <AppName>` (Windows), or `xdg-open` (Linux) to launch applications instead of midscene, as shell commands are significantly faster.
2. **Take screenshots frequently**: Before and after each action to verify state changes.
3. **Use keyboard shortcuts for reliability**: `keyboardPress --value 'Command+C'` is often more reliable than clicking UI elements.
4. **Be specific about UI elements**: Instead of vague descriptions, provide clear, specific details. Say `"the red close button in the top-left corner of the Safari window"` instead of `"the close button"`.
5. **Describe locations when possible**: Help target elements by describing their position (e.g., `"the icon in the top-right corner of the menu bar"`, `"the third item in the left sidebar"`).
6. **Never run in background**: Every midscene command must run synchronously — background execution breaks the screenshot-analyze-act loop.
7. **Check for multiple displays**: If you launched an app but cannot see it on the screenshot, the app window may have opened on a different display. Use `list_displays` to check available displays. You have two options: either move the app window to the current display, or use `connect --displayId <id>` to switch to the display where the app is.

### Handle Transient UI — MUST Use `act`

Each CLI command runs as a **separate process**. When a process exits, the OS may return focus to the terminal, which can dismiss transient UI (app launchers, context menus, dropdown menus, notification popups, etc.). This means **individual commands like `keyboardPress` → `input` will NEVER work for transient UI** — the UI disappears between commands.

**You MUST use `act` for ANY interaction that involves transient UI.** The `act` command executes all steps within a single process, keeping focus intact — just like `agent.aiAct()` in JavaScript.

- Persistent UI (app windows, file managers, taskbars/docks) is fine to interact with across separate commands with screenshots in between

**Example — Open an app via launcher (macOS Spotlight / Windows Start / Linux app menu):**

```bash
npx @midscene/computer@1 act --prompt "open the app launcher, type Visual Studio Code, press Enter"
npx @midscene/computer@1 take_screenshot
```

**Example — Context menu interaction:**

```bash
npx @midscene/computer@1 act --prompt "right-click the file icon, then click Delete in the context menu"
npx @midscene/computer@1 take_screenshot
```

**Example — Dropdown menu:**

```bash
npx @midscene/computer@1 act --prompt "click the File menu, then click New Window"
npx @midscene/computer@1 take_screenshot
```

## Common Patterns

### Open an Application via Launcher

**MUST use `act`** — the launcher dismisses when the CLI process exits, so individual commands will always fail.

```bash
# macOS
npx @midscene/computer@1 act --prompt "press Command+Space, type Visual Studio Code, press Enter"
# Windows
npx @midscene/computer@1 act --prompt "press the Windows key, type Visual Studio Code, press Enter"
# Linux (varies by DE)
npx @midscene/computer@1 act --prompt "open the application menu, type Visual Studio Code, press Enter"
npx @midscene/computer@1 take_screenshot
```

### Keyboard Shortcuts

```bash
# macOS uses Command, Windows/Linux use Ctrl
npx @midscene/computer@1 keyboardPress --value 'Command+C'
npx @midscene/computer@1 keyboardPress --value 'Ctrl+C'
```

### Window Management

```bash
# macOS
npx @midscene/computer@1 keyboardPress --value 'Command+W'
npx @midscene/computer@1 keyboardPress --value 'Command+Tab'
# Windows/Linux
npx @midscene/computer@1 keyboardPress --value 'Alt+F4'
npx @midscene/computer@1 keyboardPress --value 'Alt+Tab'
```

## Troubleshooting

### macOS: Accessibility Permission Denied
Your terminal app does not have Accessibility access:
1. Open **System Settings > Privacy & Security > Accessibility**
2. Add your terminal app and enable it
3. Restart your terminal app after granting permission

### macOS: Xcode Command Line Tools Not Found
```bash
xcode-select --install
```

### API Key Not Set
Check `.env` file contains `MIDSCENE_MODEL_API_KEY=<your-key>`.

### AI Cannot Find the Element
1. Take a screenshot to verify the element is actually visible
2. Use more specific descriptions (include color, position, surrounding text)
3. Ensure the element is not hidden behind another window