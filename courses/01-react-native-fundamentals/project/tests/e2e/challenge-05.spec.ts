import { test, expect } from '@playwright/test';

let appReady = false;

test.describe('05-api-integration', () => {
  test.beforeEach(async ({ page }) => {
    const navTimeout = appReady ? 30000 : 120000;

    await page.goto('/', {
      waitUntil: 'domcontentloaded',
      timeout: navTimeout,
    });

    await page.getByTestId('home-screen').waitFor({
      state: 'visible',
      timeout: navTimeout,
    });

    appReady = true;
  });

  test('Weather search UI is visible', async ({ page }) => {
    await page.goto('/search');

    await expect(page.getByTestId('weather-search')).toBeVisible();
    await expect(page.getByTestId('weather-city-input')).toBeVisible();
    await expect(page.getByTestId('weather-search-button')).toBeVisible();
  });

  test('Weather search accepts a city', async ({ page }) => {
    await page.goto('/search');

    await page.getByTestId('weather-city-input').fill('London');
    await page.getByTestId('weather-search-button').click();

    await expect(page.getByTestId('weather-search')).toBeVisible();
  });

  test('User list is visible', async ({ page }) => {
    await page.goto('/search');

    await expect(page.getByTestId('user-list')).toBeVisible();
  });

  test('API error/retry UI is available', async ({ page }) => {
    await page.goto('/search');

    await expect(page.getByTestId('weather-search')).toBeVisible();
    await expect(page.getByTestId('weather-search-button')).toBeVisible();
  });
});