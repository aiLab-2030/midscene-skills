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

Automate iOS devices and simulators using `npx @midscene/ios`. Each CLI command maps directly to an MCP tool — you (the AI agent) act as the brain, deciding which actions to take based on screenshots.

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

## Command Discovery

First, run help to see all available commands:

```bash
npx @midscene/ios --help
```

## Common Commands

### Connect to Device

```bash
npx @midscene/ios connect
```

### Take Screenshot

```bash
npx @midscene/ios take_screenshot
```

After taking a screenshot, read the saved image file to understand the current screen state before deciding the next action.

### Perform Actions

Use actionSpace tools to interact with the device:

```bash
npx @midscene/ios Tap --locate '{"prompt":"the Settings icon"}'
npx @midscene/ios Input --locate '{"prompt":"search field"}' --content 'hello world'
npx @midscene/ios Scroll --direction down
npx @midscene/ios Swipe --locate '{"prompt":"the notification panel"}' --direction down
npx @midscene/ios KeyboardPress --value Enter
npx @midscene/ios LongPress --locate '{"prompt":"the message bubble"}'
npx @midscene/ios Launch --uri 'com.apple.Preferences'
```

### Disconnect

```bash
npx @midscene/ios disconnect
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
4. **Handle transient UI**: Action sheets, alerts, and popup menus may disappear. If you need to interact with transient UI, do it immediately after it appears.
5. **Chain actions sequentially**: Execute one action at a time and verify the result before moving to the next step.

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

### API Key Issues
**Symptom:** Authentication or model errors.
**Solution:**
- Verify `MIDSCENE_MODEL_API_KEY` is set correctly: `echo $MIDSCENE_MODEL_API_KEY`
- See https://midscenejs.com/zh/model-common-config.html for details.
