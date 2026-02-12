# Midscene Skills

AI skills for cross-platform automation, powered by [Midscene](https://midscenejs.com). Control web browsers, computers, Android devices, and iOS devices with natural language.

Skills follow the [Agent Skills](https://agentskills.io/) format.

## Available Skills

### browser

Browser automation via Puppeteer (headless Chrome). Launches a persistent browser session for web scraping, form filling, UI testing, and multi-step workflows.

**Use when:**
- "Open Hacker News and tell me the top 3 stories"
- "Fill out the login form on example.com"
- "Take a screenshot of this page"
- "Verify the frontend renders correctly"

**CLI:** `npx @midscene/web`

### chrome-bridge

Automate the user's real Chrome browser via the Midscene Chrome Extension, preserving cookies, sessions, and login state.

**Use when:**
- "Browse my Gmail and summarize new emails"
- "Add this item to my shopping cart"
- "Navigate to my dashboard and export the report"

**CLI:** `npx @midscene/web --bridge`

### computer-automation

Control the computer (macOS, Windows, Linux) with natural language — click, type, keyboard shortcuts, app launching, and more.

**Use when:**
- "Take a screenshot of my computer"
- "Open Visual Studio Code"
- "Press Command+Space and search for Safari"

**CLI:** `npx @midscene/computer`

### android-automation

Android device automation via ADB. Tap, swipe, type, launch apps, and take screenshots on connected Android devices.

**Use when:**
- "Open the Settings app on my Android phone"
- "Tap the search icon and type hello"
- "Scroll down and take a screenshot"

**CLI:** `npx @midscene/android`

### ios-automation

iOS device and simulator automation via WebDriverAgent. Tap, swipe, type, and launch apps on iPhones and iPads.

**Use when:**
- "Check what Wi-Fi network my iPhone is connected to"
- "Open Safari and navigate to example.com"
- "Tap Delete, then confirm in the alert dialog"

**CLI:** `npx @midscene/ios`

## Installation

```bash
npx skills add web-infra-dev/midscene-skills
```

## Setup

Create a `.env` file in your project directory with the model configuration:

```bash
MIDSCENE_MODEL_API_KEY="your-api-key"
MIDSCENE_MODEL_NAME="model-name"
MIDSCENE_MODEL_BASE_URL="https://..."
MIDSCENE_MODEL_FAMILY="family-identifier"
```

### Recommended models

| Model | Provider | Rating | Notes |
|-------|----------|--------|-------|
| **Doubao Seed 1.6** | VolcEngine | ⭐⭐⭐⭐ | Strong UI planning; slightly slower |
| **Qwen3-VL** | Alibaba Cloud / OpenRouter / Ollama | ⭐⭐⭐⭐ | Excellent performance; open-source builds available |
| **Qwen2.5-VL** | Alibaba Cloud / OpenRouter | ⭐⭐⭐ | Behind Qwen3-VL in quality |
| **Zhipu GLM-4.6V** | Z.AI / BigModel | New | Newly integrated; weights on HuggingFace |
| **Gemini-3-Pro / Flash** | Google Cloud | ⭐⭐⭐ | Higher pricing than alternatives |
| **UI-TARS** | VolcEngine | ⭐⭐ | Variable results; open-source versions exist |

> **Note:** GPT-4o is no longer supported as a planning model. See [Model Strategy](https://midscenejs.com/model-strategy.html) for the full strategy guide, multi-model configuration, and performance tuning.

## Usage

Skills are automatically available once installed. The agent will use them when relevant tasks are detected.

**Examples:**
```
Open Hacker News and tell me the top 3 stories
```
```
Take a screenshot of my computer
```
```
Open the Settings app on my Android phone
```
```
Check what Wi-Fi network my iPhone is connected to
```

## How It Works

Each platform has its own CLI package. The AI agent calls `npx @midscene/<platform> <command>` — npx auto-downloads on first use, no pre-installation needed.

The agent follows a **screenshot → analyze → act** loop: take a screenshot, decide what to do, execute one action, repeat.

## Skill Structure

Each skill contains:
- `SKILL.md` - Instructions for the agent (commands, workflow, best practices)

## License

MIT
