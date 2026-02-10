# Web Browser Automation -- Reference

## CLI Architecture

The web automation skill is built on the `@midscene/cli` package, which provides a command-line interface for browser automation. The architecture stack:

```
npx @midscene/cli skill web <command>
        |
    @midscene/cli        -- CLI entry point and command routing
        |
    @midscene/web        -- Web automation API (PuppeteerAgent / BridgeAgent)
        |
    puppeteer            -- Browser control (Puppeteer mode)
    or Chrome Extension  -- Browser control (Bridge mode)
        |
    @midscene/core       -- AI-powered visual understanding engine
```

`npx` automatically downloads and caches `@midscene/cli` on first use. No manual installation required.

## Modes of Operation

### Puppeteer Mode (Default)

- Launches a new Chrome instance automatically
- Uses a dedicated user data directory (isolated profile)
- Chrome runs with remote debugging enabled on port 9222
- Reuses an existing Chrome instance if one is already running on the debug port
- Best for automated, repeatable tasks

```bash
npx @midscene/cli skill web navigate "https://example.com"
```

### Bridge Mode (--bridge)

- Connects to an existing Chrome browser via the Midscene Chrome Extension
- Preserves cookies, sessions, and authentication state
- Interacts with the currently active tab
- Requires the Midscene Chrome Extension to be installed and enabled

```bash
npx @midscene/cli skill web navigate "https://example.com" --bridge
```

Add `--bridge` to any command to use Bridge mode:

```bash
npx @midscene/cli skill web act "click the menu button" --bridge
npx @midscene/cli skill web query "get the page title" --bridge
npx @midscene/cli skill web assert "user is logged in" --bridge
npx @midscene/cli skill web screenshot --bridge
```

## Command Reference

### navigate

Open a URL in the browser.

```bash
npx @midscene/cli skill web navigate "<url>" [--bridge]
```

**Arguments:**
- `url` (required): The full URL to navigate to (include `https://` or `http://`)

**Response:**
```json
{
  "success": true,
  "message": "Successfully navigated to https://example.com",
  "screenshot": "/tmp/midscene-screenshot-1234567890.png"
}
```

### act

Perform an interaction on the current page using natural language.

```bash
npx @midscene/cli skill web act "<action description>" [--bridge]
```

**Arguments:**
- `action description` (required): Natural language description of the action to perform

**Supported actions:**
- Click elements: `"click the Submit button"`
- Type text: `"type 'hello' into the search box"`
- Select options: `"select 'Medium' from the size dropdown"`
- Scroll: `"scroll down to the footer"`
- Hover: `"hover over the user menu"`
- Keyboard: `"press Enter"`, `"press Escape"`
- Drag: `"drag the slider to 50%"`

**Response:**
```json
{
  "success": true,
  "message": "Successfully performed action: click the Submit button",
  "screenshot": "/tmp/midscene-screenshot-1234567891.png"
}
```

### query

Extract data from the current page using natural language.

```bash
npx @midscene/cli skill web query "<query description>" [--bridge]
```

**Arguments:**
- `query description` (required): Natural language description of what data to extract

**Response:**
```json
{
  "success": true,
  "message": "Successfully queried: what are the product names?",
  "screenshot": "/tmp/midscene-screenshot-1234567892.png",
  "result": ["Product A", "Product B", "Product C"]
}
```

The `result` field can contain strings, arrays, objects, or any structured data depending on the query.

### assert

Verify a condition on the current page. Passes if the condition is true, fails otherwise.

```bash
npx @midscene/cli skill web assert "<condition>" [--bridge]
```

**Arguments:**
- `condition` (required): Natural language description of the condition to verify

**Success response:**
```json
{
  "success": true,
  "message": "Assertion passed: the login form is visible",
  "screenshot": "/tmp/midscene-screenshot-1234567893.png"
}
```

**Failure response:**
```json
{
  "success": false,
  "error": "Assertion failed: the login form is visible"
}
```

### screenshot

Capture a screenshot of the current page state.

```bash
npx @midscene/cli skill web screenshot [--bridge]
```

**Response:**
```json
{
  "success": true,
  "screenshot": "/tmp/midscene-screenshot-1234567894.png"
}
```

