<p align="center">
  <img alt="Midscene.js" width="260" src="https://github.com/user-attachments/assets/f60de3c1-dd6f-4213-97a1-85bf7c6e79e4">
</p>

# Midscene Skills

<strong> Vision-driven cross-platform automation </strong>

- Natural-language driven UI control
- Built on [Midscene.js](https://midscenejs.com)'s vision-based automation capabilities
- Multiple platforms supported
  - Browser: Puppeteer (headless Chrome), or Chrome Bridge (user's own Chrome browser)
  - Desktop: macOS, Windows, Linux
  - Android: controlled via ADB
  - iOS: controlled via WebDriverAgent

## Installation

Make sure you have [Node.js](https://nodejs.org) installed.

Then install the skills:

```bash
npx skills add midscene/skills
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
| **Zhipu GLM-4.6V** | Z.AI / BigModel | New | Newly integrated; weights on HuggingFace |
| **Gemini-3-Pro / Flash** | Google Cloud | ⭐⭐⭐ | Higher pricing than alternatives |


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

Each platform has its own CLI package. The AI agent calls `npx @midscene/<platform> <command>` - npx auto-downloads on first use, no pre-installation needed.

The agent follows a **screenshot -> analyze -> act** loop: take a screenshot, decide what to do, execute one action, repeat.

## Skill Structure

Each skill contains:
- `SKILL.md` - Instructions for the agent (commands, workflow, best practices)

## License

MIT
