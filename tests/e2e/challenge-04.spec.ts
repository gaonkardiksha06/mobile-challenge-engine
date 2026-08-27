// tests/e2e/challenge-04.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Challenge 04 - JWT Authentication", () => {
  const baseUrl = "http://localhost:3000"; // adjust if your server runs on a different port
  const email = "testuser@example.com";
  const password = "secret123";

  // ✅ Cleanup before each test (dynamic email)
  test.beforeEach(async ({ request }) => {
    await request.delete(`${baseUrl}/auth/test-cleanup?email=${email}`);
  });

  test("Register, login, and access profile", async ({ request }) => {
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
    const { token } = await loginRes.json();
    expect(token).toBeTruthy();

    // Profile (protected route)
    const profileRes = await request.get(`${baseUrl}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(profileRes.status()).toBe(200);
    const profile = await profileRes.json();
    expect(profile.email).toBe(email);
  });
});
