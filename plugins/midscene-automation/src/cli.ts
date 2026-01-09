#!/usr/bin/env node
import { PuppeteerAgent } from '@midscene/web/puppeteer';
import puppeteer, { Browser, Page as PuppeteerPage } from 'puppeteer-core';
import { existsSync, mkdirSync, writeFileSync, readFileSync, unlinkSync } from 'fs';
import { spawn, ChildProcess } from 'child_process';
import { join } from 'path';
import { 
  findLocalChrome, 
  prepareChromeProfile, 
  takeScreenshot, 
  getPluginRoot,
  verifyIsChromeProcess
} from './browser-utils.js';
import dotenv from 'dotenv';

// Validate ES module environment
if (!import.meta.url) {
  console.error('Error: This script must be run as an ES module');
  console.error('Ensure your package.json has "type": "module" and Node.js version is 14+');
  process.exit(1);
}

const PLUGIN_ROOT = getPluginRoot();

// Load .env from plugin root directory
dotenv.config({ path: join(PLUGIN_ROOT, '.env') });

// Persistent browser state
let browserInstance: Browser | null = null;
let puppeteerPageInstance: PuppeteerPage | null = null;
let agentInstance: PuppeteerAgent | null = null;
let chromeProcess: ChildProcess | null = null;
let weStartedChrome = false; // Track if we launched Chrome vs. reused existing

