import { test, expect } from '@playwright/test';

test.describe('02-expo-eas', () => {
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
      page.getByTestId('challenge-link-02-expo-eas')
    ).toBeVisible();

    await expect(
      page.getByTestId('challenge-link-02-expo-eas')
    ).toContainText('Expo EAS');
  });

  test('opens Expo EAS challenge', async ({ page }) => {
    await page.goto('/challenges', {
      waitUntil: 'domcontentloaded',
      timeout: 120_000,
    });

    const challenge = page.getByTestId('challenge-link-02-expo-eas');

    await expect(challenge).toBeVisible();
    await challenge.click();

    await expect(page.getByTestId('challenge-screen')).toBeVisible({
      timeout: 30_000,
    });

    await expect(
      page.getByText('Challenge: 02-expo-eas')
    ).toBeVisible();
  });
});
