# Midscene Skills

Claude Code plugin marketplace for AI-powered automation across multiple platforms, powered by [Midscene](https://midscenejs.com).

## Available Plugins

### Web Automation
AI-powered web browser automation. Control web pages with natural language - supports both Puppeteer (auto-launch) and Chrome Bridge (real browser) modes.

### Computer Automation
AI-powered desktop automation (macOS). Control your computer with natural language - click, type, take screenshots, and more.

### Android Automation
AI-powered Android device automation. Control Android devices with natural language via ADB.

### iOS Automation
AI-powered iOS device automation. Control iOS devices/simulators with natural language via WebDriverAgent.

## Installation

On Claude Code, add the marketplace and install the plugins you need:

```bash
# Add marketplace
/plugin marketplace add web-infra-dev/midscene-skills

# Install plugins (choose the ones you need)
/plugin install web-automation@midscene-marketplace
/plugin install computer-automation@midscene-marketplace
/plugin install android-automation@midscene-marketplace
/plugin install ios-automation@midscene-marketplace
```

## Setup

Set your AI model API key:

```bash
export MIDSCENE_MODEL_API_KEY="your-api-key"
```

Optional configuration:

```bash
export MIDSCENE_MODEL_NAME="gpt-4o"
export MIDSCENE_MODEL_BASE_URL="https://api.openai.com/v1"
```

See [Model Configuration](https://midscenejs.com/zh/model-common-config.html) for more options.

Each platform has additional prerequisites (see the skill's SKILL.md for details):
- **Web**: Google Chrome (Puppeteer mode) or Midscene Chrome Extension (Bridge mode)
- **Computer**: macOS Accessibility permission + Xcode CLI Tools
- **Android**: ADB + USB-connected device with debugging enabled
- **iOS**: WebDriverAgent + Xcode

## Usage

Once installed, interact with Claude naturally:

```
You: Go to Google and search for "Midscene"
Claude: [Uses web-automation to navigate and search]

You: Take a screenshot of my desktop
Claude: [Uses computer-automation to capture screenshot]

You: Open Settings on my Android phone
Claude: [Uses android-automation to interact with device]
```

All commands are powered by `@midscene/cli` and run via `npx` (auto-downloads, no pre-installation needed).

## Local Development

```bash
git clone https://github.com/web-infra-dev/midscene-skills.git
cd midscene-skills

# Add marketplace locally
/plugin marketplace add /absolute/path/to/midscene-skills

# Install plugins
/plugin install web-automation@midscene-marketplace
```

## License

MIT - See [LICENSE](./LICENSE) for details
