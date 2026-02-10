# Midscene Skills

Claude Code plugin for AI-powered automation across multiple platforms, powered by [Midscene](https://midscenejs.com).

## Supported Platforms

- **Web** - Browser automation (Puppeteer or Chrome Bridge mode)
- **Computer** - Desktop automation (macOS)
- **Android** - Android device automation via ADB
- **iOS** - iOS device/simulator automation via WebDriverAgent

## Installation

On Claude Code, add the marketplace and install the plugin:

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

# Install plugin
/plugin install midscene-automation@midscene-marketplace
```

## License

MIT - See [LICENSE](./LICENSE) for details
