import { test, expect } from '@playwright/test';

test.describe('03-notes-app', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/notes', {
      waitUntil: 'domcontentloaded',
      timeout: 120_000,
    });

    await expect(
      page.getByRole('heading', { name: 'Notes' })
    ).toBeVisible({
      timeout: 30_000,
    });
  });

  test('renders the Notes App section', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Notes' })
    ).toBeVisible();

    await expect(page.getByTestId('note-input')).toBeVisible();
    await expect(page.getByTestId('save-note-button')).toBeVisible();
    await expect(page.getByTestId('notes-list')).toHaveCount(1);
  });

  test('adds a new note', async ({ page }) => {
    const input = page.getByTestId('note-input');
    const saveButton = page.getByTestId('save-note-button');

    await input.fill('My first note');
    await saveButton.click();

    await expect(page.getByText('My first note')).toBeVisible();
  });

  test('deletes a note', async ({ page }) => {
  const input = page.getByTestId('note-input');
  const saveButton = page.getByTestId('save-note-button');

  await input.fill('Note to delete');
  await saveButton.click();

  await expect(
    page.getByText('Note to delete')
  ).toBeVisible();

  const noteText = page.getByText('Note to delete');

  const noteRow = noteText.locator('..');

  const deleteButton = noteRow
    .getByText('Delete')
    .last();

  await expect(deleteButton).toBeVisible();

  await deleteButton.click();

  await expect(
    page.getByText('Note to delete')
  ).not.toBeVisible();
});

  test('does not save an empty note', async ({ page }) => {
    const saveButton = page.getByTestId('save-note-button');

    await saveButton.click();

    await expect(page.getByTestId('notes-list')).toHaveCount(1);
  });
});