async function initBrowser(): Promise<PuppeteerAgent> {
  if (agentInstance && puppeteerPageInstance) {
    return agentInstance;
  }

  const chromePath = findLocalChrome();
  if (!chromePath) {
    throw new Error('Could not find Chrome installation');
  }

  const cdpPort = 9222;
  const tempUserDataDir = join(PLUGIN_ROOT, '.chrome-profile');

  // Check if Chrome is already running on the CDP port
  let chromeReady = false;
  try {
    const response = await fetch(`http://127.0.0.1:${cdpPort}/json/version`);
    if (response.ok) {
      chromeReady = true;
      console.error('Reusing existing Chrome instance on port', cdpPort);
    }
  } catch (error) {
    // Chrome not running, need to launch it
  }

  // Launch Chrome if not already running
  if (!chromeReady) {
    chromeProcess = spawn(chromePath, [
      `--remote-debugging-port=${cdpPort}`,
      `--user-data-dir=${tempUserDataDir}`,
      '--window-position=-9999,-9999', // Launch minimized off-screen
      '--window-size=1250,900',
    ], {
      stdio: 'ignore', // Ignore stdio to prevent pipe buffer blocking
      detached: false,
    });

    // Store PID for safe cleanup later
    if (chromeProcess.pid) {
      const pidFilePath = join(PLUGIN_ROOT, '.chrome-pid');
      writeFileSync(pidFilePath, JSON.stringify({
        pid: chromeProcess.pid,
        startTime: Date.now()
      }));
    }

    // Wait for Chrome to be ready
    for (let i = 0; i < 50; i++) {
      try {
        const response = await fetch(`http://127.0.0.1:${cdpPort}/json/version`);
        if (response.ok) {
          chromeReady = true;
          weStartedChrome = true; // Mark that we started this Chrome instance
          break;
        }
      } catch (error) {
        // Still waiting
      }
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    if (!chromeReady) {
      throw new Error('Chrome failed to start');
    }
  }

  // Get the WebSocket debugger URL from Chrome
  const versionResponse = await fetch(`http://127.0.0.1:${cdpPort}/json/version`);
  const versionData: any = await (versionResponse as any).json();
  const webSocketDebuggerUrl = versionData.webSocketDebuggerUrl;

  // Connect to Chrome via Puppeteer
  browserInstance = await puppeteer.connect({
    browserWSEndpoint: webSocketDebuggerUrl,
  });

  // Get or create a page
  const pages = await browserInstance.pages();
  if (pages.length > 0) {
    puppeteerPageInstance = pages[0];
  } else {
    puppeteerPageInstance = await browserInstance.newPage();
  }

  // Initialize Midscene Agent
  agentInstance = new PuppeteerAgent(puppeteerPageInstance, {});

  // Configure downloads
  const downloadsPath = join(PLUGIN_ROOT, 'agent', 'downloads');
  if (!existsSync(downloadsPath)) {
    mkdirSync(downloadsPath, { recursive: true });
  }

  return agentInstance;
}

async function closeBrowser() {
  const cdpPort = 9222;
  const pidFilePath = join(PLUGIN_ROOT, '.chrome-pid');

  // First, close the browser instance
  if (browserInstance) {
    try {
      await browserInstance.disconnect();
    } catch (error) {
      console.error('Error disconnecting browser:', error instanceof Error ? error.message : String(error));
    }
    browserInstance = null;
    puppeteerPageInstance = null;
    agentInstance = null;
  }

  // If we started Chrome in this process, kill it
  if (chromeProcess && weStartedChrome) {
    try {
      chromeProcess.kill('SIGTERM');
      // Wait briefly for graceful shutdown
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (chromeProcess.exitCode === null) {
        chromeProcess.kill('SIGKILL');
      }
    } catch (error) {
      console.error('Error killing Chrome process:', error instanceof Error ? error.message : String(error));
    }
    chromeProcess = null;
    weStartedChrome = false;
  }

  // For separate CLI invocations, use PID file verification
  try {
    // Check if Chrome is still running
    try {
      const checkResponse = await fetch(`http://127.0.0.1:${cdpPort}/json/version`, {
        signal: AbortSignal.timeout(1000)
      });

      // Chrome is still running, need to force close
      if (checkResponse.ok && existsSync(pidFilePath)) {
        const pidData = JSON.parse(readFileSync(pidFilePath, 'utf8'));
        const { pid } = pidData;

        // Verify the process is actually Chrome before killing
        const isChrome = await verifyIsChromeProcess(pid);
        if (isChrome) {
          if (process.platform === 'win32') {
            const { exec } = await import('child_process');
            const { promisify } = await import('util');
            const execAsync = promisify(exec);
            await execAsync(`taskkill /PID ${pid} /F`);
          } else {
            process.kill(pid, 'SIGKILL');
          }
        }
      }
    } catch {
      // Chrome successfully closed or not running
    }
  } catch (error) {
    // Ignore cleanup errors
  } finally {
    // Clean up PID file
    if (existsSync(pidFilePath)) {
      try {
        unlinkSync(pidFilePath);
      } catch {
        // Ignore cleanup errors
      }
    }
  }
}

// CLI commands
async function navigate(url: string) {
  try {
    const agent = await initBrowser();
    if (!puppeteerPageInstance) throw new Error('Puppeteer page not initialized');
    
    await puppeteerPageInstance.goto(url);
    const screenshotPath = await takeScreenshot(puppeteerPageInstance, PLUGIN_ROOT);
    return {
      success: true,
      message: `Successfully navigated to ${url}`,
      screenshot: screenshotPath
    };
  } catch (error) {
    console.error('Navigate error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : JSON.stringify(error, Object.getOwnPropertyNames(error))
    };
  }
}

async function act(action: string) {
  try {
    const agent = await initBrowser();
    await (agent as any).aiAct(action);
    
    if (!puppeteerPageInstance) throw new Error('Puppeteer page not initialized');
    const screenshotPath = await takeScreenshot(puppeteerPageInstance, PLUGIN_ROOT);
    return {
      success: true,
      message: `Successfully performed action: ${action}`,
      screenshot: screenshotPath
    };
  } catch (error) {
    console.error('Act error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : JSON.stringify(error, Object.getOwnPropertyNames(error))
    };
  }
}

async function query(queryString: string) {
  try {
    const agent = await initBrowser();
    const result = await (agent as any).aiQuery(queryString);
    
    if (!puppeteerPageInstance) throw new Error('Puppeteer page not initialized');
    const screenshotPath = await takeScreenshot(puppeteerPageInstance, PLUGIN_ROOT);
    return {
      success: true,
      result: result,
      message: `Successfully queried: ${queryString}`,
      screenshot: screenshotPath
    };
  } catch (error) {
    console.error('Query error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : JSON.stringify(error, Object.getOwnPropertyNames(error))
    };
  }
}

async function assertCondition(condition: string) {
  try {
    const agent = await initBrowser();
    await (agent as any).aiAssert(condition);
    
    if (!puppeteerPageInstance) throw new Error('Puppeteer page not initialized');
    const screenshotPath = await takeScreenshot(puppeteerPageInstance, PLUGIN_ROOT);
    return {
      success: true,
      message: `Assertion passed: ${condition}`,
      screenshot: screenshotPath
    };
  } catch (error) {
    console.error('Assert error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : JSON.stringify(error, Object.getOwnPropertyNames(error))
    };
  }
}

async function screenshot() {
  try {
    const agent = await initBrowser();
    if (!puppeteerPageInstance) throw new Error('Puppeteer page not initialized');
    
    const screenshotPath = await takeScreenshot(puppeteerPageInstance, PLUGIN_ROOT);
    return {
      success: true,
      screenshot: screenshotPath
    };
  } catch (error) {
    console.error('Screenshot error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : JSON.stringify(error, Object.getOwnPropertyNames(error))
    };
  }
}

// Main CLI handler
async function main() {
  // Prepare Chrome profile on first run
  prepareChromeProfile(PLUGIN_ROOT);

  const args = process.argv.slice(2);
  const command = args[0];

  try {
    let result: { success: boolean; [key: string]: any };

    switch (command) {
      case 'navigate':
        if (args.length < 2) {
          throw new Error('Usage: midscene navigate <url>');
        }
        result = await navigate(args[1]);
        break;

      case 'act':
        if (args.length < 2) {
          throw new Error('Usage: midscene act "<action>"');
        }
        result = await act(args.slice(1).join(' '));
        break;

      case 'query':
        if (args.length < 2) {
          throw new Error('Usage: midscene query "<query>"');
        }
        result = await query(args.slice(1).join(' '));
        break;

      case 'assert':
        if (args.length < 2) {
          throw new Error('Usage: midscene assert "<condition>"');
        }
        result = await assertCondition(args.slice(1).join(' '));
        break;

      case 'screenshot':
        result = await screenshot();
        break;

      case 'close':
        await closeBrowser();
        result = { success: true, message: 'Browser closed' };
        break;

      default:
        throw new Error(`Unknown command: ${command}\\nAvailable commands: navigate, act, query, assert, screenshot, close`);
    }

    console.log(JSON.stringify(result, null, 2));

    // Browser stays open between commands - only closes on explicit 'close' command
    // This allows for faster sequential operations and preserves browser state

    // Exit immediately after printing result
    process.exit(0);
  } catch (error) {
    // Close browser on error too
    await closeBrowser();

    console.error(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    }, null, 2));
    process.exit(1);
  }
}

// Handle cleanup
process.on('SIGINT', async () => {
  await closeBrowser();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await closeBrowser();
  process.exit(0);
});

main().catch(console.error);
