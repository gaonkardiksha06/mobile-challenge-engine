import { test, expect } from '@playwright/test';

test.describe('09-ai-recipe-app', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/recipes', {
      waitUntil: 'domcontentloaded',
      timeout: 120000,
    });

    await expect(
      page.getByText('AI Recipe App', { exact: true })
    ).toBeVisible({ timeout: 30000 });
  });

  test('renders ingredient input and generate button', async ({ page }) => {
    await expect(page.getByTestId('ingredient-input')).toBeVisible();
    await expect(page.getByTestId('generate-recipes')).toBeVisible();
  });

  test('accepts an ingredient', async ({ page }) => {
    const input = page.getByTestId('ingredient-input');

    await input.fill('chicken');

    await expect(input).toHaveValue('chicken');
  });

  test('generates recipes', async ({ page }) => {
    await page.getByTestId('ingredient-input').fill('chicken');
    await page.getByTestId('generate-recipes').click();

    await expect(
      page.getByText(/Chicken/i).first()
    ).toBeVisible({ timeout: 30000 });
  });

  test('saves and removes a recipe favorite', async ({ page }) => {
    await page.getByTestId('ingredient-input').fill('chicken');
    await page.getByTestId('generate-recipes').click();

    const favoriteButton = page.locator('[data-testid^="favorite-"]').first();

    await expect(favoriteButton).toBeVisible({ timeout: 30000 });

    await expect(
      favoriteButton.getByText('♡ Save to Favorites', { exact: true })
    ).toBeVisible();

    await favoriteButton.click();

    await expect(
      favoriteButton.getByText('♥ Remove from Favorites', { exact: true })
    ).toBeVisible();

    await favoriteButton.click();

    await expect(
      favoriteButton.getByText('♡ Save to Favorites', { exact: true })
    ).toBeVisible();
  });
});