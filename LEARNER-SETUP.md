# Learner Setup — Course Challenge Installations

Install these tools and packages **before or as you reach** each course challenge. You do not need every extra package on day one — install when you start that course or challenge.

> **Node.js:** Use a current **LTS** release (recommended for Expo and npm).

---

## System tools (by course)

| Tool | Courses / challenges |
|------|----------------------|
| **Node.js + npm** | All courses — run `npm install` in each `courses/*/project` folder |
| **Expo Go** (phone) | React Native courses (01, 03, 04, 05) — [expo.dev/go](https://expo.dev/go) |
| **MongoDB** | Backend Basics, challenges **03–05** — [MongoDB Community](https://www.mongodb.com/try/download/community) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) |
| **EAS CLI** | Deployment — `npm install -g eas-cli` then `eas login` |
| **Android Studio** | Deployment / APK — [developer.android.com/studio](https://developer.android.com/studio) (Android SDK) |

---

## Course 01 — React Native Fundamentals

**Project folder:** `courses/01-react-native-fundamentals/project`

```bash
npm install
```

| Challenge | Package | Command |
|-----------|---------|---------|
| **06** AsyncStorage | Local persistence | `npm install @react-native-async-storage/async-storage` |

Restart Expo after installing: `npx expo start`.

---

## Course 02 — Backend Basics

**Project folder:** `courses/02-backend-basics/project`

```bash
npm install
```

**MongoDB (challenges 03–05)** — install locally or use Atlas, then set:

```bash
# Windows (cmd)
set MONGO_URI=mongodb://127.0.0.1:27017/mobile_challenge

# macOS / Linux
export MONGO_URI=mongodb://127.0.0.1:27017/mobile_challenge
```

**JWT (challenges 04–05, optional):**

```bash
set JWT_SECRET=your-secret-here
```

---

## Course 03 — Advanced React Native

**Project folder:** `courses/03-react-native-advanced/project`

```bash
npm install
```

Most dependencies are in `package.json`. If anything is missing:

| Challenge / area | Packages |
|------------------|----------|
| **01**, **06** Redux | `@reduxjs/toolkit`, `react-redux` |
| **02** NativeWind | `nativewind`, `tailwindcss` |
| **04** Notifications & maps | `expo-notifications`, `react-native-maps` |
| Lint | `@typescript-eslint/parser`, `@typescript-eslint/eslint-plugin` |

On Windows, if npm reports peer dependency conflicts:

```bash
npm install --legacy-peer-deps
```

---

## Course 04 — Challenge Missions

**Project folder:** `courses/04-challenge-missions/project`

```bash
npm install
```

| Missions | Install |
|----------|---------|
| Notes, Habit, Fitness | `npm install @react-native-async-storage/async-storage` |
| Expense, Marketplace, Food delivery | `@reduxjs/toolkit`, `react-redux` (usually in `package.json`) |
| Food delivery | `react-native-maps` |
| Chat, Social | Mock `lib/firebase.ts` included — real Firebase optional |

```bash
npm install --legacy-peer-deps
```

Use the legacy-peer-deps flag only if npm reports peer dependency warnings.

---

## Course 05 — Deployment

**Project folder:** `courses/05-deployment/project`

```bash
npm install
```

| Tool | Install |
|------|---------|
| **EAS CLI** (cloud builds) | `npm install -g eas-cli` then `eas login` |
| **Android SDK** (local APK) | Android Studio |

---

## Challenge READMEs

Some challenges list extra install steps in their own README, for example:

- `courses/01-react-native-fundamentals/project/challenges/06-async-storage/README.md`

Each course `project/README.md` also summarizes packages by challenge.
