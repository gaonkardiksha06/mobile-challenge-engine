import { test, expect } from '@playwright/test';

let appReady = false;

test.describe('02-navigation-system', () => {
  test.beforeEach(async ({ page }) => {
    const navTimeout = appReady ? 30_000 : 120_000;

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

  test('Home screen is visible', async ({ page }) => {
    await expect(page.getByTestId('home-screen')).toBeVisible();
    await expect(page.getByTestId('view-profile-button')).toBeVisible();
  });

  test('Home navigates to Details with username parameter', async ({ page }) => {
    await page.getByTestId('view-profile-button').click();

    await expect(page.getByTestId('details-screen')).toBeVisible();
    await expect(page.getByTestId('details-username')).toContainText(
      '@sakshi_dev'
    );
  });

  test('bottom tabs show Home, Search and Profile', async ({ page }) => {
    await expect(page.getByText('Home', { exact: true }).last()).toBeVisible();
    await expect(page.getByText('Search', { exact: true })).toBeVisible();
    await expect(page.getByText('Profile', { exact: true })).toBeVisible();
  });

  test('dynamic Details header shows username', async ({ page }) => {
    await page.getByTestId('view-profile-button').click();

    await expect(page.getByTestId('details-screen')).toBeVisible();
    await expect(page.getByRole('heading', { name: '@sakshi_dev' })).toBeVisible();
  });
});
