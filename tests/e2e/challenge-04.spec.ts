import { test, expect } from "@playwright/test";

test.describe("Challenge 04 - JWT Authentication", () => {
  const email = "testuser@example.com";
  const password = "secret123";

  test.beforeEach(async ({ request }) => {
    await request.delete(
      `/auth/test-cleanup?email=${encodeURIComponent(email)}`
    );
  });

  test("Register, login, and access profile", async ({ request }) => {
    const registerRes = await request.post("/auth/register", {
      data: { email, password },
    });
    expect(registerRes.status()).toBe(201);

    const loginRes = await request.post("/auth/login", {
      data: { email, password },
    });
    expect(loginRes.status()).toBe(200);

    const { token } = await loginRes.json();
    expect(token).toBeTruthy();

    const profileRes = await request.get("/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(profileRes.status()).toBe(200);

    const profile = await profileRes.json();
    expect(profile.email).toBe(email);
  });
});