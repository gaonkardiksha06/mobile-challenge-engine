# Mobile Challenge Engine

Automated skill assessment for **React Native**, **Node/Express backends**, **advanced mobile features**, **mission projects**, and **deployment** — following the same architecture as the [web Challenge Engine](https://github.com/sparkplustech/challenge-engine-react).

## Pathway: Mobile & Full-Stack Engineer

| Course | Challenges | Focus |
|--------|------------|--------|
| React Native Fundamentals | 7 | Expo, UI, navigation, lists, forms, API, AsyncStorage |
| Backend Basics | 5 | Node, Express, MongoDB, JWT |
| Advanced React Native | 6 | Redux, NativeWind, Firebase, maps, payments |
| Challenge Missions | 14 | Beginner → advanced app projects |
| Deployment | 3 | APK, EAS, Play Store |

**35 challenges** total. Pass each challenge at **≥ 80%** via the automated review engine.

## Quick start

```bash
git clone <your-repo-url>
cd mobile-challenge-engine
npm run setup
```

**Dashboard** (browse challenges, run reviews):

```bash
npm run dashboard:build
npm run dashboard
# http://localhost:7700
```

**Run an Expo course:**

```bash
cd courses/03-react-native-fundamentals/project
npm install
npx expo start
```

**Run a challenge review:**

```bash
cd courses/03-react-native-fundamentals/project
npm run review -- --challenge=01-expo-setup-basics
```

Or from repo root:

```bash
npm run review:challenge -- --course=03-react-native-fundamentals --challenge=01-expo-setup-basics
```

## Challenge locations

Instructions live in each challenge folder:

```
courses/03-react-native-fundamentals/project/challenges/01-expo-setup-basics/README.md
```

Use the in-app **Challenges** tab (Expo) or open READMEs in your editor.

## Review & scoring

Six layers: functional tests, ESLint, architecture patterns, best practices, E2E (when configured), AI review (Groq).

```bash
npm run review:all          # All courses
npm run review:changed      # Git-changed challenges only
npm run progress:update     # Refresh learner-results/progress.json
```

Optional AI review: create `.env` at repo root:

```
GROQ_API_KEY=your_key_here
```

## Documentation

- **[SYSTEM.md](./SYSTEM.md)** — Architecture, curriculum map, extending the engine
- Reference: `challenge-engine/SYSTEM.md` (web pathway)

## Regenerate curriculum files

After editing `scripts/generate-mobile-courses.js`:

```bash
npm run generate:courses
```

## Progress evidence

Results are written to:

- `courses/{course}/results/challenge-results.json`
- `learner-results/progress.json`
- Course `project/README.md` evidence table (after review)

---

**License:** MIT








## 📈 Progress Summary

**Last updated:** 5/21/2026, 5:08:05 PM

### Pathway

| Metric | Value |
|--------|-------|
| Challenges completed | 2 / 7 (28.6%) |
| Overall score | 20.8% |

### By course

| Course | Completed | Score | Status |
|--------|-----------|-------|--------|
| React Native Fundamentals | 2/7 (28.6%) | 83.2% | Pass |
| Backend Basics | 0/0 (0%) | 0% | Pass |
| Advanced React Native | 0/0 (0%) | 0% | Pass |
| Challenge Missions | 0/0 (0%) | 0% | Pass |
| Deployment | 0/0 (0%) | 0% | Pass |

