# Claude Skills for Midscene Automation

This directory contains skills that enable Claude to use the Midscene browser automation CLI when using this project as a Claude Code plugin.

## What are Skills?

Skills are a feature of Claude Code that allow Claude to discover and use specialized capabilities. When this project is opened in Claude Code, Claude will automatically detect these skills and use them to help users with browser automation tasks.

## Structure

```
.claude/skills/midscene-automation/
├── SKILL.md         # Main skill definition and usage guide
├── EXAMPLES.md      # Detailed usage examples
├── REFERENCE.md     # Technical API reference
└── setup.json       # Setup verification and prerequisites
```

## How Skills Work

1. **Discovery**: When you open this project in Claude Code, Claude reads the skill definitions
2. **Activation**: When you ask Claude to browse websites or automate web tasks, it knows to use these commands
3. **Execution**: Claude calls the CLI commands via bash tool to perform browser automation
4. **Integration**: All browser automation happens seamlessly through natural conversation

## Example Usage

Instead of manually typing commands, you can just ask Claude:

```
You: Search Google for "Midscene automation"
Claude: [Automatically uses: node dist/src/cli.js navigate https://google.com, etc.]

You: Extract all product prices from this e-commerce page
Claude: [Uses the query command to extract structured data]

You: Fill out this contact form
Claude: [Uses act commands to interact with form fields]
```

## Skill Capabilities

The Midscene automation skill enables Claude to:

- 🌐 Navigate to any website
- 🖱️ Click buttons and links
- ⌨️ Fill out forms and input text
- 📊 Extract structured data from pages
- ✅ Verify page state and content
- 📸 Take screenshots for verification
- 🔄 Perform multi-step workflows

## Setup

Before Claude can use these skills, ensure the setup is complete:

1. Check `setup.json` for prerequisites
2. Follow the setup instructions in `SKILL.md`
3. Verify installation works
4. Update `setup.json` to mark setup as complete

Claude will automatically check `setup.json` before attempting to use browser commands.

## Documentation

- **[SKILL.md](midscene-automation/SKILL.md)**: Complete skill documentation, commands, and best practices
- **[EXAMPLES.md](midscene-automation/EXAMPLES.md)**: Real-world usage examples and patterns
- **[REFERENCE.md](midscene-automation/REFERENCE.md)**: Technical details and API reference
- **[setup.json](midscene-automation/setup.json)**: Setup verification checklist

## Using This Project as a Plugin

To use this project as a Claude Code plugin with skills:

1. Open this project in VS Code with Claude Code extension
2. Ensure setup is complete (check `setup.json`)
3. Start chatting with Claude about browser automation tasks
4. Claude will automatically use the Midscene CLI commands

## Notes

- Skills are only active when working with this specific project
- Claude will automatically use the compiled version (`node dist/src/cli.js`)
- All browser operations are performed through the CLI for transparency
- You can always see exactly what commands Claude is running
