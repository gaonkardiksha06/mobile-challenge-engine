import { test, expect } from '@playwright/test';

test.describe('04-calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', {
      waitUntil: 'domcontentloaded',
      timeout: 120_000,
    });

    await expect(
      page.getByText('Calculator', { exact: true })
    ).toBeVisible({
      timeout: 30_000,
    });
  });

  test('renders the Calculator section', async ({ page }) => {
    await expect(
      page.getByText('Calculator', { exact: true })
    ).toBeVisible();

    await expect(page.getByTestId('calc-display')).toBeVisible();

    await expect(page.getByTestId('calc-key-7')).toBeVisible();
    await expect(page.getByTestId('calc-key-8')).toBeVisible();
    await expect(page.getByTestId('calc-key-+')).toBeVisible();
    await expect(page.getByTestId('calc-key-=')).toBeVisible();
  });

  test('performs addition', async ({ page }) => {
    await page.getByTestId('calc-key-7').click();
    await page.getByTestId('calc-key-+').click();
    await page.getByTestId('calc-key-8').click();
    await page.getByTestId('calc-key-=').click();

    await expect(page.getByTestId('calc-display')).toHaveText('15');
  });

  test('performs multiplication', async ({ page }) => {
    await page.getByTestId('calc-key-6').click();
    await page.getByTestId('calc-key-*').click();
    await page.getByTestId('calc-key-7').click();
    await page.getByTestId('calc-key-=').click();

    await expect(page.getByTestId('calc-display')).toHaveText('42');
  });

  test('starts with display value 0', async ({ page }) => {
    await expect(page.getByTestId('calc-display')).toHaveText('0');
  });
});
