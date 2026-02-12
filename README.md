<p align="center">
  <img alt="Midscene.js" width="260" src="https://github.com/user-attachments/assets/f60de3c1-dd6f-4213-97a1-85bf7c6e79e4">
</p>

# Midscene Skills

<strong> Vision-driven cross-platform automation </strong>

- Natural-language driven UI control
- Built on [Midscene.js](https://midscenejs.com)'s vision-based automation capabilities
- This repository contains Skills for the following platforms:
  - Browser (Puppeteer, headless Chrome): [`skills/browser`](skills/browser)
  - Chrome Bridge (user's own Chrome browser): [`skills/chrome-bridge`](skills/chrome-bridge)
  - Desktop (macOS, Windows, Linux): [`skills/computer-automation`](skills/computer-automation)
  - Android (controlled via ADB): [`skills/android-automation`](skills/android-automation)
  - iOS (controlled via WebDriverAgent): [`skills/ios-automation`](skills/ios-automation)

## Installation

Make sure you have [Node.js](https://nodejs.org) installed.

Then install the skills:

```bash
npx skills add midscene/skills
```

## Model Setup

Midscene requires models with strong **visual grounding** capabilities (accurate UI element localization from screenshots).  
Because of this, you need to prepare model access and configuration separately from skill installation.

Make sure these environment variables are available in your system. You can also define them in a `.env` file in the current directory, and Midscene will load them automatically:

```bash
MIDSCENE_MODEL_API_KEY="your-api-key"
MIDSCENE_MODEL_NAME="model-name"
MIDSCENE_MODEL_BASE_URL="https://..."
MIDSCENE_MODEL_FAMILY="family-identifier"
```

Example: Gemini (Gemini-3-Flash)

```bash
MIDSCENE_MODEL_API_KEY="your-google-api-key"
MIDSCENE_MODEL_NAME="gemini-3-flash"
MIDSCENE_MODEL_BASE_URL="https://generativelanguage.googleapis.com/v1beta/openai/"
MIDSCENE_MODEL_FAMILY="openai"
```

Example: Qwen3-VL

```bash
MIDSCENE_MODEL_API_KEY="your-api-key"
MIDSCENE_MODEL_NAME="qwen3-vl"
MIDSCENE_MODEL_BASE_URL="https://your-qwen-compatible-endpoint/v1"
MIDSCENE_MODEL_FAMILY="openai"
```

Example: Doubao Seed 1.6

```bash
MIDSCENE_MODEL_API_KEY="your-doubao-api-key"
MIDSCENE_MODEL_NAME="doubao-seed-1-6-250615"
MIDSCENE_MODEL_BASE_URL="https://ark.cn-beijing.volces.com/api/v3"
MIDSCENE_MODEL_FAMILY="openai"
```

Commonly used models: Doubao Seed 1.6, Qwen3-VL, Zhipu GLM-4.6V, Gemini-3-Pro, Gemini-3-Flash.

Model setup docs:

- Midscene model strategy: https://midscenejs.com/model-strategy
- Qwen3-VL: https://midscenejs.com/model-common-config#qwen3-vl
- Gemini-3-Flash: https://midscenejs.com/model-common-config#gemini-3-pro-and-gemini-3-flash
- Doubao Seed 1.6: https://midscenejs.com/model-common-config




## License

MIT
