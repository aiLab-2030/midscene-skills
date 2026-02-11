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

Automate Android devices using `npx @midscene/android`. Each CLI command maps directly to an MCP tool — you (the AI agent) act as the brain, deciding which actions to take based on screenshots.

## Setup Verification

Before using this skill, verify the following prerequisites:

1. **Node.js**: Run `node --version` to confirm Node.js >= 18.19.0 is installed.
2. **ADB**: Run `adb devices` to confirm ADB is installed and at least one device is listed.
3. **Device**: Ensure your Android device appears in `adb devices` output with status `device` (not `unauthorized` or `offline`).
4. **API Key**: Confirm the `MIDSCENE_MODEL_API_KEY` environment variable is set.

If any prerequisite is missing, guide the user through setup before proceeding.

## Command Discovery

First, run help to see all available commands:

```bash
npx @midscene/android --help
```

## Common Commands

### Connect to Device

```bash
npx @midscene/android connect
npx @midscene/android connect --deviceId emulator-5554
```

### Take Screenshot

```bash
npx @midscene/android take_screenshot
```

After taking a screenshot, read the saved image file to understand the current screen state before deciding the next action.

### Perform Actions

Use actionSpace tools to interact with the device. Each action uses `--locate` to describe which element to target:

```bash
npx @midscene/android Tap --locate '{"prompt":"the Settings icon"}'
npx @midscene/android Input --locate '{"prompt":"search field"}' --content 'hello world'
npx @midscene/android Scroll --direction down
npx @midscene/android Swipe --locate '{"prompt":"the notification panel"}' --direction down
npx @midscene/android KeyboardPress --value Enter
npx @midscene/android LongPress --locate '{"prompt":"the message bubble"}'
npx @midscene/android Launch --uri 'com.android.settings'
```

### Disconnect

```bash
npx @midscene/android disconnect
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
2. **Describe UI elements clearly**: Use visible text labels, icons, or positional descriptions in `--locate` prompts.
3. **Use JSON for locate parameter**: Always pass `--locate` as a JSON string with a `prompt` field describing the target element visually.
4. **Handle transient UI**: Popup menus, toasts, and bottom sheets may disappear. If you need to interact with transient UI, do it immediately after it appears.
5. **Chain actions sequentially**: Execute one action at a time and verify the result before moving to the next step.

## Troubleshooting

| Problem | Solution |
|---|---|
| **ADB not found** | Install Android SDK Platform Tools: `brew install android-platform-tools` (macOS) or download from [developer.android.com](https://developer.android.com/tools/releases/platform-tools). |
| **Device not listed** | Check USB connection, ensure USB debugging is enabled in Developer Options, and run `adb devices`. |
| **Device shows "unauthorized"** | Unlock the device and accept the USB debugging authorization prompt. Then run `adb devices` again. |
| **Device shows "offline"** | Disconnect and reconnect the USB cable. Run `adb kill-server && adb start-server`. |
| **Command timeout** | The device screen may be off or locked. Wake the device with `adb shell input keyevent KEYCODE_WAKEUP` and unlock it. |
| **API key error** | Verify `MIDSCENE_MODEL_API_KEY` is set: `echo $MIDSCENE_MODEL_API_KEY`. See [Model Configuration](https://midscenejs.com/zh/model-common-config.html). |
| **Wrong device targeted** | If multiple devices are connected, use `--deviceId <id>` flag with the `connect` command. |