### close

Close the browser and clean up resources.

```bash
npx @midscene/cli skill web close
```

**Response:**
```json
{
  "success": true,
  "message": "Browser closed"
}
```

## JSON Response Format

All commands output JSON to stdout. The standard fields are:

| Field        | Type    | Present       | Description                                      |
|-------------|---------|---------------|--------------------------------------------------|
| `success`   | boolean | Always        | Whether the command completed successfully       |
| `message`   | string  | On success    | Human-readable status message                    |
| `screenshot`| string  | On success    | Absolute path to the screenshot PNG file         |
| `result`    | any     | query only    | Extracted data from the page                     |
| `error`     | string  | On failure    | Error message describing what went wrong         |

## AI Model Configuration

The CLI requires an AI model API key to power visual understanding. Configure via environment variables.

### Required

```bash
export MIDSCENE_MODEL_API_KEY="your-api-key"
```

### Optional

```bash
export MIDSCENE_MODEL_NAME="gpt-4o"           # Model name (default varies by provider)
export MIDSCENE_MODEL_BASE_URL="https://..."   # Custom API endpoint
```

### Provider Examples

**OpenAI:**
```bash
export MIDSCENE_MODEL_API_KEY="sk-..."
export MIDSCENE_MODEL_NAME="gpt-4o"
```

**Anthropic:**
```bash
export MIDSCENE_MODEL_API_KEY="sk-ant-..."
export MIDSCENE_MODEL_NAME="claude-sonnet-4-20250514"
export MIDSCENE_MODEL_BASE_URL="https://api.anthropic.com/v1"
```

**Azure OpenAI:**
```bash
export MIDSCENE_MODEL_API_KEY="your-azure-key"
export MIDSCENE_MODEL_NAME="your-deployment-name"
export MIDSCENE_MODEL_BASE_URL="https://your-resource.openai.azure.com/openai/deployments/your-deployment"
```

**Custom / Self-hosted (OpenAI-compatible):**
```bash
export MIDSCENE_MODEL_API_KEY="your-key"
export MIDSCENE_MODEL_NAME="your-model"
export MIDSCENE_MODEL_BASE_URL="http://localhost:8080/v1"
```

See the full [Model Configuration Documentation](https://midscenejs.com/zh/model-common-config.html) for all supported providers and options.

## Screenshot Management

- Screenshots are saved as PNG files in the system temporary directory (e.g., `/tmp/` on macOS/Linux).
- Each screenshot has a unique filename based on a timestamp: `midscene-screenshot-<timestamp>.png`.
- Screenshot paths are returned in the JSON response as absolute paths.
- Use the Read tool to view screenshot contents for visual verification.
- Screenshots are not automatically cleaned up; they persist in the temp directory until system cleanup or manual deletion.

## Error Handling

### Command Errors

When a command fails, the JSON response includes `"success": false` and an `error` field:

```json
{
  "success": false,
  "error": "Could not find Chrome installation"
}
```

### Common Error Patterns

| Error                                | Cause                                      | Solution                                           |
|--------------------------------------|--------------------------------------------|----------------------------------------------------|
| Could not find Chrome installation   | Chrome is not installed                    | Install Google Chrome                              |
| Chrome failed to start               | Port 9222 conflict or permissions issue    | Run `close` command; check for other Chrome debug instances |
| MIDSCENE_MODEL_API_KEY not set       | Missing API key                            | Set the environment variable                       |
| Navigation timeout                   | Page took too long to load                 | Retry or check the URL                             |
| Assertion failed                     | Page state does not match the condition    | Review the screenshot and adjust assertion         |
| Element not found                    | AI could not locate the described element  | Rephrase the action with more specific description |

### Process Exit Codes

- `0`: Command succeeded
- `1`: Command failed (error details in JSON output)

## Midscene Documentation Links

- [Midscene Home](https://midscenejs.com/)
- [Model Configuration](https://midscenejs.com/zh/model-common-config.html)
- [Bridge Mode (Chrome Extension)](https://midscenejs.com/bridge-mode-by-chrome-extension.html)
- [API Reference](https://midscenejs.com/api.html)
- [GitHub Repository](https://github.com/web-infra-dev/midscene)
