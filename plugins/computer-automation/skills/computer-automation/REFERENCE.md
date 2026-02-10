# Computer Automation Reference

Technical reference for the desktop computer automation skill powered by Midscene.

## CLI Architecture

This skill uses two Midscene packages working together:

- **@midscene/cli** -- The command-line interface that provides the `skill computer` subcommand. Installed automatically via `npx`.
- **@midscene/computer** -- The underlying desktop automation engine that handles screen capture, mouse/keyboard control, and AI-powered visual understanding.

When you run `npx @midscene/cli skill computer <command>`, the CLI delegates to `@midscene/computer` which:

1. Captures the current screen state
2. Sends the screenshot to the configured AI model for visual understanding
3. Determines the required mouse/keyboard actions
4. Executes the actions via macOS Accessibility APIs
5. Returns a JSON result with status and an updated screenshot

## Command Reference

### act

Perform a desktop action described in natural language.

```bash
npx @midscene/cli skill computer act "<action description>"
```

**Response format:**

```json
{
  "success": true,
  "message": "Performed action: click the Safari icon in the Dock",
  "screenshot": "/absolute/path/to/screenshot-after.png",
  "result": {
    "action": "click",
    "target": "Safari icon in the Dock",
    "coordinates": { "x": 512, "y": 768 }
  }
}
```

### query

Extract information from the current screen.

```bash
npx @midscene/cli skill computer query "<question>"
```

**Response format:**

```json
{
  "success": true,
  "message": "Query completed",
  "screenshot": "/absolute/path/to/screenshot.png",
  "result": {
    "answer": "The frontmost window title is 'Untitled - TextEdit'"
  }
}
```

### assert

Verify a condition about the current screen state.

```bash
npx @midscene/cli skill computer assert "<condition>"
```

**Response format (pass):**

```json
{
  "success": true,
  "message": "Assertion passed: Safari is the frontmost application",
  "screenshot": "/absolute/path/to/screenshot.png",
  "result": {
    "passed": true,
    "condition": "Safari is the frontmost application"
  }
}
```

**Response format (fail):**

```json
{
  "success": false,
  "message": "Assertion failed: Safari is the frontmost application",
  "screenshot": "/absolute/path/to/screenshot.png",
  "result": {
    "passed": false,
    "condition": "Safari is the frontmost application",
    "actual": "The frontmost application is Finder"
  }
}
```

### screenshot

Capture the current desktop screen.

```bash
npx @midscene/cli skill computer screenshot
```

**Response format:**

```json
{
  "success": true,
  "message": "Screenshot captured",
  "screenshot": "/absolute/path/to/screenshot.png",
  "result": {}
}
```

### connect

Connect to a display for automation. Must be called before other commands if you need to target a specific display.

```bash
# Connect to default display
npx @midscene/cli skill computer connect

# Connect to a specific display by ID
npx @midscene/cli skill computer connect --display <id>
```

**Response format:**

```json
{
  "success": true,
  "message": "Connected to display 1",
  "screenshot": "/absolute/path/to/screenshot.png",
  "result": {
    "displayId": 1,
    "resolution": { "width": 2560, "height": 1440 }
  }
}
```

### displays

List all available displays.

```bash
npx @midscene/cli skill computer displays
```

**Response format:**

```json
{
  "success": true,
  "message": "Found 2 displays",
  "screenshot": null,
  "result": {
    "displays": [
      { "id": 1, "name": "Built-in Retina Display", "resolution": { "width": 2560, "height": 1600 }, "primary": true },
      { "id": 2, "name": "External Display", "resolution": { "width": 3840, "height": 2160 }, "primary": false }
    ]
  }
}
```

## Display Management

### Multi-Display Setup

If you have multiple displays, use `displays` to list them and `connect` to target a specific one:

```bash
# List all displays
npx @midscene/cli skill computer displays

# Connect to the external monitor (display ID 2)
npx @midscene/cli skill computer connect --display 2

# Now all commands target display 2
npx @midscene/cli skill computer screenshot
npx @midscene/cli skill computer act "click on the desktop"
```

### Default Display

When no display is specified, the primary display is used. You can explicitly connect to it:

```bash
npx @midscene/cli skill computer connect
```

## macOS Accessibility Requirements

Desktop automation relies on macOS Accessibility APIs. Your terminal application must be granted Accessibility permission.

### Granting Permission

1. Open **System Settings** (or System Preferences on older macOS versions)
2. Navigate to **Privacy & Security > Accessibility**
3. Click the lock icon and authenticate
4. Click the **+** button to add your terminal app
5. Enable the toggle for your terminal app
6. **Restart your terminal app** after granting permission

