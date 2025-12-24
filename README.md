# Midscene Skills

Browser automation agent powered by Claude and Midscene.

## Features

- Natural language browser automation using Midscene
- Multi-turn conversations with Claude Agent SDK
- Persistent browser sessions for faster operations
- Screenshot capture and visual feedback
- Structured data extraction

## Installation

```bash
pnpm install
```

## Setup

1. Configure environment variables for Midscene:
   
   Please follow the [Midscene Model Configuration Guide](https://midscenejs.com/model-config.html) to set up the required environment variables in your `.env` file.

2. Build the project:
   ```bash
   pnpm build
   ```

## Usage

Start an interactive session:
```bash
pnpm claude
```

Or provide an initial prompt:
```bash
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
