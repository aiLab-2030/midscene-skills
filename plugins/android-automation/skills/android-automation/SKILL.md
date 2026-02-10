---
name: Android Device Automation
description: >
  AI-powered Android device automation using Midscene.
  Control Android devices with natural language commands via ADB.
  Perform taps, swipes, text input, app launches, screenshots, and more.
triggers:
  - android
  - phone
  - mobile app
  - tap
  - swipe
  - install app
  - open app on phone
  - android device
  - mobile automation
  - adb
  - launch app
  - mobile screen
allowed-tools:
  - Bash
---

# Android Device Automation

Automate Android devices using natural language through `npx @midscene/cli skill android <command>`. Powered by Midscene's AI visual understanding, this skill lets you interact with any Android device connected via ADB -- no element IDs or XPath selectors needed.

## Setup Verification

Before using this skill, verify the following prerequisites from `setup.json`:

1. **Node.js**: Run `node --version` to confirm Node.js >= 18.19.0 is installed.
2. **ADB**: Run `adb devices` to confirm ADB is installed and at least one device is listed.
3. **Device**: Ensure your Android device appears in `adb devices` output with status `device` (not `unauthorized` or `offline`).
4. **API Key**: Confirm the `MIDSCENE_MODEL_API_KEY` environment variable is set.

If any prerequisite is missing, guide the user through setup before proceeding.

## Available Commands

### Perform an Action

Execute a natural language action on the device:

```bash
npx @midscene/cli skill android act "<action description>"
```

Examples:
- `npx @midscene/cli skill android act "tap the Settings icon"`
- `npx @midscene/cli skill android act "swipe up to scroll down"`
- `npx @midscene/cli skill android act "type 'hello world' in the search field"`

### Query the Screen

Extract information from the current device screen:

```bash
npx @midscene/cli skill android query "<query description>"
```

Examples:
- `npx @midscene/cli skill android query "what is the battery percentage?"`
- `npx @midscene/cli skill android query "list all visible app names"`

### Assert Screen State

Verify a condition on the current screen:

```bash
npx @midscene/cli skill android assert "<condition>"
```

Examples:
- `npx @midscene/cli skill android assert "the Wi-Fi toggle is enabled"`
- `npx @midscene/cli skill android assert "the Settings app is open"`

### Take a Screenshot

Capture the current device screen:

```bash
npx @midscene/cli skill android screenshot
```

### Connect to Device

Connect to the default device:

```bash
npx @midscene/cli skill android connect
```

Connect to a specific device by ID:

```bash
npx @midscene/cli skill android connect --device <device-id>
```

Use `adb devices` to list available device IDs.

## Output Format

All commands return JSON with the following structure:

```json
{
  "success": true,
  "message": "Action completed successfully",
  "screenshot": "/path/to/screenshot.png",
  "result": {}
}
```

- **success**: Boolean indicating whether the command succeeded.
- **message**: Human-readable description of the outcome.
- **screenshot**: Path to a screenshot taken after the command executed (when available).
- **result**: Command-specific data (e.g., query results, assertion outcomes).

## Best Practices

1. **Describe UI elements clearly**: Use visible text labels, icons, or positional descriptions (e.g., "the search icon at the top right" rather than vague references).
2. **Take screenshots first**: Before performing complex actions, capture a screenshot to understand the current screen state. This helps you give more accurate instructions.
3. **Handle app launches explicitly**: Use `act` to open apps before interacting with them (e.g., `act "open the Chrome app"`).
4. **Wait for transitions**: After navigation actions (tapping a button that loads a new screen), take a screenshot to confirm the new screen has loaded before proceeding.
5. **Chain actions sequentially**: Execute one action at a time and verify the result before moving to the next step.
6. **Use assert for verification**: After completing a workflow, use `assert` to confirm the expected state rather than relying solely on screenshots.

## Common Patterns

### Open an App

```bash
npx @midscene/cli skill android act "open the Settings app"
```

### Navigate Through Menus

```bash
npx @midscene/cli skill android act "tap on 'Wi-Fi'"
npx @midscene/cli skill android act "tap on the network named 'MyNetwork'"
```

### Fill a Form

```bash
npx @midscene/cli skill android act "tap the username field"
npx @midscene/cli skill android act "type 'user@example.com'"
npx @midscene/cli skill android act "tap the password field"
npx @midscene/cli skill android act "type 'mypassword'"
npx @midscene/cli skill android act "tap the Login button"
```

### Verify Screen State

```bash
npx @midscene/cli skill android assert "the home screen is displayed"
npx @midscene/cli skill android query "what app is currently in the foreground?"
```

### Scroll and Find Content

```bash
npx @midscene/cli skill android act "swipe up to scroll down"
npx @midscene/cli skill android query "is there a 'About phone' option visible?"
```

## Troubleshooting

| Problem | Solution |
|---|---|
| **ADB not found** | Install Android SDK Platform Tools: `brew install android-platform-tools` (macOS) or download from [developer.android.com](https://developer.android.com/tools/releases/platform-tools). |
| **Device not listed** | Check USB connection, ensure USB debugging is enabled in Developer Options, and run `adb devices`. |
| **Device shows "unauthorized"** | Unlock the device and accept the USB debugging authorization prompt. Then run `adb devices` again. |
| **Device shows "offline"** | Disconnect and reconnect the USB cable. Run `adb kill-server && adb start-server`. |
| **Command timeout** | The device screen may be off or locked. Wake the device with `adb shell input keyevent KEYCODE_WAKEUP` and unlock it. |
| **API key error** | Verify `MIDSCENE_MODEL_API_KEY` is set: `echo $MIDSCENE_MODEL_API_KEY`. See [Model Configuration](https://midscenejs.com/zh/model-common-config.html). |
| **Wrong device targeted** | If multiple devices are connected, use `--device <id>` flag to specify the target device. |
