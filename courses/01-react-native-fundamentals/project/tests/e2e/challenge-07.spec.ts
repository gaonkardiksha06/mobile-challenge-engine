import { test, expect } from '@playwright/test';

test.describe('07-mini-social-feed', () => {
  test('Feed screen is available', async ({ page }) => {
    await page.goto('/auth/login');

    await page.getByTestId('login-email').fill('test@example.com');
    await page.getByTestId('login-password').fill('password123');
    await page.getByTestId('login-submit').click();

    await expect(page.getByTestId('feed-screen')).toBeVisible();
  });

  test('Profile screen is available', async ({ page }) => {
    await page.goto('/auth/login');

    await page.getByTestId('login-email').fill('test@example.com');
    await page.getByTestId('login-password').fill('password123');
    await page.getByTestId('login-submit').click();

    await page.goto('/profile');

    await expect(page.getByTestId('profile-screen')).toBeVisible();
  });

  test('Profile shows login or user information', async ({ page }) => {
    await page.goto('/auth/login');

    await page.getByTestId('login-email').fill('test@example.com');
    await page.getByTestId('login-password').fill('password123');
    await page.getByTestId('login-submit').click();

    await page.goto('/profile');

    await expect(page.getByTestId('profile-screen')).toBeVisible();
    await expect(page.getByTestId('profile-username')).toBeVisible();
    await expect(page.getByTestId('profile-email')).toBeVisible();
  });

  test('Feed contains post content', async ({ page }) => {
    await page.goto('/auth/login');

    await page.getByTestId('login-email').fill('test@example.com');
    await page.getByTestId('login-password').fill('password123');
    await page.getByTestId('login-submit').click();

    await expect(page.getByTestId('feed-screen')).toBeVisible();

    await expect(page.getByTestId('feed-list')).toBeVisible();
  });
});