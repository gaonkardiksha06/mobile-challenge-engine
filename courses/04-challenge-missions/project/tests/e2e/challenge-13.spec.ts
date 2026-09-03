import { test, expect } from '@playwright/test';

test.describe('Challenge 13 - Fitness Tracker', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/workouts');
    await page.waitForLoadState('domcontentloaded');
  });

  test('should display the Fitness Tracker screen', async ({ page }) => {
    await expect(page.getByText('Fitness Tracker')).toBeVisible();
    await expect(page.getByTestId('workout-name-input')).toBeVisible();
    await expect(page.getByTestId('workout-reps-input')).toBeVisible();
    await expect(page.getByTestId('log-workout')).toBeVisible();
    await expect(page.getByTestId('workouts-list')).toBeVisible();
  });

  test('should log a workout', async ({ page }) => {
    const nameInput = page.getByTestId('workout-name-input');
    const repsInput = page.getByTestId('workout-reps-input');
    const logButton = page.getByTestId('log-workout');

    await nameInput.fill('Push Ups');
    await repsInput.fill('20');
    await logButton.click();

    await expect(page.getByText('Push Ups')).toBeVisible();
    await expect(page.getByText(/20 reps/)).toBeVisible();
  });

  test('should clear inputs after logging a workout', async ({ page }) => {
    const nameInput = page.getByTestId('workout-name-input');
    const repsInput = page.getByTestId('workout-reps-input');

    await nameInput.fill('Squats');
    await repsInput.fill('15');
    await page.getByTestId('log-workout').click();

    await expect(nameInput).toHaveValue('');
    await expect(repsInput).toHaveValue('');
  });
});
