import { test, expect } from '@playwright/test';

test.describe('10-food-delivery', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/cart', {
      waitUntil: 'domcontentloaded',
      timeout: 120000,
    });

    await expect(
      page.getByText('Food Delivery Cart', { exact: true })
    ).toBeVisible({ timeout: 30000 });
  });

  test('renders food delivery cart', async ({ page }) => {
    await expect(
      page.getByText('Food Delivery Cart', { exact: true })
    ).toBeVisible();

    await expect(page.getByTestId('cart-total')).toBeVisible();
  });

  test('renders delivery map', async ({ page }) => {
    await expect(page.getByTestId('delivery-map')).toBeVisible();
  });

  test('renders cart total', async ({ page }) => {
    await expect(page.getByTestId('cart-total')).toContainText('Total:');
  });

  test('place order button is available', async ({ page }) => {
    const placeOrder = page.getByTestId('place-order');

    await expect(placeOrder).toBeVisible();
    await expect(placeOrder).toContainText('Place order');
  });
});