import { test, expect } from '@playwright/test';

let appReady = false;

test.describe('01-expo-setup-basics', () => {
  test.beforeEach(async ({ page }) => {
    const navTimeout = appReady ? 30_000 : 120_000;
    await page.goto('/', { waitUntil: 'domcontentloaded', timeout: navTimeout });
    await page.getByTestId('home-screen').waitFor({ state: 'visible', timeout: navTimeout });
    appReady = true;
  });

  test('renders home screen with profile card', async ({ page }) => {
    await expect(page.getByTestId('home-screen')).toBeVisible();
    await expect(page.getByTestId('profile-card')).toBeVisible();
    await expect(page.getByTestId('profile-username')).toContainText('@sakshi_dev');
    await expect(page.getByTestId('profile-bio')).toBeVisible();
    await expect(page.getByTestId('profile-avatar')).toBeVisible();
  });

  test('follow button toggles state', async ({ page }) => {
    const follow = page.getByTestId('follow-button');
    await expect(follow).toContainText('Follow');
    await follow.click();
    await expect(follow).toContainText('Following');
  });

  test('renders three feature cards in a row', async ({ page }) => {
    await expect(page.getByTestId('feature-cards')).toBeVisible();
    await expect(page.getByTestId('feature-card-1')).toBeVisible();
    await expect(page.getByTestId('feature-card-2')).toBeVisible();
    await expect(page.getByTestId('feature-card-3')).toBeVisible();
  });

  test('view profile button is visible', async ({ page }) => {
    await expect(page.getByTestId('view-profile-button')).toBeVisible();
  });
});
