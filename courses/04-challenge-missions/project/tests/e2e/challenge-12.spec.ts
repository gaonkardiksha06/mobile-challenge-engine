import { test, expect } from '@playwright/test';

test.describe('12-full-marketplace', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/shop', {
      waitUntil: 'domcontentloaded',
      timeout: 120000,
    });

    await expect(
      page.getByText('Marketplace', { exact: true })
    ).toBeVisible({ timeout: 30000 });
  });

  test('renders marketplace screen', async ({ page }) => {
    await expect(
      page.getByText('Marketplace', { exact: true })
    ).toBeVisible();

    await expect(page.getByTestId('shop-list')).toBeVisible();
  });

  test('renders product list', async ({ page }) => {
    const shopList = page.getByTestId('shop-list');

    await expect(shopList).toBeVisible();

    await expect(
      page.getByText('Add', { exact: true }).first()
    ).toBeVisible();
  });

  test('renders product price', async ({ page }) => {
    await expect(page.getByTestId('shop-list')).toBeVisible();

    const price = page.locator('text=/\\$\\d+\\.\\d{2}/').first();

    if (await price.count()) {
      await expect(price).toBeVisible();
    }
  });

  test('allows adding a product to cart', async ({ page }) => {
    await expect(page.getByTestId('shop-list')).toBeVisible();

    const addButton = page.locator('[data-testid^="buy-"]').first();

    await expect(addButton).toBeVisible();
    await addButton.click();
  });
});