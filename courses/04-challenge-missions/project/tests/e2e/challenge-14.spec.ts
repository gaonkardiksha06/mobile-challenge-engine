import { test, expect } from '@playwright/test';

test.describe('Challenge 14 - Anime Streaming UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/anime/1');
    await page.waitForLoadState('domcontentloaded');
  });

  test('should display the anime detail screen', async ({ page }) => {
    await expect(page.getByTestId('back-button')).toBeVisible();
    await expect(page.getByTestId('anime-banner')).toBeVisible();
    await expect(page.getByText('Anime #1')).toBeVisible();
    await expect(page.getByText('Episodes')).toBeVisible();
  });

  test('should display the episodes list', async ({ page }) => {
    const episodesList = page.getByTestId('episodes-list');

    await expect(episodesList).toBeVisible();

    await expect(page.getByText('EP 1')).toBeVisible();
    await expect(page.getByText('The Beginning')).toBeVisible();

    await expect(page.getByText('EP 2')).toBeVisible();
    await expect(page.getByText('Rising Action')).toBeVisible();

    await expect(page.getByText('EP 3')).toBeVisible();
    await expect(page.getByText('Climax')).toBeVisible();

    await expect(page.getByText('EP 4')).toBeVisible();
    await expect(page.getByText('Resolution')).toBeVisible();
  });

  test('should display the anime banner', async ({ page }) => {
    const banner = page.getByTestId('anime-banner');

    await expect(banner).toBeVisible();
    await expect(banner).toHaveCSS('height', '200px');
  });

  test('should provide a back button', async ({ page }) => {
    const backButton = page.getByTestId('back-button');

    await expect(backButton).toBeVisible();
    await expect(backButton).toBeEnabled();
  });
});