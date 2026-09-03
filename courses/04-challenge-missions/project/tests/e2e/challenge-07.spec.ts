import { test, expect } from '@playwright/test';

test.describe('07-expense-tracker', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/expenses', {
      waitUntil: 'domcontentloaded',
      timeout: 120000,
    });

    await expect(
      page.getByText('Expense Tracker', { exact: true })
    ).toBeVisible({ timeout: 30000 });
  });

  test('renders expense tracker UI', async ({ page }) => {
    await expect(page.getByTestId('expense-title')).toBeVisible();
    await expect(page.getByTestId('expense-amount')).toBeVisible();
    await expect(page.getByTestId('add-expense')).toBeVisible();
    await expect(page.getByTestId('expense-list')).toBeVisible();
  });

  test('shows empty expense state', async ({ page }) => {
    await expect(
      page.getByTestId('empty-expenses')
    ).toBeVisible();
  });

  test('adds an expense', async ({ page }) => {
    await page.getByTestId('expense-title').fill('Lunch');
    await page.getByTestId('expense-amount').fill('250');

    await page.getByTestId('category-food').click();
    await page.getByTestId('add-expense').click();

    await expect(
      page.getByText('Lunch', { exact: true })
    ).toBeVisible();

    await expect(
      page.getByText('₹250.00', { exact: true })
    ).toBeVisible();
  });

  test('updates category totals', async ({ page }) => {
    await page.getByTestId('expense-title').fill('Bus Ticket');
    await page.getByTestId('expense-amount').fill('100');
    await page.getByTestId('category-travel').click();
    await page.getByTestId('add-expense').click();

    const totals = page.getByTestId('category-totals');

    await expect(
      totals.getByText('travel: ₹100.00', { exact: true })
    ).toBeVisible();
  });

  test('updates monthly summary', async ({ page }) => {
    await page.getByTestId('expense-title').fill('Shopping');
    await page.getByTestId('expense-amount').fill('500');
    await page.getByTestId('add-expense').click();

    const summary = page.getByTestId('monthly-summary');

    await expect(
      summary.getByText('Total: ₹500.00', { exact: true })
    ).toBeVisible();

    await expect(
      summary.getByText('Count: 1', { exact: true })
    ).toBeVisible();
  });

  test('removes an expense', async ({ page }) => {
    await page.getByTestId('expense-title').fill('Coffee');
    await page.getByTestId('expense-amount').fill('80');
    await page.getByTestId('category-food').click();
    await page.getByTestId('add-expense').click();

    await expect(
      page.getByText('Coffee', { exact: true })
    ).toBeVisible();

    const expenseCard = page.getByText('Coffee', {
      exact: true,
    }).locator('..');

    await page
      .getByText('Remove', { exact: true })
      .last()
      .click();

    await expect(
      page.getByText('Coffee', { exact: true })
    ).not.toBeVisible();
  });
});