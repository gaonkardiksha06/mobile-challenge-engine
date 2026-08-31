import { test, expect } from '@playwright/test';

let appReady = false;

test.describe('03-lists-data-rendering', () => {
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

  test('Image gallery and categories are visible', async ({ page }) => {
    await expect(page.getByTestId('image-gallery')).toBeVisible();
    await expect(page.getByTestId('category-scroll')).toBeVisible();
    await expect(page.getByTestId('category-All')).toBeVisible();
    await expect(page.getByTestId('category-Nature')).toBeVisible();
    await expect(page.getByTestId('gallery-scroll')).toBeVisible();
    await expect(page.getByTestId('gallery-image-1')).toBeVisible();
  });

  test('Post feed displays posts and likes', async ({ page }) => {
    await expect(page.getByTestId('post-feed')).toBeVisible();
    await expect(page.getByTestId('post-list')).toBeVisible();

    await expect(page.getByTestId('post-1')).toBeVisible();
    await expect(page.getByTestId('post-2')).toBeVisible();
    await expect(page.getByText('42 likes', { exact: true })).toBeVisible();
  });

  test('Search bar filters posts', async ({ page }) => {
    const searchInput = page.getByTestId('search-input');

    await expect(searchInput).toBeVisible();

    await searchInput.fill('sakshi_dev');

    await expect(page.getByTestId('post-3')).toBeVisible();
    await expect(page.getByTestId('post-1')).not.toBeVisible();
  });

  test('Empty state is shown for no matching data', async ({ page }) => {
    const searchInput = page.getByTestId('search-input');

    await searchInput.fill('this-user-does-not-exist');

    await expect(page.getByTestId('empty-state')).toBeVisible();
    await expect(page.getByText('No Data', { exact: true })).toBeVisible();
  });
});
