import { test, expect } from '@playwright/test';

test.describe('06-async-storage', () => {
  test('Profile screen shows theme toggle', async ({ page }) => {
    await page.goto('/profile');

    await expect(page.getByTestId('profile-screen')).toBeVisible();
    await expect(page.getByTestId('theme-toggle')).toBeVisible();
  });

  test('Profile screen is available', async ({ page }) => {
    await page.goto('/profile');

    await expect(page.getByTestId('profile-screen')).toBeVisible();
  });

  test('Login screen is available', async ({ page }) => {
    await page.goto('/auth/login');

    await expect(page.getByTestId('login-screen')).toBeVisible();
    await expect(page.getByTestId('login-email')).toBeVisible();
    await expect(page.getByTestId('login-password')).toBeVisible();
    await expect(page.getByTestId('login-submit')).toBeVisible();
  });

  test('Theme toggle is interactive', async ({ page }) => {
    await page.goto('/profile');

    const themeToggle = page.getByTestId('theme-toggle');

    await expect(themeToggle).toBeVisible();

    await themeToggle.evaluate((element) => {
      (element as HTMLElement).click();
    });

    await page.waitForTimeout(1000);
  });
});
