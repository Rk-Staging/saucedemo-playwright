import { defineConfig, devices } from '@playwright/test';
import baseConfig from './playwright.config';

// Config used only to record demo videos (B-roll) of the checkout flow
export default defineConfig({
  ...baseConfig,
  testMatch: /checkout\.spec\.ts/,
  grep: /complete purchase/,
  workers: 1,
  retries: 0,
  outputDir: './test-results-video',
  reporter: 'list',
  use: {
    ...baseConfig.use,
    headless: false,
    viewport: { width: 1280, height: 720 },
    video: { mode: 'on', size: { width: 1280, height: 720 } },
    launchOptions: { slowMo: 600 },
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 720 } } },
  ],
});
