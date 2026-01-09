# Midscene Browser Automation - Technical Reference

This document provides technical details about the Midscene CLI tool, its implementation, and API specifications.

## CLI Architecture

The Midscene CLI is built on top of:

- **Midscene Core** (`@midscene/core`) - AI-powered automation engine
- **Midscene Web** (`@midscene/web`) - Web-specific automation capabilities
- **Puppeteer Core** (`puppeteer-core`) - Browser control via Chrome DevTools Protocol
- **AI Vision Models** - OpenAI GPT-4 Vision, Claude, or compatible models

### Command Flow

```
User Command → CLI Parser → Browser Manager → Midscene Agent → AI Model → Browser Action → JSON Response
```

## Command Reference

### Navigate Command

**Syntax**: `node dist/src/cli.js navigate <url>`

**Parameters**:
- `url` (required): The URL to navigate to (must include protocol: http:// or https://)

**Behavior**:
1. Initializes browser if not already running
2. Navigates to the specified URL
3. Waits for page load
4. Takes a screenshot
5. Returns JSON response

**Response Format**:
```json
{
  "success": true,
  "message": "Successfully navigated to <url>",
  "screenshot": "/path/to/screenshot.png"
}
```

**Error Cases**:
- Invalid URL format
- Network timeout
- Page load failure
- Browser initialization error

---

### Act Command

**Syntax**: `node dist/src/cli.js act "<action>"`

**Parameters**:
- `action` (required): Natural language description of the action to perform

**Behavior**:
1. Uses Midscene AI to understand the action
2. Identifies target elements on the page using visual and semantic analysis
3. Performs the requested interaction (click, type, scroll, etc.)
4. Takes a screenshot of the result
5. Returns JSON response

**Response Format**:
```json
{
  "success": true,
  "message": "Successfully performed action: <action>",
  "screenshot": "/path/to/screenshot.png"
}
```

**Supported Action Types**:
- **Click**: "click the button", "click on the link"
- **Type**: "type 'text' into field", "enter text in input"
- **Scroll**: "scroll down", "scroll to element"
- **Select**: "select option from dropdown"
- **Hover**: "hover over element"
- **Press**: "press Enter", "press Tab"
- **Multi-step**: "type and press Enter", "click and wait"

**Error Cases**:
- Element not found
- Element not interactable
- Action timeout
- Ambiguous description

---

### Query Command

**Syntax**: `node dist/src/cli.js query "<query>"`

**Parameters**:
- `query` (required): Natural language question or data extraction request

**Behavior**:
1. Uses Midscene AI to analyze the current page
2. Extracts relevant information based on the query
3. Returns structured or unstructured data
4. Takes a screenshot
5. Returns JSON response

**Response Format**:
```json
{
  "success": true,
  "result": "<extracted data or answer>",
  "message": "Successfully queried: <query>",
  "screenshot": "/path/to/screenshot.png"
}
```

**Query Types**:
- **Questions**: "What is the page title?"
- **Data Extraction**: "List all product names"
- **Structured Data**: "Extract data in JSON format"
- **Counting**: "How many items are there?"
- **Comparison**: "Which price is higher?"

**Data Formats**:
- Plain text answers
- JSON objects or arrays (when requested)
- Comma-separated values
- Numbered lists

**Error Cases**:
- No matching data found
- Ambiguous query
- Page not loaded
- Timeout

---

### Assert Command

**Syntax**: `node dist/src/cli.js assert "<condition>"`

**Parameters**:
- `condition` (required): Natural language description of the condition to verify

**Behavior**:
1. Uses Midscene AI to evaluate the condition
2. Checks if the condition is true on the current page
3. Returns success/failure status
4. Takes a screenshot

**Response Format**:
```json
{
  "success": true,
  "message": "Assertion passed: <condition>"
}
```

Or on failure:
```json
{
  "success": false,
  "message": "Assertion failed: <condition>. Actual: <what was found>"
}
```

**Assertion Types**:
- **Visibility**: "the button is visible"
- **Content**: "the page contains 'text'"
- **Count**: "there are 5 items"
- **State**: "the user is logged in"
- **Comparison**: "price is less than $100"

**Error Cases**:
- Ambiguous condition
- Cannot determine truth value
- Timeout

---

### Screenshot Command

**Syntax**: `node dist/src/cli.js screenshot`

**Parameters**: None

**Behavior**:
1. Takes a full-page screenshot of the current browser state
2. Saves to `agent/browser_screenshots/` directory
3. Filename format: `screenshot-<ISO-timestamp>.png`

**Response Format**:
```json
{
  "success": true,
  "screenshot": "/path/to/screenshot.png"
}
```

---

### Close Command

**Syntax**: `node dist/src/cli.js close`

**Parameters**: None

**Behavior**:
1. Closes the current browser page
2. Terminates the browser process if we started it
3. Cleans up browser profile data
4. Removes PID file

**Response Format**:
```json
{
  "success": true,
  "message": "Browser closed"
}
```

## Browser Management

### Browser Instance Lifecycle

1. **Initialization**:
   - Checks if Chrome is running on port 9222
   - If not, launches new Chrome instance
   - Connects via Chrome DevTools Protocol
   - Creates PuppeteerAgent with AI capabilities

2. **Persistence**:
   - Browser stays open between commands
   - Page state is preserved
   - Cookies and sessions maintained
   - Faster subsequent operations

3. **Cleanup**:
   - Only closes on explicit `close` command
   - Terminates browser process
   - Removes temporary files
   - Clears PID tracking

### Chrome Profile

**Location**: `.chrome-profile/` in project root

**Contents**:
- User data directory for Chrome
- Cookies and session data
- Cache and local storage
- Browser extensions (if any)

**Behavior**:
- Created on first run
- Persists between sessions
- Allows logged-in states to persist

### Port Management

**CDP Port**: 9222 (Chrome DevTools Protocol)

**Behavior**:
- Checks if port is in use before launching
- Reuses existing Chrome instance if available
- Verifies connected process is actually Chrome

### PID Tracking

**PID File**: `.chrome-pid` in project root

**Purpose**:
- Track which Chrome process was started by the CLI
- Verify process is still running
- Ensure proper cleanup

## Screenshot Management

### Directory Structure

```
agent/
├── browser_screenshots/
│   ├── screenshot-2025-12-22T12-00-00-000Z.png
│   ├── screenshot-2025-12-22T12-01-30-000Z.png
│   └── ...
└── downloads/
    └── (downloaded files)
```

### Screenshot Behavior

- **Format**: PNG
- **Filename**: `screenshot-<ISO-timestamp>.png`
- **Full Page**: Captures entire scrollable area
- **Automatic**: Taken after navigate, act, query, assert commands
- **Manual**: Available via screenshot command

## Midscene Reports

### Report Location

```
midscene_run/
├── dump/
│   └── (debugging data)
├── log/
│   └── (execution logs)
└── report/
    └── puppeteer-<timestamp>-<hash>.html
```

### Report Contents

- Execution timeline
- Screenshots of each step
- AI model interactions
- Element identification process
- Error details (if any)

### Viewing Reports

Open the HTML file in a browser to see:
- Visual timeline of automation
- Screenshots at each step
- AI reasoning and decisions
- Performance metrics

## AI Model Configuration

### Supported Providers

1. **OpenAI**
   ```env
   OPENAI_BASE_URL=https://api.openai.com/v1
   OPENAI_API_KEY=your-key
   MIDSCENE_MODEL_NAME=gpt-4-vision-preview
   ```

2. **Anthropic**
   ```env
   ANTHROPIC_API_KEY=your-key
   MIDSCENE_MODEL_NAME=claude-3-opus
   ```

3. **Azure OpenAI**
   ```env
   AZURE_OPENAI_API_KEY=your-key
   AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com
   AZURE_OPENAI_DEPLOYMENT=your-deployment
   ```

4. **Custom Compatible API**
   ```env
   OPENAI_BASE_URL=https://your-api.com/v1
   OPENAI_API_KEY=your-key
   MIDSCENE_MODEL_NAME=your-model
   ```

### Model Requirements

- **Vision Capability**: Required (for screenshot analysis)
- **Context Window**: At least 128K tokens recommended
- **Function Calling**: Supported for better accuracy

## Error Handling

### Common Error Codes

1. **Browser Errors**:
   - Chrome not found
   - Port already in use
   - Connection timeout
   - Page load timeout

2. **Action Errors**:
   - Element not found
   - Element not interactable
   - Action timeout
   - Ambiguous selector

3. **API Errors**:
   - Invalid API key
   - Rate limit exceeded
   - Model not available
   - Context length exceeded

### Error Response Format

```json
{
  "success": false,
  "error": "Error message",
  "details": "Additional error details"
}
```

## Performance Considerations

### Speed Optimization

1. **Browser Reuse**: Keep browser open between commands (5-10x faster)
2. **Persistent Profile**: Reuse cookies and sessions
3. **CDP Connection**: Direct protocol communication
4. **Compiled Code**: Use `node dist/src/cli.js` instead of `tsx src/cli.ts`

### Resource Management

- **Memory**: Browser process ~200-500MB
- **Disk**: Screenshots accumulate over time
- **Network**: AI API calls for each action/query
- **CPU**: Minimal except during page rendering

### Rate Limiting

- **AI API**: Depends on provider (typically 60-100 requests/minute)
- **Browser Actions**: No inherent limits
- **Recommendations**: 
  - Batch queries when possible
  - Cache results when appropriate
  - Use assertions to avoid unnecessary queries

## Advanced Features

### Multi-Page Support

Currently single page. For multiple pages:
- Open in new tab manually via `act "open link in new tab"`
- Navigate to different URL
- Browser maintains all tabs

### File Downloads

Downloads go to `agent/downloads/` directory automatically.

### File Uploads

Use act command:
```bash
node dist/src/cli.js act "upload file /path/to/file.pdf to the file input"
```

### Custom Wait Times

Midscene handles waits automatically, but can specify:
```bash
node dist/src/cli.js act "wait for 5 seconds"
node dist/src/cli.js act "wait for the loading spinner to disappear"
```

### Complex Interactions

Chain multiple actions in one command:
```bash
node dist/src/cli.js act "scroll to the bottom, wait for more items to load, then click the Load More button"
```

## Debugging

### Enable Verbose Logging

Set environment variable:
```bash
DEBUG=midscene:* node dist/src/cli.js navigate https://example.com
```

### Check Midscene Reports

Open the HTML report in `midscene_run/report/` to see:
- What Midscene "saw" on the page
- How it interpreted your commands
- Where it tried to click/type
- Why actions failed

### Screenshot Analysis

Always check screenshots after commands to verify:
- Page loaded correctly
- Element was clicked
- Text was typed
- Expected result appeared

## API Integration

### Using from Node.js

```javascript
import { spawn } from 'child_process';

function runCommand(cmd, ...args) {
  return new Promise((resolve, reject) => {
    const proc = spawn('node', ['dist/src/cli.js', cmd, ...args]);
    let output = '';
    
    proc.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    proc.on('close', (code) => {
      if (code === 0) {
        resolve(JSON.parse(output));
      } else {
        reject(new Error('Command failed'));
      }
    });
  });
}

// Usage
const result = await runCommand('navigate', 'https://example.com');
console.log(result.screenshot);
```

### Using from Python

```python
import subprocess
import json

def run_command(cmd, *args):
    result = subprocess.run(
        ['node', 'dist/src/cli.js', cmd, *args],
        capture_output=True,
        text=True
    )
    return json.loads(result.stdout)

# Usage
result = run_command('navigate', 'https://example.com')
print(result['screenshot'])
```

## Security Considerations

1. **API Keys**: Store in `.env`, never commit to git
2. **Browser Profile**: Contains sensitive data (cookies, passwords)
3. **Screenshots**: May contain sensitive information
4. **Downloads**: Verify downloaded files before executing
5. **Port 9222**: Only bind to localhost

## Troubleshooting Guide

See [SKILL.md](SKILL.md) Troubleshooting section for common issues and solutions.

## Further Resources

- [Midscene Documentation](https://midscenejs.com)
- [Midscene GitHub](https://github.com/web-infra-dev/midscene)
- [Model Configuration Guide](https://midscenejs.com/model-config.html)
- [Puppeteer Documentation](https://pptr.dev)
