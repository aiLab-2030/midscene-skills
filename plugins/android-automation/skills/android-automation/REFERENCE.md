# Android Automation Reference

Technical reference for the Android device automation skill powered by Midscene.

---

## CLI Architecture

This skill uses two Midscene packages working together:

- **@midscene/cli**: The command-line interface that provides the `skill android` subcommand. Invoked via `npx` so no global installation is needed.
- **@midscene/android**: The underlying Android automation library that communicates with devices through ADB.

All commands follow the pattern:

```
npx @midscene/cli skill android <command> [options]
```

---

## Command Reference

### act

Perform a natural language action on the connected Android device.

```bash
npx @midscene/cli skill android act "<action description>"
```

**Response format**:

```json
{
  "success": true,
  "message": "Action performed: tap the Settings icon",
  "screenshot": "/path/to/screenshot.png",
  "result": {}
}
```

### query

Extract information from the current device screen using natural language.

```bash
npx @midscene/cli skill android query "<query description>"
```

**Response format**:

```json
{
  "success": true,
  "message": "Query completed",
  "screenshot": "/path/to/screenshot.png",
  "result": {
    "answer": "The battery level is 85%."
  }
}
```

### assert

Verify that a condition holds true on the current device screen.

```bash
npx @midscene/cli skill android assert "<condition>"
```

**Response format**:

```json
{
  "success": true,
  "message": "Assertion passed: the Wi-Fi toggle is enabled",
  "screenshot": "/path/to/screenshot.png",
  "result": {
    "passed": true
  }
}
```

When the assertion fails:

```json
{
  "success": false,
  "message": "Assertion failed: the Wi-Fi toggle is enabled",
  "screenshot": "/path/to/screenshot.png",
  "result": {
    "passed": false
  }
}
```

### screenshot

Capture the current device screen.

```bash
npx @midscene/cli skill android screenshot
```

**Response format**:

```json
{
  "success": true,
  "message": "Screenshot captured",
  "screenshot": "/path/to/screenshot.png"
}
```

### connect

Establish a connection to an Android device.

```bash
npx @midscene/cli skill android connect
npx @midscene/cli skill android connect --device <device-id>
```

**Response format**:

```json
{
  "success": true,
  "message": "Connected to device: Pixel_7_Pro (ABCD1234)",
  "result": {
    "deviceId": "ABCD1234",
    "deviceName": "Pixel_7_Pro"
  }
}
```

---

## Device Management

### Listing Connected Devices

Use ADB to see all connected devices:

```bash
adb devices
```

Sample output:

```
List of devices attached
ABCD1234    device
EFGH5678    device
```

The first column is the device ID. A status of `device` means it is ready for automation.

### Connecting to a Specific Device

When multiple devices are connected, use the `--device` flag to target a specific one:

```bash
npx @midscene/cli skill android connect --device ABCD1234
```

Subsequent commands will operate on the most recently connected device.

### Device States

| Status | Meaning |
|---|---|
| `device` | Connected and ready |
| `unauthorized` | USB debugging not authorized -- check the device for a confirmation dialog |
| `offline` | Device detected but not communicating -- try reconnecting |
| `no devices` | No devices found -- check USB cable and USB debugging setting |

---

## ADB Setup

### macOS

```bash
brew install android-platform-tools
```

### Linux

```bash
sudo apt install android-tools-adb
```

### Windows

Download [Android SDK Platform Tools](https://developer.android.com/tools/releases/platform-tools) and add the directory to your system PATH.

### Verify Installation

```bash
adb version
adb devices
```

### Enable USB Debugging on Your Device

1. Open **Settings** on the Android device.
2. Go to **About phone** (or **About tablet**).
3. Tap **Build number** seven times to enable Developer Options.
4. Go back to **Settings** > **Developer options**.
5. Enable **USB debugging**.
6. Connect the device via USB and accept the authorization prompt on the device.

---

## AI Model Configuration

The skill requires an AI model API key to process natural language commands and understand device screenshots.

### Required Environment Variable

```bash
export MIDSCENE_MODEL_API_KEY="your-api-key"
```

### Optional Environment Variables

```bash
# Custom model name
export MIDSCENE_MODEL_NAME="gpt-4o"

# Custom API base URL (for Azure, proxies, or self-hosted models)
export MIDSCENE_MODEL_BASE_URL="https://api.openai.com/v1"
```

### Documentation

For full model configuration options, see: [Model Configuration](https://midscenejs.com/zh/model-common-config.html)

---

## Screenshot Management

Screenshots are saved locally after each command that interacts with the device. The file path is returned in the `screenshot` field of the JSON response.

- Screenshots are stored in the current working directory or a configured output path.
- Use the screenshot path to display images or pass them to other tools for further analysis.
- Screenshots provide a visual record of each step, which is useful for debugging and verification.

---

## Troubleshooting

### ADB Not Found

**Symptom**: `adb: command not found`

**Solution**: Install ADB via one of the methods in the ADB Setup section above, then verify with `adb version`.

### Device Not Authorized

**Symptom**: `adb devices` shows device status as `unauthorized`.

**Solution**: Unlock the Android device. A dialog asking "Allow USB debugging?" should appear. Tap **Allow** (optionally check "Always allow from this computer"). Run `adb devices` again to confirm the status changes to `device`.

### Device Offline

**Symptom**: `adb devices` shows device status as `offline`.

**Solution**:

1. Disconnect and reconnect the USB cable.
2. Run `adb kill-server && adb start-server`.
3. Run `adb devices` to check the status.

### No Devices Found

**Symptom**: `adb devices` returns an empty list.

**Solution**:

1. Verify the USB cable supports data transfer (not charge-only).
2. Confirm USB debugging is enabled on the device.
3. Try a different USB port.
4. On some devices, change the USB connection mode to "File Transfer" or "MTP".

### Command Fails with Timeout

**Symptom**: A command hangs or returns a timeout error.

**Solution**:

1. Ensure the device screen is on: `adb shell input keyevent KEYCODE_WAKEUP`.
2. Unlock the device if the lock screen is active.
3. Check that the device is not in a dialog or popup that blocks interaction.

### API Key Errors

**Symptom**: Error message about missing or invalid API key.

**Solution**:

1. Verify the environment variable is set: `echo $MIDSCENE_MODEL_API_KEY`.
2. Ensure the key is valid and has not expired.
3. If using a custom endpoint, verify `MIDSCENE_MODEL_BASE_URL` is correct.

### Multiple Devices Conflict

**Symptom**: Commands fail with "more than one device" error.

**Solution**: Specify the target device explicitly:

```bash
npx @midscene/cli skill android connect --device <device-id>
```

Use `adb devices` to find the correct device ID.
