---
name: iOS Device Automation
description: |
  AI-powered iOS device automation using Midscene CLI. Control iOS devices and simulators
  with natural language commands via WebDriverAgent.
  Triggers: ios, iphone, ipad, ios app, tap on iphone, swipe, ios simulator, mobile app ios,
  ios device, ios testing, iphone automation, ipad automation, ios screen, ios navigate
allowed-tools:
  - Bash
---

# iOS Device Automation

Automate iOS devices and simulators using natural language through `npx @midscene/cli skill ios <command>`. This skill leverages Midscene's AI-powered visual understanding to interact with any iOS app without requiring accessibility IDs or XPath selectors.

## Setup Verification

Before running any commands, verify the following prerequisites:

1. **Node.js** (>= 18.19.0):
   ```bash
   node --version
   ```

2. **Xcode** installed:
   ```bash
   xcodebuild -version
   ```

3. **WebDriverAgent** running on the target iOS device or simulator. WebDriverAgent must be accessible at `http://<device-ip>:8100`. For simulators, this is typically `http://localhost:8100`.
   - Documentation: https://midscenejs.com/zh/usage-ios.html

4. **API Key** configured:
   ```bash
   echo $MIDSCENE_MODEL_API_KEY
   ```
   If not set, configure it:
   ```bash
   export MIDSCENE_MODEL_API_KEY=your-api-key
   ```
   See https://midscenejs.com/zh/model-common-config.html for model configuration options.

## Available Commands

### act - Perform an Action

Execute a natural language action on the iOS device (tap, swipe, type, scroll, etc.).

```bash
npx @midscene/cli skill ios act "<action description>"
```

**Examples:**
```bash
npx @midscene/cli skill ios act "Tap the Settings icon"
npx @midscene/cli skill ios act "Swipe up on the screen"
npx @midscene/cli skill ios act "Type 'hello world' in the search field"
npx @midscene/cli skill ios act "Scroll down to find the Privacy section"
```

### query - Extract Information

Extract information from the current screen using natural language.

```bash
npx @midscene/cli skill ios query "<query description>"
```

**Examples:**
```bash
npx @midscene/cli skill ios query "What is the current battery percentage?"
npx @midscene/cli skill ios query "What are all the visible app names on the home screen?"
npx @midscene/cli skill ios query "What is the title of the current page?"
```

### assert - Verify Screen State

Assert that a condition is true on the current screen. Returns success or failure with details.

```bash
npx @midscene/cli skill ios assert "<condition>"
```

**Examples:**
```bash
npx @midscene/cli skill ios assert "The Settings app is open"
npx @midscene/cli skill ios assert "The Wi-Fi toggle is turned on"
npx @midscene/cli skill ios assert "A search bar is visible at the top of the screen"
```

### screenshot - Capture Screen

Take a screenshot of the current device screen.

```bash
npx @midscene/cli skill ios screenshot
```

### connect - Connect to Device

Verify and establish connection to the iOS device via WebDriverAgent.

```bash
npx @midscene/cli skill ios connect
```

## Output Format

All commands return JSON output with the following structure:

```json
{
  "success": true,
  "message": "Action completed successfully",
  "screenshot": "/path/to/screenshot.png",
  "result": null
}
```

- **success**: `true` if the command executed without errors, `false` otherwise.
- **message**: A human-readable description of the outcome.
- **screenshot**: Path to the screenshot taken after the command executed (if applicable).
- **result**: Command-specific result data. For `query`, this contains the extracted information. For `assert`, this contains the assertion result. For `act` and `screenshot`, this is typically `null`.

## Best Practices

### Describe UI Elements Clearly
Use descriptive, visual language when referring to UI elements. The AI model identifies elements by their visual appearance on screen.

- **Good:** "Tap the blue 'Send' button at the bottom right"
- **Good:** "Tap the gear icon labeled 'Settings'"
- **Bad:** "Tap button #3"
- **Bad:** "Click the element with id=send-btn"

### Take Screenshots Before Complex Actions
Before performing multi-step workflows, take a screenshot first to understand the current screen state:

```bash
npx @midscene/cli skill ios screenshot
npx @midscene/cli skill ios act "Tap the first item in the list"
```

### Handle App State Transitions
iOS apps may have loading screens, animations, or transitions. Allow time for these to complete or verify the expected state:

```bash
npx @midscene/cli skill ios act "Tap the Login button"
# Wait briefly for navigation
sleep 2
npx @midscene/cli skill ios assert "The home screen is displayed"
```

### Use Assert for Verification
After performing actions, use `assert` to verify the expected outcome before proceeding:

```bash
npx @midscene/cli skill ios act "Toggle the Wi-Fi switch"
npx @midscene/cli skill ios assert "Wi-Fi is turned off"
```

## Common Patterns

### Open an App from Home Screen
```bash
npx @midscene/cli skill ios act "Press the Home button"
npx @midscene/cli skill ios act "Tap the Safari icon"
npx @midscene/cli skill ios assert "Safari is open"
```

### Navigate Within an App
```bash
npx @midscene/cli skill ios act "Tap the 'General' option in the Settings list"
npx @midscene/cli skill ios act "Tap the back button in the top left"
```

### Fill a Form
```bash
npx @midscene/cli skill ios act "Tap the Username text field"
npx @midscene/cli skill ios act "Type 'john@example.com'"
npx @midscene/cli skill ios act "Tap the Password text field"
npx @midscene/cli skill ios act "Type 'securepassword123'"
npx @midscene/cli skill ios act "Tap the Sign In button"
```

### Verify Screen Content
```bash
npx @midscene/cli skill ios query "What is the current page title?"
npx @midscene/cli skill ios assert "The profile page shows the username 'john'"
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
- Run `npx @midscene/cli skill ios connect` to diagnose connectivity.

### Actions Not Targeting the Right Element
**Symptom:** The AI taps or interacts with the wrong element.
**Solution:**
- Be more specific in your action descriptions (include color, position, label text).
- Take a screenshot first to understand what the AI sees.
- Break complex actions into smaller, more specific steps.

### Slow Response Times
**Symptom:** Commands take a long time to complete.
**Solution:**
- Check network connectivity to the AI model API.
- Ensure the device/simulator is not overloaded.
- Verify WebDriverAgent is responsive at its status endpoint.

### API Key Issues
**Symptom:** Authentication or model errors.
**Solution:**
- Verify `MIDSCENE_MODEL_API_KEY` is set correctly: `echo $MIDSCENE_MODEL_API_KEY`
- Check optional configuration: `MIDSCENE_MODEL_BASE_URL`, `MIDSCENE_MODEL_NAME`.
- See https://midscenejs.com/zh/model-common-config.html for details.
