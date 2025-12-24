# Claude Plugin Marketplace Configuration

This directory contains the marketplace.json file for publishing this project as a Claude Code plugin.

## What is marketplace.json?

The `marketplace.json` file defines metadata for the Claude Code plugin marketplace. It describes:

- Plugin name and ownership
- Description and version
- Skills provided by the plugin
- Categories and keywords for discoverability
- Source repository location

## Structure

```json
{
  "name": "midscene-automation",           // Plugin identifier
  "owner": {
    "name": "Web Infra Dev",               // Organization name
    "email": "midscene@bytedance.com"      // Contact email
  },
  "metadata": {
    "description": "...",                   // Overall description
    "version": "1.0.0"                      // Marketplace version
  },
  "plugins": [
    {
      "name": "midscene-automation",        // Plugin name
      "source": "https://github.com/...",   // Git repository URL
      "description": "...",                 // Detailed description
      "version": "0.0.1",                   // Plugin version
      "author": { "name": "..." },          // Author info
      "category": "automation",             // Marketplace category
      "keywords": [...],                    // Search keywords
      "strict": false,                      // Allow partial failures
      "skills": [
        "./.claude/skills/midscene-automation" // Path to skills
      ]
    }
  ]
}
```

## Key Fields

### name
Plugin identifier used in the marketplace. Should be unique and descriptive.

### owner
Organization or individual who maintains the plugin.

### source
Git repository URL where the plugin code is hosted. Users will clone from this URL.

### description
Detailed description of what the plugin does. Used in marketplace listings and should explain:
- What the plugin enables
- When to use it
- Key differentiators

### category
Category for marketplace organization:
- `automation` - Browser and task automation
- `productivity` - Productivity tools
- `development` - Development utilities
- etc.

### keywords
Search terms users might use to find the plugin. Include:
- Technology names (midscene, browser)
- Use cases (web-scraping, automation)
- Key features (ai-powered, no-selectors)

### skills
Array of paths to skill directories. Each skill directory should contain:
- `SKILL.md` - Main skill definition
- `EXAMPLES.md` - Usage examples
- `REFERENCE.md` - Technical reference
- `setup.json` - Setup verification

### strict
- `false` - Plugin continues working even if some commands fail
- `true` - Plugin stops on first error

## Publishing to Marketplace

To publish this plugin to the Claude Code marketplace:

1. **Ensure all files are ready**:
   - ✅ `.claude-plugin/marketplace.json` exists
   - ✅ `.claude/skills/midscene-automation/` is complete
   - ✅ All documentation is accurate
   - ✅ Setup instructions are clear

2. **Push to GitHub**:
   ```bash
   git add .claude-plugin/ .claude/skills/
   git commit -m "Add Claude Code plugin configuration"
   git push
   ```

3. **Submit to marketplace**:
   - Follow Claude Code marketplace submission process
   - Provide `marketplace.json` URL
   - Await review and approval

4. **Version updates**:
   - Update `version` field when making changes
   - Follow semantic versioning (MAJOR.MINOR.PATCH)
   - Document changes in releases

## Using the Plugin

### As a Developer (Local)

Clone and use directly:
```bash
git clone https://github.com/web-infra-dev/midscene-skills
cd midscene-skills
pnpm install
pnpm build
# Configure .env
# Use with Claude Code
```

### As a User (Marketplace)

Once published, users can:
1. Browse Claude Code plugin marketplace
2. Search for "midscene" or "browser automation"
3. Install with one click
4. Claude will automatically:
   - Clone the repository
   - Check setup requirements
   - Enable the skills

## Versioning Strategy

### Marketplace Version (metadata.version)
Overall marketplace listing version. Update when:
- Major plugin changes
- New plugins added to the package
- Breaking changes to marketplace.json structure

### Plugin Version (plugins[].version)
Individual plugin version. Update when:
- Skills are updated
- New features added
- Bug fixes
- Documentation changes

Example:
- `0.0.1` - Initial release
- `0.1.0` - New features or skills
- `0.1.1` - Bug fixes
- `1.0.0` - Stable release

## Marketplace Categories

Available categories:
- **automation** - Task and browser automation (our category)
- **productivity** - Productivity tools
- **development** - Development utilities
- **data** - Data processing and analysis
- **communication** - Communication tools
- **creative** - Creative and design tools

## Keywords Best Practices

Include keywords that users might search for:

✅ **Good keywords**:
- Technology names: `midscene`, `puppeteer`, `chrome`
- Use cases: `web-scraping`, `testing`, `automation`
- Features: `ai-powered`, `visual-understanding`, `no-selectors`
- Actions: `screenshots`, `data-extraction`, `form-filling`

❌ **Avoid**:
- Generic words: `tool`, `helper`, `utility`
- Duplicate words already in name/description
- Too many keywords (keep under 10)

## Updating the Configuration

When making changes:

1. **Update version**:
   ```json
   "version": "0.0.2"  // Increment appropriately
   ```

2. **Update description** if features changed:
   ```json
   "description": "New description with updated capabilities"
   ```

3. **Add keywords** if targeting new use cases:
   ```json
   "keywords": [..., "new-keyword"]
   ```

4. **Commit and push**:
   ```bash
   git add .claude-plugin/marketplace.json
   git commit -m "Update plugin configuration to v0.0.2"
   git push
   ```

## Repository Requirements

For marketplace listing, the repository should have:

- ✅ `.claude-plugin/marketplace.json` - This file
- ✅ `.claude/skills/` - Skills directory
- ✅ `README.md` - Project overview
- ✅ `LICENSE` - Open source license
- ✅ `package.json` - Dependencies
- ✅ Documentation (QUICKSTART, USER_GUIDE, etc.)
- ✅ `.env.example` - Configuration template

## Support and Maintenance

Users will find this plugin via:
- Marketplace search
- Category browsing
- Keyword matching
- Recommendations

Ensure:
- Documentation is up-to-date
- Examples work correctly
- Issues are addressed promptly
- Versions are properly tagged in git

## Related Files

- `.claude/skills/midscene-automation/SKILL.md` - Main skill definition
- `.claude/skills/midscene-automation/setup.json` - Setup verification
- `.claude/skills/README.md` - Skills overview
- `SKILLS_GUIDE.md` - Usage guide for developers

## Example User Flow

1. **Discovery**: User searches marketplace for "browser automation"
2. **Installation**: User clicks "Install midscene-automation"
3. **Setup**: Claude checks `setup.json` and guides through prerequisites
4. **Usage**: User talks to Claude naturally about web tasks
5. **Execution**: Claude uses skills to automate browser operations

## Notes

- The `source` field points to GitHub repository
- Skills are relative to plugin root (`./.claude/skills/...`)
- `strict: false` allows graceful error handling
- Version should follow semver conventions
- Email should be a monitored support address

For more information about Claude Code plugins and marketplace, see official Claude documentation.
