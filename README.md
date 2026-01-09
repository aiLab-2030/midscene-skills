# Midscene Skills(still work in progress)

Browser automation plugin for Claude Code, powered by Midscene.

## Features

- Natural language browser automation using Midscene
- AI-powered visual and semantic understanding - no CSS selectors needed
- Persistent browser sessions for faster operations
- Screenshot capture and visual feedback
- Structured data extraction

## Install as Claude Code Plugin

### Installation Steps

```bash
# Add the plugin directly from GitHub
/plugin add https://github.com/web-infra-dev/midscene-skills

# Or from local clone
git clone https://github.com/web-infra-dev/midscene-skills.git
/plugin add ./midscene-skills
```

## Post-Installation Setup

After installing the plugin, navigate to the plugin directory and run:

```bash
# 1. Install dependencies
pnpm install

# 2. Build the project
pnpm build

# 3. Configure AI model API
cp .env.example .env
# Edit .env with your API credentials
# See: https://midscenejs.com/model-config.html

# 4. Test installation
node dist/src/cli.js navigate https://example.com
node dist/src/cli.js close
```

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
