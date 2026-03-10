---
title: Web Test Pattern
impact: CRITICAL
tags: pattern, web, playwright, browser, lifecycle
---

# Web Test Pattern

Uses `WebTest` from `src/context`. Each test gets a new browser page on a shared Chromium instance.

- `ctx.agent` = `PlaywrightAgent` — AI methods (`aiTap`, `aiInput`, `aiAssert`, `aiQuery`, `aiWaitFor`, `aiAct`)
- `ctx.page` = Playwright `Page` — native browser APIs (`waitForLoadState`, `goto`, `title`, etc.)

## Lifecycle

```typescript
const ctx = WebTest.setup('https://example.com', options?);  // registers all hooks automatically

it('scenario', async () => {
  await ctx.agent.aiAct('...');
  await ctx.page.waitForLoadState('networkidle');
  await ctx.agent.aiAssert('...');
});
```

Under the hood, `setup()` registers these hooks:

| Hook | What happens |
|------|-------------|
| `beforeAll` | Launch shared Chromium browser |
| `beforeEach` | Open new page, navigate to URL, create fresh `PlaywrightAgent` |
| `afterEach` | Collect test report, close page |
| `afterAll` | Merge reports + close browser |

## Scaffolding Pattern

```typescript
import { describe, it, expect } from 'vitest';
import { WebTest } from '../../src/context';

describe('<FEATURE_NAME>', () => {
  const ctx = WebTest.setup('<TARGET_URL>');

  it('<SCENARIO_1>', async () => {
    // Step 1: interact
    await ctx.agent.aiAct('<describe the interaction>');

    // Step 2: wait for result
    await ctx.page.waitForLoadState('networkidle');

    // Step 3: verify
    await ctx.agent.aiAssert('<expected state>');
  });

  it('<SCENARIO_2>', async () => {
    // ...
  });
});
```

## Setup Options

```typescript
const ctx = WebTest.setup('https://example.com', {
  headless: false,                         // show browser window (for debugging)
  viewport: { width: 1280, height: 720 }, // custom viewport
  agentOptions: {                          // passed to PlaywrightAgent
    aiActionContext: 'You are a Web UI testing expert.',
    waitAfterAction: 500,
  },
});
```

## Web-Specific Tips

- Use `ctx.page.waitForLoadState('networkidle')` after navigation or form submission before asserting
- `ctx.page` supports all standard Playwright Page APIs — see [playwright-api.md](../apis/playwright-api.md)
