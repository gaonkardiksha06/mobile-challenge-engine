import { test, expect } from '@playwright/test';

test.describe('Challenge 02 - Express APIs', () => {
  test('GET /api/notes returns an array', async ({ request }) => {
    const res = await request.get('/api/notes');
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
  });

  test('POST /api/notes creates a note', async ({ request }) => {
    const res = await request.post('/api/notes', {
      data: { title: 'E2E note', body: 'created by playwright' },
    });
    expect(res.status()).toBe(201);

    const note = await res.json();
    expect(note.title).toBe('E2E note');
    expect(note.body).toBe('created by playwright');
    expect(note.id).toBeTruthy();

    const listRes = await request.get('/api/notes');
    const list = await listRes.json();
    expect(list.some((n) => n.id === note.id)).toBe(true);
  });

  test('POST /api/notes without a title returns 400', async ({ request }) => {
    const res = await request.post('/api/notes', {
      data: { body: 'no title here' },
    });
    expect(res.status()).toBe(400);

    const body = await res.json();
    expect(body.error).toBeTruthy();
  });

  test('DELETE /api/notes/:id removes the note', async ({ request }) => {
    const createRes = await request.post('/api/notes', {
      data: { title: 'To be deleted' },
    });
    const created = await createRes.json();

    const deleteRes = await request.delete(`/api/notes/${created.id}`);
    expect(deleteRes.status()).toBe(200);

    const listRes = await request.get('/api/notes');
    const list = await listRes.json();
    expect(list.some((n) => n.id === created.id)).toBe(false);
  });

  test('DELETE /api/notes/:id for a missing note returns 404', async ({ request }) => {
    const res = await request.delete('/api/notes/does-not-exist');
    expect(res.status()).toBe(404);

    const body = await res.json();
    expect(body.error).toBeTruthy();
  });

  test('GET /health confirms the Express app is mounted', async ({ request }) => {
    const res = await request.get('/health');
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body.ok).toBe(true);
  });

  test('unknown route returns 404 via Express error handling', async ({ request }) => {
    const res = await request.get('/api/nope');
    expect(res.status()).toBe(404);
  });
});