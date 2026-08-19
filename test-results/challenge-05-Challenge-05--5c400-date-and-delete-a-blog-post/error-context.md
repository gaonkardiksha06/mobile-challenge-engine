# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: challenge-05.spec.ts >> Challenge 05 - Blog Backend API >> Create, fetch, update, and delete a blog post
- Location: tests\e2e\challenge-05.spec.ts:7:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 201
Received: 401
```

# Test source

```ts
  1  | // tests/e2e/challenge-05.spec.ts
  2  | import { test, expect, request } from "@playwright/test";
  3  | 
  4  | const baseUrl = "http://localhost:3000";
  5  | 
  6  | test.describe("Challenge 05 - Blog Backend API", () => {
  7  |   test("Create, fetch, update, and delete a blog post", async () => {
  8  |     const api = await request.newContext();
  9  | 
  10 |     // Create a new post
  11 |     const createRes = await api.post(`${baseUrl}/api/posts`, {
  12 |       data: { title: "My first post", content: "Hello world!" },
  13 |     });
> 14 |     expect(createRes.status()).toBe(201);
     |                                ^ Error: expect(received).toBe(expected) // Object.is equality
  15 |     const post = await createRes.json();
  16 |     expect(post.title).toBe("My first post");
  17 | 
  18 |     // Fetch all posts
  19 |     const listRes = await api.get(`${baseUrl}/api/posts`);
  20 |     expect(listRes.status()).toBe(200);
  21 |     const posts = await listRes.json();
  22 |     expect(Array.isArray(posts)).toBeTruthy();
  23 | 
  24 |     // Update the post
  25 |     const updateRes = await api.put(`${baseUrl}/api/posts/${post._id}`, {
  26 |       data: { title: "Updated title" },
  27 |     });
  28 |     expect(updateRes.status()).toBe(200);
  29 |     const updated = await updateRes.json();
  30 |     expect(updated.title).toBe("Updated title");
  31 | 
  32 |     // Delete the post
  33 |     const deleteRes = await api.delete(`${baseUrl}/api/posts/${post._id}`);
  34 |     expect(deleteRes.status()).toBe(200);
  35 |     const deleted = await deleteRes.json();
  36 |     expect(deleted.deleted).toBeTruthy();
  37 |   });
  38 | });
  39 | 
```