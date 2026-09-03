import { test, expect } from '@playwright/test';

test.describe('08-movie-app', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/movie', {
      waitUntil: 'domcontentloaded',
      timeout: 120000,
    });

    await expect(
      page.getByText('Movie App', { exact: true })
    ).toBeVisible({ timeout: 30000 });
  });

  test('renders movie search UI', async ({ page }) => {
    await expect(page.getByTestId('movie-search-input')).toBeVisible();
    await expect(page.getByTestId('movie-search-button')).toBeVisible();
    await expect(page.getByTestId('movie-list')).toBeVisible();
  });

  test('shows movie results', async ({ page }) => {
    await expect(
      page.getByText('The Shawshank Redemption', { exact: true })
    ).toBeVisible();

    await expect(
      page.getByText('The Godfather', { exact: true })
    ).toBeVisible();
  });

  test('searches for a movie', async ({ page }) => {
    await page.getByTestId('movie-search-input').fill('Matrix');
    await page.getByTestId('movie-search-button').click();

    await expect(
      page.getByText('The Matrix', { exact: true })
    ).toBeVisible();
  });

  test('navigates to movie detail page', async ({ page }) => {
    await page.getByTestId('movie-card-tt0133093').click();

    await expect(page.getByTestId('movie-poster')).toBeVisible({
      timeout: 30000,
    });

    await expect(page.getByTestId('movie-title')).toBeVisible();
    await expect(page.getByTestId('movie-plot')).toBeVisible();
  });

  test('adds and removes a movie from favorites', async ({ page }) => {
    await page.goto('/movie/tt0133093', {
      waitUntil: 'domcontentloaded',
      timeout: 120000,
    });

    await expect(page.getByTestId('movie-poster')).toBeVisible({
      timeout: 30000,
    });

    const favoriteButton = page.getByTestId('favorite-button');

    await expect(
      favoriteButton.getByText('♡ Add to Favorites', { exact: true })
    ).toBeVisible();

    await favoriteButton.click();

    await expect(
      favoriteButton.getByText('♥ Remove from Favorites', { exact: true })
    ).toBeVisible();

    await favoriteButton.click();

    await expect(
      favoriteButton.getByText('♡ Add to Favorites', { exact: true })
    ).toBeVisible();
  });
});