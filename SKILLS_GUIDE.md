# Using Midscene Skills with Claude Code

This guide explains how to use the Midscene browser automation skills that have been created for this project.

## What Just Got Created

A complete Claude Code skill definition and marketplace configuration has been added to this project:

```
.claude-plugin/
├── marketplace.json                   # Plugin marketplace metadata
└── README.md                          # Marketplace configuration guide

.claude/skills/
├── README.md                          # Overview of skills system
└── midscene-automation/
    ├── SKILL.md                       # Main skill definition (329 lines)
    ├── EXAMPLES.md                    # 10 detailed examples (410 lines)
    ├── REFERENCE.md                   # Technical reference (520 lines)
    └── setup.json                     # Setup verification checklist
```

**Total: ~1,500+ lines of documentation** covering all aspects of the Midscene automation skill and marketplace integration.

## What This Enables

When you use this project with Claude Code (VS Code extension), Claude will automatically:

1. **Detect the skill**: Read the skill definitions on startup
2. **Understand capabilities**: Know it can use Midscene for browser automation
3. **Execute commands**: Call the CLI commands via bash when you ask for web tasks
4. **Provide guidance**: Help with setup if prerequisites aren't met

## Before First Use

### 1. Verify Setup

Check the setup status:
```bash
cat .claude/skills/midscene-automation/setup.json
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

Once everything works, edit `.claude/skills/midscene-automation/setup.json` and set:
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

## Skill Features

### Automatic Command Selection

Claude knows when to use each command:

- **navigate**: When you mention opening a website
- **act**: When you want to interact (click, type, scroll)
- **query**: When you need information from the page
- **assert**: When you want to verify something
- **screenshot**: When you need visual confirmation
- **close**: When you're done with browser tasks

### Intelligent Guidance

Claude will:
- Check setup.json before attempting commands
- Guide you through setup if needed
- Suggest better approaches if a command fails
- View screenshots to verify success
- Handle errors gracefully

### Multi-Turn Conversations

Keep browser open for multiple related tasks:

```
You: Go to Amazon
Claude: [navigates]

You: Search for "laptop"
Claude: [uses act command]

You: How many results?
Claude: [uses query command]

You: Close the browser
Claude: [closes browser]
```

## Examples from Documentation

The skill includes 10 detailed examples:

1. **Search and Extract**: Google search with data extraction
2. **Fill Forms**: Contact form automation
3. **Product Info**: E-commerce data scraping
4. **Login Flow**: Authentication workflows
5. **News Scraping**: Hacker News headlines
6. **Weather Check**: Chinese language support (查询杭州天气)
7. **Shopping**: Price filtering and comparison
8. **Social Media**: Post interactions
9. **Table Data**: Structured data extraction
10. **Pagination**: Multi-page navigation

See `.claude/skills/midscene-automation/EXAMPLES.md` for full details.

## Best Practices (from Skill)

1. ✅ Always navigate before interacting
2. ✅ View screenshots after each command
3. ✅ Use natural, specific language
4. ✅ Keep browser open for related tasks
5. ✅ Close when completely done
6. ✅ Check success field in responses

## Troubleshooting

### Claude doesn't use the skill

**Solution**: 
- Ensure you're using Claude Code (VS Code extension)
- Check that `.claude/skills/` exists in project root
- Verify SKILL.md has proper frontmatter (name, description, allowed-tools)

### Setup check fails

**Solution**:
- Run through setup steps in SKILL.md
- Update setup.json after completing prerequisites
- Test with direct CLI command first

### Commands fail

**Solution**:
- Check `.env` file has correct API credentials
- Verify Chrome is installed
- View screenshots to understand page state
- Try more specific natural language descriptions

## Technical Details

For technical information, see:
- **Command API**: `.claude/skills/midscene-automation/REFERENCE.md`
- **Error Handling**: REFERENCE.md > Error Handling section
- **Browser Management**: REFERENCE.md > Browser Management section
- **AI Configuration**: REFERENCE.md > AI Model Configuration section

## Comparison: Skills vs Direct Use

### Without Skills (Manual)
```bash
# You type each command manually
node dist/src/cli.js navigate "https://google.com"
node dist/src/cli.js act "type 'search term'"
node dist/src/cli.js act "press Enter"
node dist/src/cli.js query "get results"
```

### With Skills (Natural)
```
You: Search Google for "search term" and get the results
Claude: [Automatically executes all necessary commands]
[Returns results in conversational format]
```

## Benefits of Skills Approach

1. **Natural Interaction**: Just describe what you want
2. **Automatic Planning**: Claude figures out the command sequence
3. **Error Recovery**: Claude can try different approaches
4. **Context Awareness**: Claude remembers previous steps
5. **Guided Setup**: Claude helps with prerequisites
6. **Best Practices**: Claude follows optimal patterns

## Next Steps

1. ✅ **Complete setup** if not done (see setup.json)
2. ✅ **Test with Claude Code**: Open project in VS Code with Claude extension
3. ✅ **Try examples**: Start with simple navigation tasks
4. ✅ **Read documentation**: Explore EXAMPLES.md for patterns
5. ✅ **Build workflows**: Combine commands for complex automation

## Plugin Marketplace

This project can be published to the Claude Code plugin marketplace!

### Marketplace Configuration

The `.claude-plugin/marketplace.json` file contains:

```json
{
  "name": "midscene-automation",
  "source": "https://github.com/web-infra-dev/midscene-skills",
  "description": "AI-powered browser automation with Midscene",
  "category": "automation",
  "keywords": ["browser", "automation", "midscene", "ai-powered", "no-selectors"],
  "skills": ["./.claude/skills/midscene-automation"]
}
```

### Publishing Process

1. **Prepare repository**:
   ```bash
   git add .claude-plugin/ .claude/skills/
   git commit -m "Add Claude Code plugin configuration"
   git push
   ```

2. **Submit to marketplace**:
   - Follow Claude Code marketplace submission process
   - Provide repository URL
   - Await review and approval

3. **User installation**:
   - Users search marketplace for "midscene" or "browser automation"
   - One-click installation
   - Automatic setup guidance

See `.claude-plugin/README.md` for detailed marketplace configuration guide.

## Additional Resources

- [Midscene Documentation](https://midscenejs.com)
- [Claude Code Skills](https://docs.anthropic.com/claude/docs/skills)
- [Model Configuration](https://midscenejs.com/model-config.html)
- [Plugin Marketplace Guide](.claude-plugin/README.md)
- Project README.md and QUICKSTART.md

## Summary

You now have a fully-documented Claude Code skill for Midscene browser automation! 

Claude can now:
- 🌐 Browse any website
- 🤖 Understand and execute automation tasks
- 📊 Extract structured data
- ✅ Verify page states
- 📸 Capture visual evidence
- 🔄 Handle complex multi-step workflows

All through natural language conversation! 🎉
