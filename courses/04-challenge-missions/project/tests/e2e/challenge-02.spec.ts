import { test, expect } from '@playwright/test';

test.describe('02-pokemon-explorer', () => {
  test('renders the Pokemon Explorer list', async ({ page }) => {
    await page.goto('/pokemon', {
      waitUntil: 'domcontentloaded',
      timeout: 120_000,
    });

    await expect(page.getByText('Pokemon Explorer')).toBeVisible({
      timeout: 30_000,
    });

    await expect(page.getByTestId('pokemon-list')).toHaveCount(1);

    await expect(page.getByTestId('pokemon-bulbasaur')).toBeVisible({
      timeout: 30_000,
    });
  });

  test('displays multiple Pokemon', async ({ page }) => {
    await page.goto('/pokemon', {
      waitUntil: 'domcontentloaded',
      timeout: 120_000,
    });

    await expect(page.getByTestId('pokemon-list')).toHaveCount(1);

    await expect(page.getByTestId('pokemon-bulbasaur')).toBeVisible({
      timeout: 30_000,
    });

    await expect(page.getByTestId('pokemon-charmander')).toBeVisible();
    await expect(page.getByTestId('pokemon-squirtle')).toBeVisible();
  });

  test('navigates to Pokemon detail screen', async ({ page }) => {
    await page.goto('/pokemon', {
      waitUntil: 'domcontentloaded',
      timeout: 120_000,
    });

    const bulbasaur = page.getByTestId('pokemon-bulbasaur');

    await expect(bulbasaur).toBeVisible({
      timeout: 30_000,
    });

    await bulbasaur.click();

    await expect(page).toHaveURL(/\/pokemon\/1/);

    const pokemonName = page.getByTestId('pokemon-name');

    await expect(pokemonName).toBeVisible({
      timeout: 30_000,
    });

    await expect(pokemonName).toHaveText('bulbasaur');
  });

  test('renders Pokemon detail stats', async ({ page }) => {
    await page.goto('/pokemon/1', {
      waitUntil: 'domcontentloaded',
      timeout: 120_000,
    });

    await expect(page.getByTestId('pokemon-name')).toBeVisible({
      timeout: 30_000,
    });

    await expect(page.getByText('Stats', { exact: true })).toBeVisible();

    await expect(page.getByTestId('stats-list')).toBeVisible();

    await expect(page.getByText('hp', { exact: true })).toBeVisible();
    await expect(page.getByText('attack', { exact: true })).toBeVisible();
    await expect(page.getByText('defense', { exact: true })).toBeVisible();
  });
});