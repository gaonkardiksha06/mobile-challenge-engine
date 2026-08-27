import { defineConfig } from '@playwright/test';

// Decide port dynamically: use CI port if set, otherwise default to 3000
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
    // ✅ Use the same entry point as your package.json scripts
    command: 'npm run dev',
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
    env: { PORT: port },
  },
});
