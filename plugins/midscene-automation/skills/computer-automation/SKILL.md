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

Control your entire macOS desktop with natural language using `npx @midscene/cli@1.3.11-beta-20260211031343.0 do <command> -p computer`. Perform clicks, type text, take screenshots, run keyboard shortcuts, and automate multi-step desktop workflows -- all powered by AI visual understanding.

## Setup Verification

Before using this skill, verify the following prerequisites:

### 1. Node.js

```bash
node --version
```

Requires Node.js >= 18.19.0. The `npx` command will automatically download `@midscene/cli` on first use.

### 2. macOS Accessibility Permission

Your terminal app must have Accessibility permission enabled:

- Open **System Settings > Privacy & Security > Accessibility**
- Enable your terminal app (Terminal, iTerm2, Warp, etc.)

Without this permission, desktop automation commands will fail with a permissions error.

### 3. Xcode Command Line Tools

```bash
xcode-select -p
```

If not installed, run:

```bash
xcode-select --install
```

Required for screenshot capabilities on macOS.

### 4. AI Model API Key

Ensure `MIDSCENE_MODEL_API_KEY` is set in your environment:

```bash
echo $MIDSCENE_MODEL_API_KEY
```

If not configured, set it:

```bash
export MIDSCENE_MODEL_API_KEY=your-api-key
```

Optional configuration for custom models:

```bash
export MIDSCENE_MODEL_NAME="gpt-4o"
export MIDSCENE_MODEL_BASE_URL="https://api.openai.com/v1"
```

