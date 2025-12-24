import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';
import type { Page } from 'puppeteer-core';

const execAsync = promisify(exec);

// Resolve plugin root directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function getPluginRoot(): string {
  // Handle both src/browser-utils.ts and dist/src/browser-utils.js
  // If we're in dist/src, go up two levels to get to dist, then up one more
  // If we're in src, go up one level
  const parts = __dirname.split('/');
  if (parts[parts.length - 2] === 'dist' && parts[parts.length - 1] === 'src') {
    // dist/src/browser-utils.js -> dist/src -> dist -> project-root
    return join(__dirname, '..', '..');
  } else {
    // src/browser-utils.ts -> src -> project-root
    return join(__dirname, '..');
  }
}

/**
 * Find local Chrome installation
 */
export function findLocalChrome(): string | null {
  const platform = process.platform;
  
  const chromePaths = {
    darwin: [
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Chromium.app/Contents/MacOS/Chromium',
    ],
    win32: [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    ],
    linux: [
      '/usr/bin/google-chrome',
      '/usr/bin/chromium-browser',
      '/usr/bin/chromium',
    ],
  };

  const paths = chromePaths[platform as keyof typeof chromePaths] || [];
  
  for (const path of paths) {
    if (existsSync(path)) {
      return path;
    }
  }

  return null;
}

/**
 * Prepare Chrome profile directory
 */
export function prepareChromeProfile(pluginRoot: string): void {
  const profileDir = join(pluginRoot, '.chrome-profile');
  if (!existsSync(profileDir)) {
    mkdirSync(profileDir, { recursive: true });
  }

  // Create screenshots directory
  const screenshotsDir = join(pluginRoot, 'agent', 'browser_screenshots');
  if (!existsSync(screenshotsDir)) {
    mkdirSync(screenshotsDir, { recursive: true });
  }

  // Create downloads directory
  const downloadsDir = join(pluginRoot, 'agent', 'downloads');
  if (!existsSync(downloadsDir)) {
    mkdirSync(downloadsDir, { recursive: true });
  }
}

/**
 * Take a screenshot and save it
 */
export async function takeScreenshot(page: Page, pluginRoot: string): Promise<string> {
  const screenshotsDir = join(pluginRoot, 'agent', 'browser_screenshots');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const screenshotPath = join(screenshotsDir, `screenshot-${timestamp}.png`);
  
  await page.screenshot({ path: screenshotPath, fullPage: false });
  
  return screenshotPath;
}


/**
 * Verify if a process is Chrome
 */
export async function verifyIsChromeProcess(pid: number): Promise<boolean> {
  try {
    if (process.platform === 'darwin' || process.platform === 'linux') {
      const { stdout } = await execAsync(`ps -p ${pid} -o comm=`);
      const processName = stdout.trim().toLowerCase();
      return processName.includes('chrome') || processName.includes('chromium');
    } else if (process.platform === 'win32') {
      const { stdout } = await execAsync(`tasklist /FI "PID eq ${pid}" /FO CSV /NH`);
      return stdout.toLowerCase().includes('chrome');
    }
    return false;
  } catch {
    return false;
  }
}
