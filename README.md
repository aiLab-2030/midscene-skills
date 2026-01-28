# Midscene Skills

Claude Code plugin marketplace for browser automation, powered by Midscene.

## Available Plugins

### 🤖 midscene-automation

AI-powered browser automation using Midscene. Automate web interactions with natural language - no CSS selectors needed.

[View Plugin Details →](./plugins/midscene-automation)

**Features:**
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

### Local Development

```bash
# Clone the repository
git clone https://github.com/web-infra-dev/midscene-skills.git
cd midscene-skills

# Add marketplace locally
/plugin marketplace add /absolute/path/to/midscene-skills

# Install the plugin
/plugin install midscene-automation@midscene-marketplace
```

## Usage

Once installed, you can interact with Claude naturally for browser automation:

```
You: Go to Google and search for "Midscene"
Claude: [Automatically executes browser commands]

You: What are the top 3 results?
Claude: [Extracts and returns the data]
```

For detailed usage instructions, see the [midscene-automation plugin documentation](./plugins/midscene-automation).

## Contributing

To add a new plugin to this marketplace:

1. Create a new directory under `plugins/`
2. Add a `.claude-plugin/plugin.json` file
3. Update `.claude-plugin/marketplace.json` to include your plugin
4. Submit a pull request

## License

MIT - See [LICENSE](./LICENSE) for details
