# Quick Start Guide

## Installation

```bash
cd /Users/bytedance/personal/midscene-skills
pnpm install
pnpm build
```

## Configuration

Configure environment variables for Midscene by creating a `.env` file in the project root.

Please refer to the [Midscene Model Configuration Guide](https://midscenejs.com/model-config.html) for detailed instructions on setting up your AI model credentials.

Example `.env` configuration:
```bash
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_API_KEY=your-api-key-here
MIDSCENE_MODEL_NAME=gpt-4-vision-preview
```

## Usage Examples

### Interactive Mode

Start a conversation with the agent:
```bash
pnpm claude
```

Example conversations:
```
You: Navigate to https://news.ycombinator.com and get the top story title
Claude: [Uses CLI to navigate and query the page]

You: Click on the first story
Claude: [Uses CLI to perform the click action]

You: What's the content of the article?
Claude: [Uses CLI to query the article content]
```

### Direct CLI Usage

Navigate to a page:
```bash
node dist/src/cli.js navigate "https://example.com"
```

Perform actions with natural language:
```bash
node dist/src/cli.js act "click the login button"
node dist/src/cli.js act "type 'john@example.com' into the email field"
node dist/src/cli.js act "scroll down to the footer"
```

Query information:
```bash
node dist/src/cli.js query "what is the page title?"
node dist/src/cli.js query "list all the product names"
node dist/src/cli.js query "what is the price of the first item?"
```

Assert conditions:
```bash
node dist/src/cli.js assert "the login button is visible"
node dist/src/cli.js assert "the user is logged in"
node dist/src/cli.js assert "there are more than 5 items in the list"
```

Take screenshots:
```bash
node dist/src/cli.js screenshot
```

Close browser:
```bash
node dist/src/cli.js close
```

## Command Line with Initial Prompt

```bash
pnpm claude "Navigate to GitHub and search for 'midscene'"
```

## Common Patterns

### Login Flow
```bash
node dist/src/cli.js navigate "https://example.com/login"
node dist/src/cli.js act "type 'user@example.com' into email field"
node dist/src/cli.js act "type 'password123' into password field"
node dist/src/cli.js act "click the login button"
node dist/src/cli.js assert "user is logged in"
node dist/src/cli.js screenshot
node dist/src/cli.js close
```

### Data Scraping
```bash
tsx src/cli.ts navigate "https://example.com/products"
tsx src/cli.ts query "list all product names and prices as JSON"
tsx src/cli.ts close
```

### Form Filling
```bash
tsx src/cli.ts navigate "https://example.com/form"
tsx src/cli.ts act "type 'John Doe' into the name field"
tsx src/cli.ts act "type 'john@example.com' into email"
tsx src/cli.ts act "select 'United States' from country dropdown"
tsx src/cli.ts act "check the terms and conditions checkbox"
tsx src/cli.ts act "click the submit button"
tsx src/cli.ts assert "form submitted successfully"
tsx src/cli.ts close
```

## Output Location

- Screenshots: `agent/browser_screenshots/screenshot-YYYY-MM-DDTHH-MM-SS-MSZ.png`
- Downloads: `agent/downloads/`
- Chrome Profile: `.chrome-profile/`

## Tips

1. **Natural Language**: Be as descriptive as you want. Midscene understands context.
   - Good: "click the blue login button in the top right"
   - Also good: "click login"

2. **Queries**: Ask for structured data when needed
   - "list all items" - will return a list
   - "what is the title?" - will return a string
   - "extract product info as JSON" - will return structured data

3. **Assertions**: Use natural language conditions
   - "the page contains 'Welcome'"
   - "there are 5 products displayed"
   - "the cart is empty"

4. **Browser Persistence**: Browser stays open between commands for speed
   - Always run `close` when done
   - Or let the agent handle cleanup automatically

5. **Debug Mode**: Set `DEBUG=1` to see more information
   ```bash
   DEBUG=1 tsx src/cli.ts navigate "https://example.com"
   ```

## Troubleshooting

### Chrome not found
- Make sure Chrome or Chromium is installed
- Check paths in `src/browser-utils.ts`

### API key issues
- Verify OPENAI_API_KEY is set
- Or run `claude setup-token`

### Port 9222 already in use
- Close existing Chrome instances
- Or the tool will reuse the existing instance

### Build errors
- Run `pnpm install` to ensure all dependencies are installed
- Check Node.js version (should be 14+)

## Advanced Usage

### Combine with shell scripts
```bash
#!/bin/bash
tsx src/cli.ts navigate "https://example.com"
RESULT=$(tsx src/cli.ts query "what is the title?")
echo $RESULT | jq -r '.result'
tsx src/cli.ts close
```

### Use in CI/CD
```yaml
- name: Run automation
  run: |
    export OPENAI_API_KEY=${{ secrets.OPENAI_API_KEY }}
    pnpm build
    tsx src/cli.ts navigate "https://staging.example.com"
    tsx src/cli.ts assert "the app is running"
    tsx src/cli.ts close
```
