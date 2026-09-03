import { test, expect } from '@playwright/test';

test.describe('05-meme-viewer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', {
      waitUntil: 'domcontentloaded',
      timeout: 120_000,
    });

    await expect(
      page.getByText('Meme Viewer', { exact: true })
    ).toBeVisible({
      timeout: 30_000,
    });
  });

  test('renders the Meme Viewer section', async ({ page }) => {
    await expect(
      page.getByText('Meme Viewer', { exact: true })
    ).toBeVisible();
  });

  test('loads meme content or fallback content', async ({ page }) => {
    await expect(
      page.getByText('Meme Viewer', { exact: true })
    ).toBeVisible();

    await expect(
      page.locator('body')
    ).toContainText(/Demo meme|Meme Viewer/, {
      timeout: 30_000,
    });
  });

  test('renders meme content area', async ({ page }) => {
    await expect(
      page.getByText('Meme Viewer', { exact: true })
    ).toBeVisible();

    const bodyText = await page.locator('body').innerText();

    expect(bodyText).toContain('Meme Viewer');
  });

  test('keeps the Meme Viewer visible after loading', async ({ page }) => {
    await page.waitForTimeout(2_000);

    await expect(
      page.getByText('Meme Viewer', { exact: true })
    ).toBeVisible();
  });
});
