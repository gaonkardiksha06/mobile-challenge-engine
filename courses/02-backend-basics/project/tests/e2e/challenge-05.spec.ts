import { test, expect } from "@playwright/test";

test.describe("Challenge 05 - Blog Backend API (Capstone)", () => {
  const baseUrl = "http://localhost:3000"; // adjust if your server runs on a different port
  const email = `blogger-${Date.now()}@example.com`;
  const password = "secret123";

  let token: string;

  test("Register and login", async ({ request }) => {
    // Register
    const registerRes = await request.post(`${baseUrl}/auth/register`, {
      data: { email, password },
    });
    expect(registerRes.status()).toBe(201);

    // Login
    const loginRes = await request.post(`${baseUrl}/auth/login`, {
      data: { email, password },
    });
    expect(loginRes.status()).toBe(200);
    const body = await loginRes.json();
    expect(body.token).toBeTruthy();
    token = body.token;
  });

  test("Reject creating a post without a token", async ({ request }) => {
    const res = await request.post(`${baseUrl}/api/posts`, {
      data: { title: "No Auth", content: "Should fail" },
    });
    expect(res.status()).toBe(401);
  });

  test("Reject creating a post with a malformed token", async ({ request }) => {
    const res = await request.post(`${baseUrl}/api/posts`, {
      headers: { Authorization: "Bearer not-a-real-token" },
      data: { title: "Bad Token", content: "Should fail" },
    });
    expect(res.status()).toBe(401);
  });

  test("Create a post with a valid token", async ({ request }) => {
    const loginRes = await request.post(`${baseUrl}/auth/login`, {
      data: { email, password },
    });
    token = (await loginRes.json()).token;

    const res = await request.post(`${baseUrl}/api/posts`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { title: "My First Post", content: "Hello, world!" },
    });
    expect(res.status()).toBe(201);
    const post = await res.json();
    expect(post.title).toBe("My First Post");
    expect(post.content).toBe("Hello, world!");
  });

  test("List posts", async ({ request }) => {
    const res = await request.get(`${baseUrl}/api/posts`);
    expect(res.status()).toBe(200);
    const posts = await res.json();
    expect(Array.isArray(posts)).toBe(true);
  });

  test("Get a single post by id", async ({ request }) => {
    const loginRes = await request.post(`${baseUrl}/auth/login`, {
      data: { email, password },
    });
    token = (await loginRes.json()).token;

    const createRes = await request.post(`${baseUrl}/api/posts`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { title: "Second Post", content: "Another one" },
    });
    const created = await createRes.json();
    const id = created._id ?? created.id;

    const res = await request.get(`${baseUrl}/api/posts/${id}`);
    expect(res.status()).toBe(200);
    const post = await res.json();
    expect(post.title).toBe("Second Post");
  });

  test("Update a post with a valid token", async ({ request }) => {
    const loginRes = await request.post(`${baseUrl}/auth/login`, {
      data: { email, password },
    });
    token = (await loginRes.json()).token;

    const createRes = await request.post(`${baseUrl}/api/posts`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { title: "Original Title", content: "Original content" },
    });
    const created = await createRes.json();
    const id = created._id ?? created.id;

    const updateRes = await request.put(`${baseUrl}/api/posts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { title: "Updated Title" },
    });
    expect(updateRes.status()).toBe(200);
    const updated = await updateRes.json();
    expect(updated.title).toBe("Updated Title");
  });

  test("Reject updating a post without a token", async ({ request }) => {
    const loginRes = await request.post(`${baseUrl}/auth/login`, {
      data: { email, password },
    });
    token = (await loginRes.json()).token;

    const createRes = await request.post(`${baseUrl}/api/posts`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { title: "Locked Post", content: "Needs auth to edit" },
    });
    const created = await createRes.json();
    const id = created._id ?? created.id;

    const res = await request.put(`${baseUrl}/api/posts/${id}`, {
      data: { title: "Hijacked Title" },
    });
    expect(res.status()).toBe(401);
  });

  test("Delete a post with a valid token", async ({ request }) => {
    const loginRes = await request.post(`${baseUrl}/auth/login`, {
      data: { email, password },
    });
    token = (await loginRes.json()).token;

    const createRes = await request.post(`${baseUrl}/api/posts`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { title: "Temporary Post", content: "Will be deleted" },
    });
    const created = await createRes.json();
    const id = created._id ?? created.id;

    const deleteRes = await request.delete(`${baseUrl}/api/posts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect([200, 204]).toContain(deleteRes.status());

    const verifyRes = await request.get(`${baseUrl}/api/posts/${id}`);
    expect(verifyRes.status()).toBe(404);
  });
});