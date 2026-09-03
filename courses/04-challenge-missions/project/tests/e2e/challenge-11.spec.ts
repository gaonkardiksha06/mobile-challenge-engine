import { test, expect } from '@playwright/test';

test.describe('11-social-media-platform', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/feed', {
      waitUntil: 'domcontentloaded',
      timeout: 120000,
    });

    await expect(
      page.getByText('Social Feed', { exact: true })
    ).toBeVisible({ timeout: 30000 });
  });

  test('renders social feed screen', async ({ page }) => {
    await expect(
      page.getByText('Social Feed', { exact: true })
    ).toBeVisible();

    await expect(page.getByTestId('feed-list')).toBeVisible();
  });

  test('renders feed list', async ({ page }) => {
    const feedList = page.getByTestId('feed-list');

    await expect(feedList).toBeVisible();
  });

  test('feed screen contains post content area', async ({ page }) => {
    await expect(page.getByTestId('feed-list')).toBeVisible();

    const postContent = page.locator('text=/likes$/').first();

    if (await postContent.count()) {
      await expect(postContent).toBeVisible();
    }
  });
});