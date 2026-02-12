# Midscene Skills

[Claude Code](https://docs.anthropic.com/en/docs/claude-code) skills for AI-powered automation, powered by [Midscene](https://midscenejs.com).

One plugin, four platforms — control web browsers, desktops, Android devices, and iOS devices with natural language.

## Supported Platforms

| Platform | Description | Prerequisites |
|----------|-------------|---------------|
| **Web** | Browser automation via Puppeteer or [Chrome Bridge](https://midscenejs.com/bridge-mode-by-chrome-extension.html) mode | Chrome / Midscene Chrome Extension |
| **Computer** | macOS desktop automation | Accessibility permission, Xcode CLI Tools |
| **Android** | Android device automation via ADB | ADB, USB-connected device |
| **iOS** | iOS device/simulator automation via [WebDriverAgent](https://midscenejs.com/zh/usage-ios.html) | Xcode, WebDriverAgent |

## Installation

```bash
# Add marketplace
/plugin marketplace add web-infra-dev/midscene-skills

# Install (includes all 4 platform skills)
/plugin install midscene-automation@midscene-marketplace
```

## Setup

Set your AI model API key:

```bash
export MIDSCENE_MODEL_API_KEY="your-api-key"
```

Optional — use a custom model or endpoint:

```bash
export MIDSCENE_MODEL_NAME="gpt-4o"
export MIDSCENE_MODEL_BASE_URL="https://api.openai.com/v1"
```

See [Model Configuration](https://midscenejs.com/model-provider.html) for all supported providers.

## Usage

Once installed, just talk to Claude naturally:

```
> Open Hacker News and tell me the top 3 stories

> Take a screenshot of my desktop

> Open the Settings app on my Android phone

> Check what Wi-Fi network my iPhone is connected to
```

Claude will automatically pick the right skill and execute the commands via `@midscene/cli`.

## How It Works

All commands run through `npx @midscene/cli@1.3.12-beta-20260211155735.0 <platform> <command>`, which auto-downloads on first use — no pre-installation needed.

```bash
# Web
npx @midscene/cli@1.3.12-beta-20260211155735.0 web navigate "https://example.com" --bridge
npx @midscene/cli@1.3.12-beta-20260211155735.0 web query "what is the page title?" --bridge

# Computer
npx @midscene/cli@1.3.12-beta-20260211155735.0 computer act "press Command+Space to open Spotlight"
npx @midscene/cli@1.3.12-beta-20260211155735.0 computer screenshot

# Android
npx @midscene/cli@1.3.12-beta-20260211155735.0 android act "tap the Settings icon"
npx @midscene/cli@1.3.12-beta-20260211155735.0 android query "what is the battery percentage?"

# iOS
npx @midscene/cli@1.3.12-beta-20260211155735.0 ios act "tap the Safari icon"
npx @midscene/cli@1.3.12-beta-20260211155735.0 ios assert "Safari is open"
```

## Local Development

```bash
git clone https://github.com/web-infra-dev/midscene-skills.git
cd midscene-skills

# Add marketplace locally
/plugin marketplace add /absolute/path/to/midscene-skills

# Install plugin
/plugin install midscene-automation@midscene-marketplace
```

## License

MIT
