# iOS Automation Reference

Technical reference for the iOS device automation skill powered by Midscene.

---

## CLI Architecture

The iOS automation skill is built on three core components:

```
npx @midscene/cli skill ios <command>
        |
        v
  @midscene/cli          -- CLI entry point, parses commands
        |
        v
  @midscene/ios           -- iOS automation driver
        |
        v
  WebDriverAgent (WDA)    -- Runs on the iOS device/simulator, provides HTTP API
```

- **@midscene/cli**: The command-line interface that accepts natural language commands and orchestrates automation.
- **@midscene/ios**: The iOS-specific automation module that translates AI-driven instructions into WebDriverAgent API calls.
- **WebDriverAgent (WDA)**: A Facebook/Meta open-source project that runs on the iOS device or simulator, exposing a WebDriver-compatible HTTP API for UI automation.

---

## Command Reference

### act

Perform a natural language action on the device.

```bash
npx @midscene/cli skill ios act "<action>"
```

**Response:**
```json
{
  "success": true,
  "message": "Action performed: Tap the Settings icon",
  "screenshot": "/path/to/screenshot.png",
  "result": null
}
```

**Supported action types:**
- Tap / click on elements
- Type / input text
- Swipe (up, down, left, right)
- Scroll to find elements
- Press hardware buttons (Home, Back)
- Long press on elements

---

### query

Extract information from the current screen.

```bash
npx @midscene/cli skill ios query "<question>"
```

**Response:**
```json
{
  "success": true,
  "message": "Query completed",
  "screenshot": "/path/to/screenshot.png",
  "result": "The current page title is 'General Settings'"
}
```

The `result` field contains the AI-extracted answer. The format depends on the query -- it can be a string, a list, or structured information.

---

### assert

Verify a condition on the current screen.

```bash
npx @midscene/cli skill ios assert "<condition>"
```

**Response (pass):**
```json
{
  "success": true,
  "message": "Assertion passed: The Settings app is open",
  "screenshot": "/path/to/screenshot.png",
  "result": {
    "passed": true
  }
}
```

**Response (fail):**
```json
{
  "success": false,
  "message": "Assertion failed: The Settings app is open",
  "screenshot": "/path/to/screenshot.png",
  "result": {
    "passed": false
  }
}
```

---

### screenshot

Capture the current device screen.

```bash
npx @midscene/cli skill ios screenshot
```

**Response:**
```json
{
  "success": true,
  "message": "Screenshot captured successfully",
  "screenshot": "/path/to/screenshot.png",
  "result": null
}
```

---

### connect

Test the connection to the iOS device via WebDriverAgent.

```bash
npx @midscene/cli skill ios connect
```

**Response:**
```json
{
  "success": true,
  "message": "Connected to iOS device: iPhone 15 Pro (iOS 17.2)",
  "screenshot": null,
  "result": {
    "deviceName": "iPhone 15 Pro",
    "osVersion": "17.2",
    "wdaUrl": "http://localhost:8100"
  }
}
```

---

## WebDriverAgent Setup

WebDriverAgent (WDA) is the bridge between Midscene and the iOS device. It must be running before any automation commands can work.

### For iOS Simulator

1. Install Xcode from the Mac App Store.
2. Open a simulator: `xcrun simctl boot "iPhone 15 Pro"` (or use Xcode > Open Simulator).
3. Build and run WebDriverAgent on the simulator following the Midscene iOS documentation.
4. Verify WDA is running:
   ```bash
   curl http://localhost:8100/status
   ```

### For Physical iOS Device

1. Install Xcode and set up a valid provisioning profile.
2. Connect the device via USB and trust the computer.
3. Build and deploy WebDriverAgent to the device.
4. Set up USB port forwarding if needed (e.g., using `iproxy`):
   ```bash
   iproxy 8100 8100
   ```
5. Verify WDA is running:
   ```bash
   curl http://localhost:8100/status
   ```

### WDA Status Check

A healthy WDA response looks like:

```json
{
  "value": {
    "state": "success",
    "os": {
      "name": "iOS",
      "version": "17.2"
    },
    "ready": true
  }
}
```

For full setup instructions, see: https://midscenejs.com/zh/usage-ios.html

---

## AI Model Configuration

The AI model analyzes screenshots and determines how to interact with UI elements. Configure the model via environment variables.

### Required

| Variable | Description |
|---|---|
| `MIDSCENE_MODEL_API_KEY` | API key for the AI model service |

### Optional

| Variable | Description | Default |
|---|---|---|
| `MIDSCENE_MODEL_BASE_URL` | Custom API endpoint URL | (provider default) |
| `MIDSCENE_MODEL_NAME` | Specific model name to use | (provider default) |

### Configuration Example

```bash
# Using default provider
export MIDSCENE_MODEL_API_KEY=sk-your-api-key

# Using a custom endpoint
export MIDSCENE_MODEL_API_KEY=sk-your-api-key
export MIDSCENE_MODEL_BASE_URL=https://your-api-endpoint.com/v1
export MIDSCENE_MODEL_NAME=your-model-name
```

For full model configuration details, see: https://midscenejs.com/zh/model-common-config.html

---

## Screenshot Management

Screenshots are automatically captured after most commands and saved to the local filesystem.

- **Location**: Screenshots are saved in the current working directory or a Midscene-managed output directory.
- **Format**: PNG format.
- **Naming**: Includes timestamp for easy identification.
- **Usage**: The `screenshot` field in command responses contains the absolute path to the captured image.

Screenshots are essential for:
- Debugging failed actions or assertions.
- Understanding the current screen state before writing commands.
- Providing visual evidence of test results.

---

## Troubleshooting

### Connection Issues

| Problem | Cause | Solution |
|---|---|---|
| `Connection refused` | WDA is not running | Start WebDriverAgent on the device/simulator |
| `Timeout` | WDA is unresponsive | Restart WDA; check device is not locked or sleeping |
| `Device not found` | No booted simulator or connected device | Boot a simulator or connect a device via USB |

### Action Failures

| Problem | Cause | Solution |
|---|---|---|
| Wrong element tapped | Ambiguous description | Be more specific (include position, color, label) |
| Element not found | Element is off-screen | Scroll first, then retry the action |
| Keyboard not appearing | Input field not focused | Tap the input field explicitly before typing |
| Swipe not working | Incorrect direction or distance | Specify direction clearly (e.g., "swipe up from the center of the screen") |

### Environment Issues

| Problem | Cause | Solution |
|---|---|---|
| `MIDSCENE_MODEL_API_KEY not set` | Missing env variable | Run `export MIDSCENE_MODEL_API_KEY=your-key` |
| Model API errors | Invalid key or endpoint | Verify key and optional `BASE_URL` / `MODEL_NAME` |
| `xcodebuild` not found | Xcode not installed | Install Xcode from the Mac App Store |
| Simulator won't boot | Xcode CLI tools not set | Run `xcode-select --install` |

### Performance

- **Slow commands**: Check network latency to the AI model API. Local or nearby endpoints are faster.
- **WDA lag**: Restart WebDriverAgent if it becomes slow after long sessions.
- **Simulator performance**: Close unnecessary apps and allocate more system resources to the simulator.
