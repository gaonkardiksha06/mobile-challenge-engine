import { test, expect } from '@playwright/test';

test.describe('03-play-store-prep', () => {
  test('renders the deployment home screen', async ({ page }) => {
    await page.goto('/', {
      waitUntil: 'domcontentloaded',
      timeout: 120_000,
    });

    await expect(page.getByTestId('home-screen')).toBeVisible({
      timeout: 30_000,
    });

    await expect(page.getByText('Mobile Challenge Engine')).toBeVisible();
  });

  test('renders the challenges tab', async ({ page }) => {
    await page.goto('/challenges', {
      waitUntil: 'domcontentloaded',
      timeout: 120_000,
    });

    await expect(page.getByTestId('challenge-list')).toBeVisible({
      timeout: 30_000,
    });

    await expect(
      page.getByTestId('challenge-link-03-play-store-prep')
    ).toBeVisible();

    await expect(
      page.getByTestId('challenge-link-03-play-store-prep')
    ).toContainText('Play Store Prep');
  });

  test('opens Play Store Prep challenge', async ({ page }) => {
    await page.goto('/challenges', {
      waitUntil: 'domcontentloaded',
      timeout: 120_000,
    });

    const challenge = page.getByTestId('challenge-link-03-play-store-prep');

    await expect(challenge).toBeVisible();
    await challenge.click();

    await expect(page.getByTestId('challenge-screen')).toBeVisible({
      timeout: 30_000,
    });

    await expect(
      page.getByText('Challenge: 03-play-store-prep')
    ).toBeVisible();
  });
});
