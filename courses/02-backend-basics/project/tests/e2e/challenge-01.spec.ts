import { test, expect } from '@playwright/test';

test.describe('Challenge 01 - Node.js Basics API', () => {
  test('GET / returns the API welcome message and route list', async ({ request }) => {
    const res = await request.get('/');
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body.message).toBe('Node.js Basics API');
    expect(Array.isArray(body.routes)).toBe(true);
  });

  test('GET /notes returns current file content', async ({ request }) => {
    const res = await request.get('/notes');
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(typeof body.content).toBe('string');
  });

  test('POST /notes overwrites the notes file', async ({ request }) => {
    const res = await request.post('/notes', {
      data: { content: 'E2E test content' },
    });
    expect(res.status()).toBe(200);

    const readRes = await request.get('/notes');
    const body = await readRes.json();
    expect(body.content).toBe('E2E test content');
  });

  test('POST /notes/append adds a line without erasing existing content', async ({ request }) => {
    await request.post('/notes', {
      data: { content: 'First line' },
    });

    const appendRes = await request.post('/notes/append', {
      data: { line: 'Second line' },
    });
    expect(appendRes.status()).toBe(200);

    const readRes = await request.get('/notes');
    const body = await readRes.json();
    expect(body.content).toContain('First line');
    expect(body.content).toContain('Second line');
  });

  test('GET /notes/stats returns computed statistics for current content', async ({ request }) => {
    await request.post('/notes', {
      data: { content: 'abc\nabcdef' },
    });

    const res = await request.get('/notes/stats');
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body.lineCount).toBe(2);
    expect(body.longestLine).toBe(6);
  });

  test('POST /notes/append rejects an empty line', async ({ request }) => {
    const res = await request.post('/notes/append', {
      data: { line: '' },
    });
    expect(res.status()).toBe(400);
  });

  test('unknown route returns 404', async ({ request }) => {
    const res = await request.get('/does-not-exist');
    expect(res.status()).toBe(404);
  });
});
