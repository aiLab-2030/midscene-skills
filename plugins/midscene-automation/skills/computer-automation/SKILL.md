---
name: Desktop Computer Automation
description: |
  AI-powered desktop automation using Midscene. Control your entire macOS desktop with natural language commands.
  Triggers: open app, press key, desktop, computer, click on screen, type text, open Spotlight, screenshot desktop,
  launch application, switch window, desktop automation, control computer, mouse click, keyboard shortcut,
  screen capture, find on screen, read screen, verify window, close app, minimize window, maximize window
allowed-tools:
  - Bash
---

# Desktop Computer Automation

Control your entire macOS desktop using `npx @midscene/computer`. Each CLI command maps directly to an MCP tool — you (the AI agent) act as the brain, deciding which actions to take based on screenshots.

## Setup Verification

Before using this skill, verify the following prerequisites:

### 1. Node.js

```bash
node --version
```

Requires Node.js >= 18.19.0.

### 2. macOS Accessibility Permission

Your terminal app must have Accessibility permission enabled:

- Open **System Settings > Privacy & Security > Accessibility**
- Enable your terminal app (Terminal, iTerm2, Warp, etc.)

### 3. Xcode Command Line Tools

```bash
xcode-select -p
```

If not installed, run:

```bash
xcode-select --install
```

### 4. AI Model API Key

```bash
echo $MIDSCENE_MODEL_API_KEY
```

See [Model Configuration](https://midscenejs.com/zh/model-common-config.html) for all supported providers and options.

## Command Discovery

First, run help to see all available commands:

```bash
npx @midscene/computer --help
```

## Common Commands

### Connect to Desktop

```bash
npx @midscene/computer connect
npx @midscene/computer connect --displayId <id>
```

### List Displays

```bash
npx @midscene/computer list_displays
```

### Take Screenshot

```bash
npx @midscene/computer take_screenshot
```

After taking a screenshot, read the saved image file to understand the current screen state before deciding the next action.

### Perform Actions

Use actionSpace tools to interact with the desktop:

```bash
npx @midscene/computer Tap --locate '{"prompt":"the Safari icon in the Dock"}'
npx @midscene/computer DoubleClick --locate '{"prompt":"the Documents folder"}'
npx @midscene/computer RightClick --locate '{"prompt":"the desktop background"}'
npx @midscene/computer Input --locate '{"prompt":"the search field"}' --content 'hello world'
npx @midscene/computer Scroll --direction down
npx @midscene/computer KeyboardPress --value 'Command+Space'
npx @midscene/computer DragAndDrop --locate '{"prompt":"the file icon"}' --target '{"prompt":"the Trash icon"}'
```

### Disconnect

```bash
npx @midscene/computer disconnect
```

## Workflow Pattern

Since CLI commands are stateless between invocations, follow this pattern:

1. **Connect** to establish a session
2. **Take screenshot** to see the current state
3. **Analyze** the screenshot to decide the next action
4. **Execute action** (Tap, Input, KeyboardPress, etc.)
5. **Take screenshot** again to verify the result
6. **Repeat** steps 3-5 until the task is complete
7. **Disconnect** when done

## Best Practices

1. **Take screenshots frequently**: Before and after each action to verify state changes.
2. **Use keyboard shortcuts for reliability**: `KeyboardPress --value 'Command+C'` is often more reliable than clicking UI elements.
3. **Combine transient UI interactions**: Spotlight, context menus, and dropdown menus disappear between commands. For Spotlight: combine the keyboard shortcut, typing, and Enter into rapid sequential commands.
4. **Describe locations when possible**: Help target elements by describing their position (e.g., "the icon in the top-right corner of the menu bar").

## Common Patterns

### Open an Application via Spotlight

**IMPORTANT:** Spotlight closes when it loses focus. Execute the Spotlight → type → Enter sequence rapidly:

```bash
npx @midscene/computer KeyboardPress --value 'Command+Space'
npx @midscene/computer Input --locate '{"prompt":"Spotlight search field"}' --content 'Visual Studio Code'
npx @midscene/computer KeyboardPress --value Enter
```

### Window Management

```bash
npx @midscene/computer KeyboardPress --value 'Command+M'
npx @midscene/computer KeyboardPress --value 'Command+W'
npx @midscene/computer KeyboardPress --value 'Command+Q'
npx @midscene/computer KeyboardPress --value 'Command+Tab'
```

## Troubleshooting

### Accessibility Permission Denied
Your terminal app does not have Accessibility access:
1. Open **System Settings > Privacy & Security > Accessibility**
2. Add your terminal app and enable it
3. Restart your terminal app after granting permission

### Xcode Command Line Tools Not Found
```bash
xcode-select --install
```

### API Key Not Set
```bash
export MIDSCENE_MODEL_API_KEY=your-api-key
```

### AI Cannot Find the Element
1. Take a screenshot to verify the element is actually visible
2. Use more specific descriptions (include color, position, surrounding text)
3. Ensure the element is not hidden behind another window
