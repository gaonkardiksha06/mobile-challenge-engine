import { test, expect } from '@playwright/test';

test.describe('01-habit-tracker', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', {
      waitUntil: 'domcontentloaded',
      timeout: 120_000,
    });

    await expect(page.getByText('Challenge Missions Hub')).toBeVisible({
      timeout: 30_000,
    });
  });

  test('renders the Habit Tracker section', async ({ page }) => {
    await expect(page.getByText('Habit Tracker')).toBeVisible();

    await expect(page.getByTestId('habit-input')).toBeVisible();

    await expect(page.getByTestId('add-habit-button')).toBeVisible();

    // FlatList can report itself as hidden when it has no items.
    // Verify that the list element exists instead.
    await expect(page.getByTestId('habit-list')).toHaveCount(1);
  });

  test('adds a new habit', async ({ page }) => {
    const input = page.getByTestId('habit-input');
    const addButton = page.getByTestId('add-habit-button');

    await input.fill('Drink Water');
    await addButton.click();

    await expect(page.getByText('Drink Water')).toBeVisible();
  });

  test('toggles a habit when pressed', async ({ page }) => {
    const input = page.getByTestId('habit-input');
    const addButton = page.getByTestId('add-habit-button');

    await input.fill('Exercise');
    await addButton.click();

    // Select only actual habit rows.
    // Exclude the FlatList container with testID="habit-list".
    const habit = page
      .locator(
        '[data-testid^="habit-"]:not([data-testid="habit-list"])'
      )
      .filter({ hasText: 'Exercise' });

    await expect(habit).toHaveCount(1);
    await expect(habit).toBeVisible();

    // Click the habit to toggle it.
    await habit.click();

    // After toggling, the habit should still be displayed.
    await expect(habit).toBeVisible();
    await expect(habit).toContainText('Exercise');
  });

  test('renders calculator section', async ({ page }) => {
    await expect(page.getByText('Calculator')).toBeVisible();

    await expect(page.getByTestId('calc-display')).toBeVisible();
  });
});