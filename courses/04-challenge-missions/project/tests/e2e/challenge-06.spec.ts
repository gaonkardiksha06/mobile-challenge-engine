import { test, expect } from '@playwright/test';

test.describe('06-realtime-chat', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/chat', {
      waitUntil: 'domcontentloaded',
      timeout: 120000,
    });

    await expect(
      page.getByText('Realtime Chat', { exact: true })
    ).toBeVisible({ timeout: 30000 });
  });

  test('renders chat UI', async ({ page }) => {
    await expect(page.getByTestId('chat-messages')).toBeVisible();
    await expect(page.getByTestId('chat-input')).toBeVisible();
    await expect(page.getByTestId('send-chat')).toBeVisible();
  });

  test('shows initial realtime message', async ({ page }) => {
    await expect(
      page.getByText('Welcome to the realtime chat!', { exact: true })
    ).toBeVisible();
  });

  test('sends a message', async ({ page }) => {
    await page.getByTestId('chat-input').fill('Hello from Playwright');
    await page.getByTestId('send-chat').click();

    await expect(
      page.getByText('Hello from Playwright', { exact: true })
    ).toBeVisible();
  });

  test('uses authenticated author', async ({ page }) => {
    await page.getByTestId('chat-input').fill('Auth test');
    await page.getByTestId('send-chat').click();

    const messages = page.getByTestId('chat-messages');

    await expect(messages.getByText('Learner', { exact: true }).last()).toBeVisible();
  });
});
