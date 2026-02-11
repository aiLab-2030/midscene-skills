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

Automate iOS devices and simulators using `npx -p @midscene/ios@1.3.12-beta-20260211123127.0 midscene-ios`. Each CLI command maps directly to an MCP tool — you (the AI agent) act as the brain, deciding which actions to take based on screenshots.

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
npx -p @midscene/ios@1.3.12-beta-20260211123127.0 midscene-ios --help
```

## Common Commands

### Connect to Device

```bash
npx -p @midscene/ios@1.3.12-beta-20260211123127.0 midscene-ios connect
```

### Take Screenshot

```bash
npx -p @midscene/ios@1.3.12-beta-20260211123127.0 midscene-ios take_screenshot
```

After taking a screenshot, read the saved image file to understand the current screen state before deciding the next action.

### Perform Actions

Use actionSpace tools to interact with the device:

```bash
npx -p @midscene/ios@1.3.12-beta-20260211123127.0 midscene-ios Tap --locate '{"prompt":"the Settings icon"}'
npx -p @midscene/ios@1.3.12-beta-20260211123127.0 midscene-ios Input --locate '{"prompt":"search field"}' --content 'hello world'
npx -p @midscene/ios@1.3.12-beta-20260211123127.0 midscene-ios Scroll --direction down
npx -p @midscene/ios@1.3.12-beta-20260211123127.0 midscene-ios Swipe --locate '{"prompt":"the notification panel"}' --direction down
npx -p @midscene/ios@1.3.12-beta-20260211123127.0 midscene-ios KeyboardPress --value Enter
npx -p @midscene/ios@1.3.12-beta-20260211123127.0 midscene-ios LongPress --locate '{"prompt":"the message bubble"}'
npx -p @midscene/ios@1.3.12-beta-20260211123127.0 midscene-ios Launch --uri 'com.apple.Preferences'
```

### Natural Language Action

Use `act` to execute multi-step operations in a single command — useful for transient UI interactions:

```bash
npx -p @midscene/ios@1.3.12-beta-20260211123127.0 midscene-ios act --prompt "tap Delete, then confirm in the alert dialog"
```

### Disconnect

```bash
npx -p @midscene/ios@1.3.12-beta-20260211123127.0 midscene-ios disconnect
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
2. **Describe UI elements clearly**: Use visible text labels, icons, or positional descriptions (e.g., `"the Settings icon in the top-right corner"` rather than vague references).
3. **Use JSON for locate parameter**: Always pass `--locate` as a JSON string with a `prompt` field describing the target element visually.
4. **Chain actions sequentially**: Execute one action at a time and verify the result before moving to the next step.

### Handle Transient UI

Action sheets, alerts, popup menus, and share sheets **disappear** between commands. When interacting with transient UI:

- **Use `act` for multi-step transient interactions** — it executes everything in a single process
- **Or execute commands rapidly in sequence** — do NOT take screenshots between steps
- **Do NOT pause to analyze** — run all commands for the transient interaction back-to-back
- Persistent UI (app screens, tab bars, navigation bars) is fine to interact with across separate commands

**Example — Alert dialog using `act` (recommended for transient UI):**

```bash
npx -p @midscene/ios@1.3.12-beta-20260211123127.0 midscene-ios act --prompt "tap the Delete button, then confirm in the alert dialog"
npx -p @midscene/ios@1.3.12-beta-20260211123127.0 midscene-ios take_screenshot
```

**Example — Alert dialog using individual commands (alternative):**

```bash
# Tap the button that triggers the alert, then interact with the alert back-to-back
npx -p @midscene/ios@1.3.12-beta-20260211123127.0 midscene-ios Tap --locate '{"prompt":"the Delete button"}'
npx -p @midscene/ios@1.3.12-beta-20260211123127.0 midscene-ios Tap --locate '{"prompt":"Confirm in the alert dialog"}'
# NOW take a screenshot to verify the result
npx -p @midscene/ios@1.3.12-beta-20260211123127.0 midscene-ios take_screenshot
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

### API Key Issues
**Symptom:** Authentication or model errors.
**Solution:**
- Verify `MIDSCENE_MODEL_API_KEY` is set correctly: `echo $MIDSCENE_MODEL_API_KEY`
- See https://midscenejs.com/zh/model-common-config.html for details.