See [Model Configuration](https://midscenejs.com/zh/model-common-config.html) for all supported providers and options.

## Available Commands

All commands follow the pattern: `npx @midscene/cli@1.3.11-beta-20260211031343.0 do <command> -p computer`

### act -- Perform a Desktop Action

Execute a natural language action on the desktop. The AI interprets your intent and performs the corresponding mouse/keyboard operations.

```bash
npx @midscene/cli@1.3.11-beta-20260211031343.0 do act -p computer "<action description>"
```

Examples:

```bash
npx @midscene/cli@1.3.11-beta-20260211031343.0 do act -p computer "click the Safari icon in the Dock"
npx @midscene/cli@1.3.11-beta-20260211031343.0 do act -p computer "type 'Hello World' in the text field"
npx @midscene/cli@1.3.11-beta-20260211031343.0 do act -p computer "press Command+Space to open Spotlight"
npx @midscene/cli@1.3.11-beta-20260211031343.0 do act -p computer "double-click the Documents folder on the desktop"
```

### query -- Extract Information from the Screen

Ask a question about the current screen content. Returns structured data extracted by the AI.

```bash
npx @midscene/cli@1.3.11-beta-20260211031343.0 do query -p computer "<question>"
```

Examples:

```bash
npx @midscene/cli@1.3.11-beta-20260211031343.0 do query -p computer "what is the title of the frontmost window?"
npx @midscene/cli@1.3.11-beta-20260211031343.0 do query -p computer "list all visible application names in the Dock"
npx @midscene/cli@1.3.11-beta-20260211031343.0 do query -p computer "what text is shown in the notification?"
```

### assert -- Verify Screen State

Assert a condition about the current screen. Returns success or failure with details.

```bash
npx @midscene/cli@1.3.11-beta-20260211031343.0 do assert -p computer "<condition>"
```

Examples:

```bash
npx @midscene/cli@1.3.11-beta-20260211031343.0 do assert -p computer "Safari is the frontmost application"
npx @midscene/cli@1.3.11-beta-20260211031343.0 do assert -p computer "the file 'report.pdf' is visible in Finder"
npx @midscene/cli@1.3.11-beta-20260211031343.0 do assert -p computer "the menu bar shows Wi-Fi is connected"
```

### screenshot -- Capture the Desktop

Take a screenshot of the current desktop state.

```bash
npx @midscene/cli@1.3.11-beta-20260211031343.0 do screenshot -p computer
```

### connect -- Connect to a Display

Connect to the default display for automation.

```bash
npx @midscene/cli@1.3.11-beta-20260211031343.0 connect -p computer
```

Connect to a specific display by ID:

```bash
npx @midscene/cli@1.3.11-beta-20260211031343.0 connect -p computer --display <id>
```

## Output Format

All commands return JSON output with the following structure:

```json
{
  "success": true,
  "message": "Action completed successfully",
  "screenshot": "/path/to/screenshot.png",
  "result": {}
}
```

- **success**: `true` if the command completed without errors, `false` otherwise
- **message**: Human-readable description of what happened
- **screenshot**: Path to a screenshot taken after the command executed (if applicable)
- **result**: Command-specific result data (e.g., extracted text from `query`, assertion details from `assert`)

When a command fails, the output includes error details:

```json
{
  "success": false,
  "message": "Error description",
  "screenshot": "/path/to/screenshot.png",
  "result": null
}
```

## Best Practices

### Be Specific About UI Elements

Instead of vague descriptions, provide clear, specific details about what to interact with:

- **Good**: `"click the red close button in the top-left corner of the Safari window"`
- **Bad**: `"close the window"`
- **Good**: `"type 'meeting notes' in the search field at the top of the Finder window"`
- **Bad**: `"search for meeting notes"`

### Take Screenshots to Verify State

Always take a screenshot before and after critical actions to confirm the expected result:

1. Run `screenshot` to see the current state
2. Run `act` to perform the action
3. Run `screenshot` or `assert` to verify the result

### Describe Locations When Possible

Help the AI locate elements by describing their position on screen:

- `"click the icon in the top-right corner of the menu bar"`
- `"the text field in the center of the dialog"`
- `"the third item in the left sidebar"`

### Combine Transient UI Interactions

Transient UI elements (Spotlight, context menus, dropdown menus, notification popups) **disappear** between commands. Always combine all interactions with transient UI into a single `act`:

- **Good**: `"press Command+Space, type 'Safari', press Enter"`
- **Bad**: Three separate commands for Spotlight → type → Enter (Spotlight disappears between them)

Persistent UI (app windows, Finder) is fine to interact with across separate commands.

### Use Keyboard Shortcuts for Reliability

Keyboard shortcuts are often more reliable than clicking UI elements:

```bash
npx @midscene/cli@1.3.11-beta-20260211031343.0 do act -p computer "press Command+C to copy"
npx @midscene/cli@1.3.11-beta-20260211031343.0 do act -p computer "press Command+V to paste"
npx @midscene/cli@1.3.11-beta-20260211031343.0 do act -p computer "press Command+Tab to switch application"
```

## Common Patterns

### Open an Application via Spotlight

**IMPORTANT:** Spotlight closes when it loses focus. Since each command runs in a separate process, you MUST combine the Spotlight workflow into a single `act` command:

```bash
npx @midscene/cli@1.3.11-beta-20260211031343.0 do act -p computer "press Command+Space to open Spotlight, type 'Visual Studio Code', then press Enter"
```

Do NOT split Spotlight interactions into multiple commands — Spotlight will close between commands when the terminal regains focus.

### Keyboard Shortcuts

```bash
npx @midscene/cli@1.3.11-beta-20260211031343.0 do act -p computer "press Command+A to select all"
npx @midscene/cli@1.3.11-beta-20260211031343.0 do act -p computer "press Command+C to copy"
npx @midscene/cli@1.3.11-beta-20260211031343.0 do act -p computer "press Command+V to paste"
npx @midscene/cli@1.3.11-beta-20260211031343.0 do act -p computer "press Command+Z to undo"
npx @midscene/cli@1.3.11-beta-20260211031343.0 do act -p computer "press Command+Shift+3 to take a system screenshot"
```

### Multi-step Workflow

```bash
# Open Terminal via Spotlight (combined into one command)
npx @midscene/cli@1.3.11-beta-20260211031343.0 do act -p computer "press Command+Space to open Spotlight, type 'Terminal', then press Enter"

# Verify Terminal opened
npx @midscene/cli@1.3.11-beta-20260211031343.0 do assert -p computer "Terminal window is visible"

# Type a command and run it
npx @midscene/cli@1.3.11-beta-20260211031343.0 do act -p computer "type 'ls -la' in the Terminal window and press Enter"

# Check the output
npx @midscene/cli@1.3.11-beta-20260211031343.0 do query -p computer "what files are listed in the Terminal output?"
```

### Window Management

```bash
npx @midscene/cli@1.3.11-beta-20260211031343.0 do act -p computer "press Command+M to minimize the current window"
npx @midscene/cli@1.3.11-beta-20260211031343.0 do act -p computer "press Command+W to close the current tab"
npx @midscene/cli@1.3.11-beta-20260211031343.0 do act -p computer "press Command+Q to quit the current application"
npx @midscene/cli@1.3.11-beta-20260211031343.0 do act -p computer "press Command+Tab to switch to the next application"
```

## Troubleshooting

### Accessibility Permission Denied

If you see a permissions error, your terminal app does not have Accessibility access:

1. Open **System Settings > Privacy & Security > Accessibility**
2. Click the lock icon to make changes
3. Add your terminal app (Terminal, iTerm2, Warp, etc.) and enable it
4. Restart your terminal app after granting permission

### Xcode Command Line Tools Not Found

If screenshot commands fail:

```bash
xcode-select --install
```

Follow the system prompt to install, then retry.

### API Key Not Set

If you see an authentication error:

```bash
export MIDSCENE_MODEL_API_KEY=your-api-key
```

Verify it is set:

```bash
echo $MIDSCENE_MODEL_API_KEY
```

### Command Timeout

Desktop automation commands may take longer than typical CLI operations. If a command times out:

- Simplify the action description
- Break complex actions into smaller steps
- Ensure the target UI element is visible on screen before acting on it

### AI Cannot Find the Element

If the AI reports it cannot find a UI element:

1. Take a screenshot to verify the element is actually visible
2. Use more specific descriptions (include color, position, surrounding text)
3. Ensure the element is not hidden behind another window
4. Try scrolling to make the element visible first
