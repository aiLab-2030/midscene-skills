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

Automate iOS devices and simulators using `npx @midscene/ios@1.3.12-beta-20260212033510.0`. Each CLI command maps directly to an MCP tool — you (the AI agent) act as the brain, deciding which actions to take based on screenshots.

## Prerequisites

The CLI automatically loads `.env` from the current working directory. Before first use, verify the `.env` file exists and contains the API key:

```bash
cat .env | grep MIDSCENE_MODEL_API_KEY | head -c 30
```

If no `.env` file or no API key, ask the user to create one. See [Model Configuration](https://midscenejs.com/zh/model-common-config.html) for supported providers.

**Do NOT run `echo $MIDSCENE_MODEL_API_KEY`** — the key is loaded from `.env` at runtime, not from shell environment.

## Commands

### Connect to Device

```bash
npx @midscene/ios@1.3.12-beta-20260212033510.0 connect
```

### Take Screenshot

```bash
npx @midscene/ios@1.3.12-beta-20260212033510.0 take_screenshot
```

After taking a screenshot, read the saved image file to understand the current screen state before deciding the next action.

### Perform Actions

Use actionSpace tools to interact with the device:

```bash
npx @midscene/ios@1.3.12-beta-20260212033510.0 Tap --locate '{"prompt":"the Settings icon"}'
npx @midscene/ios@1.3.12-beta-20260212033510.0 Input --locate '{"prompt":"search field"}' --content 'hello world'
npx @midscene/ios@1.3.12-beta-20260212033510.0 Scroll --direction down
npx @midscene/ios@1.3.12-beta-20260212033510.0 Swipe --locate '{"prompt":"the notification panel"}' --direction down
npx @midscene/ios@1.3.12-beta-20260212033510.0 KeyboardPress --value Enter
npx @midscene/ios@1.3.12-beta-20260212033510.0 LongPress --locate '{"prompt":"the message bubble"}'
npx @midscene/ios@1.3.12-beta-20260212033510.0 Launch --uri 'com.apple.Preferences'
```

### Natural Language Action

Use `act` to execute multi-step operations in a single command — useful for transient UI interactions:

```bash
npx @midscene/ios@1.3.12-beta-20260212033510.0 act --prompt "tap Delete, then confirm in the alert dialog"
```

### Disconnect

```bash
npx @midscene/ios@1.3.12-beta-20260212033510.0 disconnect
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
npx @midscene/ios@1.3.12-beta-20260212033510.0 act --prompt "tap the Delete button, then confirm in the alert dialog"
npx @midscene/ios@1.3.12-beta-20260212033510.0 take_screenshot
```

**Example — Alert dialog using individual commands (alternative):**

```bash
# Tap the button that triggers the alert, then interact with the alert back-to-back
npx @midscene/ios@1.3.12-beta-20260212033510.0 Tap --locate '{"prompt":"the Delete button"}'
npx @midscene/ios@1.3.12-beta-20260212033510.0 Tap --locate '{"prompt":"Confirm in the alert dialog"}'
# NOW take a screenshot to verify the result
npx @midscene/ios@1.3.12-beta-20260212033510.0 take_screenshot
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
- Check `.env` file contains `MIDSCENE_MODEL_API_KEY=<your-key>`.
- See https://midscenejs.com/zh/model-common-config.html for details.
