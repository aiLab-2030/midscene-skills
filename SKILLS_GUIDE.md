# Using Midscene Skills with Claude Code

This guide explains how to use the Midscene browser automation skills that have been created for this project.

## Project Structure

This project is configured as a Claude Code plugin:

```
midscene-skills/
├── .claude-plugin/
│   └── plugin.json                    # Plugin metadata
├── skills/
│   └── midscene-automation/
│       ├── SKILL.md                   # Main skill definition
│       ├── EXAMPLES.md                # 10 detailed examples
│       ├── REFERENCE.md               # Technical reference
│       └── setup.json                 # Setup verification checklist
├── src/
│   ├── cli.ts                         # CLI implementation
│   └── browser-utils.ts               # Browser utilities
└── ...
```

## What This Enables

When users install this plugin, Claude will automatically:

1. **Detect the skill**: Read the skill definitions
2. **Understand capabilities**: Know it can use Midscene for browser automation
3. **Execute commands**: Call the CLI commands via bash when asked for web tasks
4. **Provide guidance**: Help with setup if prerequisites aren't met

## Before First Use

### 1. Verify Setup

Check the setup status:
```bash
cat skills/midscene-automation/setup.json
```

If `setupComplete: false`, follow the setup instructions.

### 2. Complete Setup

```bash
# Install dependencies
pnpm install

# Build the project
pnpm build

# Configure AI model (create .env file)
cp .env.example .env
# Edit .env with your API credentials
# See: https://midscenejs.com/model-config.html

# Test installation
node dist/src/cli.js navigate https://example.com

# If successful, close browser
node dist/src/cli.js close
```

### 3. Update setup.json

Once everything works, edit `skills/midscene-automation/setup.json` and set:
- All `"installed": true`
- All `"configured": true`
- `"setupComplete": true`

## Using the Skills

### Option 1: Through Claude Code (Recommended)

Just talk to Claude naturally:

```
You: Go to Google and search for "Midscene automation"

Claude: I'll help you search Google for "Midscene automation".
[Executes: node dist/src/cli.js navigate https://google.com]
[Executes: node dist/src/cli.js act "type 'Midscene automation' and press Enter"]
[Shows screenshot and results]

You: What are the top 3 results?

Claude: [Executes: node dist/src/cli.js query "What are the titles of the top 3 search results?"]
[Provides extracted data]
```

### Option 2: Interactive Agent Mode

Start the agent:
```bash
pnpm claude
```

Then have a conversation:
```
You: Check the weather in Hangzhou
Claude: [Automatically executes multiple commands]
[Shows weather information]

You: Take a screenshot
Claude: [Takes screenshot]
[Shows path to image]
```

### Option 3: Direct CLI (Manual)

You can still use commands directly:
```bash
node dist/src/cli.js navigate "https://example.com"
node dist/src/cli.js act "click the login button"
node dist/src/cli.js query "What is the page title?"
node dist/src/cli.js screenshot
node dist/src/cli.js close
```

## Installing as a Plugin

Users can install this plugin in two ways:

### Method 1: Direct GitHub Installation

```bash
/plugin install https://github.com/web-infra-dev/midscene-skills
```

### Method 2: Via Marketplace (if configured)

```bash
# Add marketplace first
/plugin marketplace add <marketplace-url>

# Then install
/plugin install midscene-automation
```

## Examples from Documentation

The skill includes 10 detailed examples:

1. **Search and Extract**: Google search with data extraction
2. **Fill Forms**: Contact form automation
3. **Product Info**: E-commerce data scraping
4. **Login Flow**: Authentication workflows
5. **News Scraping**: Hacker News headlines
6. **Weather Check**: Chinese language support
7. **Shopping**: Price filtering and comparison
8. **Social Media**: Post interactions
9. **Table Data**: Structured data extraction
10. **Pagination**: Multi-page navigation

See `skills/midscene-automation/EXAMPLES.md` for full details.

## Best Practices

1. Always navigate before interacting
2. View screenshots after each command
3. Use natural, specific language
4. Keep browser open for related tasks
5. Close when completely done
6. Check success field in responses

## Troubleshooting

### Claude doesn't use the skill

- Ensure plugin is properly installed
- Verify SKILL.md has proper frontmatter (name, description, allowed-tools)

### Setup check fails

- Run through setup steps in SKILL.md
- Update setup.json after completing prerequisites
- Test with direct CLI command first

### Commands fail

- Check `.env` file has correct API credentials
- Verify Chrome is installed
- View screenshots to understand page state
- Try more specific natural language descriptions

## Technical Details

For technical information, see:
- **Command API**: `skills/midscene-automation/REFERENCE.md`
- **Error Handling**: REFERENCE.md > Error Handling section
- **Browser Management**: REFERENCE.md > Browser Management section
- **AI Configuration**: REFERENCE.md > AI Model Configuration section

## Additional Resources

- [Midscene Documentation](https://midscenejs.com)
- [Claude Code Plugins](https://docs.anthropic.com/claude/docs/plugins)
- [Model Configuration](https://midscenejs.com/model-config.html)
