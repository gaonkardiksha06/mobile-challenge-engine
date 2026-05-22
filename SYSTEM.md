# Mobile Challenge Engine — System Documentation

**Technical reference for the React Native, backend, missions, and deployment automation system.**

Based on the [Challenge Engine](https://github.com/sparkplustech/challenge-engine-react) architecture (`SYSTEM.md`). This repo implements **Phases 3–7** of the mobile/full-stack curriculum.

---

## Pathway Overview

| Phase | Course ID | Challenges | Capstone |
|-------|-----------|------------|----------|
| 3 — RN Fundamentals | `03-react-native-fundamentals` | 7 | Mini Social Feed |
| 4 — Backend Basics | `04-backend-basics` | 5 | Blog Backend API |
| 5 — Advanced RN | `05-react-native-advanced` | 6 | Full E-Commerce App |
| 6 — Missions | `06-challenge-missions` | 14 | Tiered projects |
| 7 — Deployment | `07-deployment` | 3 | Play Store prep |

**Total:** 35 challenges across 5 courses.

---

## Repository Structure

```
mobile-challenge-engine/
├── courses/
│   ├── 03-react-native-fundamentals/
│   │   ├── project/              # Expo app (Expo Router)
│   │   ├── review-engine/
│   │   ├── ai-review/
│   │   ├── course-config.json
│   │   └── results/
│   ├── 04-backend-basics/        # Node + Express + MongoDB
│   ├── 05-react-native-advanced/
│   ├── 06-challenge-missions/
│   └── 07-deployment/
├── global-review/
├── pathway-review/pathway-config.json
├── scripts/                      # setup, review, progress, generate-mobile-courses.js
├── dashboard/
├── learner-results/progress.json
└── SYSTEM.md
```

---

## Challenge Curriculum Map

### Phase 3 — React Native Fundamentals

| ID | Name | Parts |
|----|------|-------|
| `01-expo-setup-basics` | Expo Setup & Basics | App + icon, profile card, flexbox cards, theme |
| `02-navigation-system` | Navigation | Stack, tabs, dynamic header |
| `03-lists-data-rendering` | Lists & Data | ScrollView gallery, FlatList feed, search, empty/loading |
| `04-forms-validation` | Forms | Login, signup, multi-step |
| `05-api-integration` | API | JSONPlaceholder users, weather, retry UI |
| `06-async-storage` | AsyncStorage | Notes, login persistence, theme |
| `07-mini-social-feed` | Capstone | Auth + nav + API feed + storage + profile |

### Phase 4 — Backend Basics

| ID | Name |
|----|------|
| `01-nodejs-basics` | HTTP server, fs, modules |
| `02-express-apis` | Routes, middleware, Notes REST |
| `03-mongodb` | Mongoose, User schema, CRUD |
| `04-jwt-authentication` | Register, login, protected routes |
| `05-blog-backend-api` | Capstone |

### Phase 5 — Advanced React Native

| ID | Name |
|----|------|
| `01-redux-toolkit` | Counter, todos, API products |
| `02-nativewind` | Tailwind conversion, responsive |
| `03-firebase` | Auth, Firestore chat, Storage upload |
| `04-notifications-maps` | Local push, maps + location |
| `05-payments-optimization` | Stripe checkout, memoization |
| `06-full-ecommerce-app` | Capstone |

### Phase 6 — Challenge Missions

**Beginner:** habit-tracker, pokemon-explorer, notes-app, calculator, meme-viewer  
**Intermediate:** realtime-chat, expense-tracker, movie-app, ai-recipe-app  
**Advanced:** food-delivery, social-media-platform, full-marketplace, fitness-tracker, anime-streaming-ui

### Phase 7 — Deployment

`01-apk-build`, `02-expo-eas`, `03-play-store-prep`

---

## Review Engine (6 layers)

Same weighted model as the web Challenge Engine:

| Layer | Weight | RN / Backend |
|-------|--------|----------------|
| Functional tests | 35% | Jest (`jest-expo` / Node `jest`) |
| Code quality | 15% | ESLint |
| Architecture | 10% | AST patterns (`metadata.patternsRequired`) |
| Best practices | 10% | Heuristics |
| E2E | 15% | Detox / Maestro (configure per course) |
| AI review | 15% | Groq (`GROQ_API_KEY` in `.env`) |

**Pass threshold:** 80% (per `course-config.json`).

### Mobile-specific patterns (`architecture-checker`)

Extend `patternsRequired` in challenge `metadata.json`:

- `functionalComponent`, `useState`, `useEffect`, `FlatList`, `StyleSheet`
- `useNavigation`, `fetch`, `AsyncStorage`
- `redux`, `createSlice`, `firebase`, `expo-notifications`, `react-native-maps`

Use `testID` on interactive elements for RN tests (not DOM `id`).

---

## Commands

```bash
npm run setup
npm run dashboard:build && npm run dashboard
npm run review:all
npm run review:course -- --course=03-react-native-fundamentals
npm run review:challenge -- --course=03-react-native-fundamentals --challenge=01-expo-setup-basics
npm run review:changed
npm run progress:update
npm run generate:courses   # Regenerate README/metadata from scripts/generate-mobile-courses.js
```

**Expo dev (course project):**

```bash
cd courses/03-react-native-fundamentals/project
npm install
npx expo start
```

**Backend dev:**

```bash
cd courses/04-backend-basics/project
npm install
npm run dev
```

---

## Extending

### Add a challenge

1. Add entry to `courses/{course}/course-config.json`
2. Create `project/challenges/{id}/README.md` + `metadata.json` (`filesToCheck`, `skills`, `patternsRequired`)
3. Add tests under `project/tests/challenge-{id}.test.tsx` (or `.js` for backend)
4. Re-run `npm run progress:update`

### Add a course

1. Create `courses/{id}/` with `course-config.json`, `project/`, `review-engine/`, `ai-review/`
2. Add course to `pathway-review/pathway-config.json`
3. Run `npm run setup`

No changes to `global-review` or dashboard course list logic required.

---

## Learner-ready rules

1. **Stubs only** — README “create/implement” items must not be fully solved in the starter project.
2. **`testID`** — Document required `testID`s in README Technical Requirements.
3. **Merge results** — Single-challenge review must not wipe other challenges in `challenge-results.json`.
4. **Handoff** — Reset `challenge-results.json` to `[]` and summaries to 0% before giving repo to learners.

---

## Regeneration scripts

| Script | Purpose |
|--------|---------|
| `scripts/generate-mobile-courses.js` | Rebuild challenge READMEs + metadata + course-config |
| `scripts/scaffold-projects.js` | Create/update Expo/Node project stubs |

---

**Version:** 1.0.0  
**Last Updated:** 2026-05-21
