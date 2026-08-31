import { test, expect } from '@playwright/test';

test.describe('Challenge 03 - MongoDB', () => {
  test('GET /api/users returns an array', async ({ request }) => {
    const res = await request.get('/api/users');

    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
  });

  test('POST /api/users creates a user', async ({ request }) => {
    const uniqueEmail = `e2e-${Date.now()}@example.com`;

    const res = await request.post('/api/users', {
      data: {
        username: `e2e-user-${Date.now()}`,
        email: uniqueEmail,
        password: 'test-password-123',
      },
    });

    expect(res.status()).toBe(201);

    const user = await res.json();

    expect(user.username).toBeTruthy();
    expect(user.email).toBe(uniqueEmail);
    expect(user.password).toBeUndefined();
  });

  test('POST /api/users without required fields returns an error', async ({
    request,
  }) => {
    const res = await request.post('/api/users', {
      data: {
        username: 'missing-fields-user',
      },
    });

    expect(res.status()).toBe(400);
  });

  test('PUT /api/users/:id updates a user', async ({ request }) => {
    const createRes = await request.post('/api/users', {
      data: {
        username: `update-user-${Date.now()}`,
        email: `update-${Date.now()}@example.com`,
        password: 'test-password-123',
      },
    });

    expect(createRes.status()).toBe(201);

    const created = await createRes.json();

    const updateRes = await request.put(`/api/users/${created._id}`, {
      data: {
        username: 'updated-e2e-user',
      },
    });

    expect(updateRes.status()).toBe(200);

    const updated = await updateRes.json();

    expect(updated.username).toBe('updated-e2e-user');
  });

  test('DELETE /api/users/:id removes a user', async ({ request }) => {
    const createRes = await request.post('/api/users', {
      data: {
        username: `delete-user-${Date.now()}`,
        email: `delete-${Date.now()}@example.com`,
        password: 'test-password-123',
      },
    });

    expect(createRes.status()).toBe(201);

    const created = await createRes.json();

    const deleteRes = await request.delete(`/api/users/${created._id}`);

    expect(deleteRes.status()).toBe(200);

    const body = await deleteRes.json();
    expect(body.deleted).toBe(true);
  });

  test('GET /api/users/:id for a missing user returns 404', async ({
    request,
  }) => {
    const res = await request.get('/api/users/does-not-exist');

    expect(res.status()).toBe(404);

    const body = await res.json();
    expect(body.error).toBeTruthy();
  });

  test('DELETE /api/users/:id for a missing user returns 404', async ({
    request,
  }) => {
    const res = await request.delete('/api/users/does-not-exist');

    expect(res.status()).toBe(404);

    const body = await res.json();
    expect(body.error).toBeTruthy();
  });
});