import { defineConfig, devices } from '@playwright/test';

const port = Number(process.env.PLAYWRIGHT_APP_PORT || (process.env.CI ? 5174 : 3000));

export default defineConfig({
  testDir: './tests/e2e',

  timeout: 120_000,

  expect: {
    timeout: 30_000,
  },

  fullyParallel: false,

  workers: 1,

  reporter: [['json']],

  use: {
    baseURL: `http://127.0.0.1:${port}`,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],

  webServer: {
    command: `npx expo start --web --port ${port}`,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});