# Backend Basics

## 📊 Progress Evidence

*Auto-updated when you run review. Last run: 18/8/2026, 6:17:56 pm*

| Metric | Value |
|--------|-------|
| Challenges completed | 3 / 5 (60%) |
| Average score | 78.9% |

| Challenge | Skills covered | Status |
|-----------|----------------|--------|
| Node.js Basics | Modules, npm, File system, HTTP server | Passed |
| Express.js APIs | Express, Routes, Middleware, REST | Passed |
| MongoDB | Mongoose, Schemas, CRUD, MongoDB Atlas | Passed |
| JWT Authentication | bcrypt, JWT, Protected routes | Not passed |
| Blog Backend API (Capstone) | User auth, CRUD posts, JWT protection, MongoDB | Not passed |

## Getting started

```bash
npm install
npm run dev
```

## Setup notes for learners

1. **MongoDB (challenges 03–05):** Install [MongoDB Community](https://www.mongodb.com/try/download/community) locally, or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and set:

   ```bash
   set MONGO_URI=mongodb://127.0.0.1:27017/mobile_challenge
   ```

2. **JWT secret (optional):** `set JWT_SECRET=your-secret-here`

3. **ESLint:** This project uses `.eslintrc.cjs` at the project root. Run `npm run lint` before review.

4. **Jest:** Tests live in `tests/challenge-XX.test.tsx`. Run `npm test` from the project folder.

## Run a challenge review

```bash
npm run review -- --challenge=01-nodejs-basics
```
