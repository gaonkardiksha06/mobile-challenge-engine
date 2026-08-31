import { test, expect } from '@playwright/test';

let appReady = false;

test.describe('04-forms-validation', () => {
  test.beforeEach(async ({ page }) => {
    const navTimeout = appReady ? 30000 : 120000;

    await page.goto('/', {
      waitUntil: 'domcontentloaded',
      timeout: navTimeout,
    });

    await page.getByTestId('home-screen').waitFor({
      state: 'visible',
      timeout: navTimeout,
    });

    appReady = true;
  });

  test('Login form is visible and validates required fields', async ({ page }) => {
    await page.goto('/auth/login');

    await expect(page.getByTestId('login-screen')).toBeVisible();
    await expect(page.getByTestId('login-email')).toBeVisible();
    await expect(page.getByTestId('login-password')).toBeVisible();
    await expect(page.getByTestId('login-submit')).toBeVisible();

    await page.getByTestId('login-submit').click();

    await expect(page.getByTestId('login-email-error')).toBeVisible();
    await expect(page.getByTestId('login-password-error')).toBeVisible();
  });

  test('Login validates password length', async ({ page }) => {
    await page.goto('/auth/login');

    await page.getByTestId('login-email').fill('test@example.com');
    await page.getByTestId('login-password').fill('123');
    await page.getByTestId('login-submit').click();

    await expect(page.getByTestId('login-password-error')).toBeVisible();
    await expect(
      page.getByText('Password must be at least 6 characters', { exact: true })
    ).toBeVisible();
  });

  test('Signup form validates fields and confirm password', async ({ page }) => {
    await page.goto('/auth/signup');

    await expect(page.getByTestId('signup-screen')).toBeVisible();
    await expect(page.getByTestId('signup-username')).toBeVisible();
    await expect(page.getByTestId('signup-email')).toBeVisible();
    await expect(page.getByTestId('signup-password')).toBeVisible();
    await expect(page.getByTestId('signup-confirm-password')).toBeVisible();
    await expect(page.getByTestId('signup-submit')).toBeVisible();

    await page.getByTestId('signup-username').fill('testuser');
    await page.getByTestId('signup-email').fill('test@example.com');
    await page.getByTestId('signup-password').fill('123456');
    await page.getByTestId('signup-confirm-password').fill('different');
    await page.getByTestId('signup-submit').click();

    await expect(page.getByText('Passwords do not match', { exact: true })).toBeVisible();
  });

  test('Multi-step form supports Next, Previous and Review', async ({ page }) => {
    await expect(page.getByTestId('multi-step-form')).toBeVisible();
    await expect(page.getByTestId('step-indicator')).toBeVisible();

    await expect(page.getByTestId('step-personal')).toBeVisible();
    await expect(page.getByTestId('step-name')).toBeVisible();
    await expect(page.getByTestId('step-bio')).toBeVisible();

    await page.getByTestId('step-name').fill('Diksha');
    await page.getByTestId('next-button').click();

    await expect(page.getByTestId('step-contact')).toBeVisible();
    await expect(page.getByTestId('step-email')).toBeVisible();

    await page.getByTestId('step-email').fill('test@example.com');
    await page.getByTestId('next-button').click();

    await expect(page.getByTestId('step-review')).toBeVisible();
    await expect(page.getByText('Name: Diksha', { exact: true })).toBeVisible();
    await expect(page.getByText('Email: test@example.com', { exact: true })).toBeVisible();

    await page.getByTestId('previous-button').click();

    await expect(page.getByTestId('step-contact')).toBeVisible();
  });
});
