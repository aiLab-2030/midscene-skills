# Midscene Automation

AI-powered browser automation plugin for Claude Code, powered by Midscene.

## Features

- Natural language browser automation using Midscene
- AI-powered visual and semantic understanding - no CSS selectors needed
- Persistent browser sessions for faster operations
- Screenshot capture and visual feedback
- Structured data extraction

## Installation

On Claude Code, add the marketplace and install:

```bash
/plugin marketplace add web-infra-dev/midscene-skills
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

## Usage

Once installed, just talk to Claude naturally:

```
You: Go to Google and search for "Midscene"
Claude: [Automatically executes browser commands]

You: What are the top 3 results?
Claude: [Extracts and returns the data]
```

### Standalone Mode

You can also run the interactive agent directly:

```bash
pnpm claude
# or with initial prompt
pnpm claude "Navigate to example.com and take a screenshot"
```

## CLI Commands

The CLI provides the following commands for browser automation:

- `node dist/src/cli.js navigate <url>` - Navigate to a URL and take screenshot
- `node dist/src/cli.js act "<action>"` - Perform natural language action
- `node dist/src/cli.js query "<query>"` - Query information from the page
- `node dist/src/cli.js assert "<condition>"` - Assert a condition on the page
- `node dist/src/cli.js screenshot` - Take a screenshot
- `node dist/src/cli.js close` - Close the browser

All commands output JSON with success status and relevant data.

## Architecture

This project combines:
- **Claude Agent SDK** for AI-powered orchestration
- **Midscene** for intelligent browser automation
- **Puppeteer** for browser control

The system maintains a persistent browser instance between commands for faster execution.

## Documentation

- [Quick Start Guide](./QUICKSTART.md)
- [User Guide](./USER_GUIDE.md)
- [Skills Guide](./SKILLS_GUIDE.md)
- [Use Cases](./USE_CASES.md)
- [Implementation Details](./IMPLEMENTATION.md)

## License

See [LICENSE](../../LICENSE)
