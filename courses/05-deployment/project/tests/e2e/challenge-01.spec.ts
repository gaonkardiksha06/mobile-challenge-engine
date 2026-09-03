import { test, expect } from '@playwright/test';

test.describe('01-apk-build', () => {
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
      page.getByTestId('challenge-link-01-apk-build')
    ).toBeVisible();

    await expect(
      page.getByTestId('challenge-link-01-apk-build')
    ).toContainText('APK Build');
  });

  test('opens APK Build challenge', async ({ page }) => {
    await page.goto('/challenges', {
      waitUntil: 'domcontentloaded',
      timeout: 120_000,
    });

    const challenge = page.getByTestId('challenge-link-01-apk-build');

    await expect(challenge).toBeVisible();
    await challenge.click();

    await expect(page.getByTestId('challenge-screen')).toBeVisible({
      timeout: 30_000,
    });

    await expect(
      page.getByText('Challenge: 01-apk-build')
    ).toBeVisible();
  });
});
