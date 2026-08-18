import { defineConfig } from '@playwright/test';

const port = process.env.PLAYWRIGHT_APP_PORT || (process.env.CI ? '5174' : '3000');

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: process.env.CI ? 'json' : 'list',
  use: {
    baseURL: `http://localhost:${port}`,
  },
  webServer: {
    command: 'node src/server.js',
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
    env: { PORT: port },
  },
});