### Supported Terminal Apps

- Terminal.app (built-in)
- iTerm2
- Warp
- Alacritty
- Hyper
- VS Code integrated terminal (add Visual Studio Code to Accessibility)

### Verifying Permission

If automation commands fail with a permission error, the terminal app does not have Accessibility access. Re-check System Settings and ensure the correct app is enabled.

## AI Model Configuration

The AI model is configured via environment variables. The model processes screenshots to understand screen content and determine actions.

### Required

| Variable | Description |
|---|---|
| `MIDSCENE_MODEL_API_KEY` | API key for the AI model provider |

### Optional

| Variable | Description | Default |
|---|---|---|
| `MIDSCENE_MODEL_NAME` | Model name to use | Provider default |
| `MIDSCENE_MODEL_BASE_URL` | Custom API endpoint URL | Provider default |

### Supported Providers

Any OpenAI-compatible API that supports vision models can be used. Common providers:

- **OpenAI**: `gpt-4o`, `gpt-4o-mini`
- **Azure OpenAI**: Configure with `MIDSCENE_MODEL_BASE_URL` pointing to your Azure endpoint
- **Other providers**: Any service with an OpenAI-compatible API and vision support

### Configuration Examples

```bash
# OpenAI
export MIDSCENE_MODEL_API_KEY="sk-..."

# OpenAI with specific model
export MIDSCENE_MODEL_API_KEY="sk-..."
export MIDSCENE_MODEL_NAME="gpt-4o"

# Azure OpenAI
export MIDSCENE_MODEL_API_KEY="your-azure-key"
export MIDSCENE_MODEL_BASE_URL="https://your-resource.openai.azure.com/openai/deployments/your-deployment"

# Custom provider
export MIDSCENE_MODEL_API_KEY="your-key"
export MIDSCENE_MODEL_BASE_URL="https://your-api-endpoint.com/v1"
export MIDSCENE_MODEL_NAME="your-model-name"
```

See [Model Configuration Documentation](https://midscenejs.com/zh/model-common-config.html) for the full list of supported options and providers.

## Screenshot Management

Screenshots are captured automatically by most commands and saved to the local filesystem. The `screenshot` field in the JSON response contains the absolute path to the image file.

### When Screenshots Are Captured

- **act**: A screenshot is taken after the action is performed
- **query**: A screenshot is taken of the screen that was analyzed
- **assert**: A screenshot is taken of the screen that was evaluated
- **screenshot**: Explicitly captures a screenshot
- **connect**: A screenshot is taken of the connected display
- **displays**: No screenshot is captured (returns `null`)

### Screenshot File Location

Screenshots are saved to the Midscene run directory, typically at:

```
./midscene_run/
```

The exact path is returned in the `screenshot` field of each command response.

## Troubleshooting

### "Accessibility permission denied" Error

**Cause**: The terminal app does not have macOS Accessibility permission.

**Fix**:
1. Open System Settings > Privacy & Security > Accessibility
2. Add and enable your terminal app
3. Restart the terminal app

### "xcode-select: error: command line tools are not installed" Error

**Cause**: Xcode Command Line Tools are not installed.

**Fix**:
```bash
xcode-select --install
```

### "MIDSCENE_MODEL_API_KEY is not set" Error

**Cause**: The AI model API key environment variable is missing.

**Fix**:
```bash
export MIDSCENE_MODEL_API_KEY=your-api-key
```

### Command Returns Success but Action Did Not Work

**Possible causes**:
- The target UI element was not visible on screen
- The AI misidentified the target element
- A dialog or overlay was blocking the element

**Fix**:
1. Run `screenshot` to check the current screen state
2. Use more specific action descriptions
3. Close any blocking dialogs or overlays
4. Break the action into smaller steps

### Slow Command Execution

**Possible causes**:
- Large screen resolution increases screenshot size and AI processing time
- Network latency to the AI model provider
- Complex screen content requiring more analysis

**Fix**:
- Use a faster AI model (e.g., `gpt-4o-mini`)
- Reduce screen resolution if possible
- Simplify the action description

### "Cannot find element" or "Element not visible"

**Possible causes**:
- The element is off-screen or hidden
- The element description is too vague
- The element is behind another window

**Fix**:
1. Take a screenshot to verify the element is visible
2. Provide more specific descriptions (include position, color, surrounding text)
3. Bring the target window to the front first
4. Scroll to make the element visible
