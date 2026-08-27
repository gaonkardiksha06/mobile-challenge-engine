# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: challenge-04.spec.ts >> Challenge 04 - JWT Authentication >> Register, login, and access profile
- Location: tests\e2e\challenge-04.spec.ts:8:3

# Error details

```
Error: apiRequestContext.post: connect ECONNREFUSED ::1:3000
Call log:
  - → POST http://localhost:3000/auth/register
    - user-agent: Playwright/1.62.1 (x64; windows 10.0) node/22.14 CI/1
    - accept: */*
    - accept-encoding: gzip,deflate,br
    - content-type: application/json
    - content-length: 55

```