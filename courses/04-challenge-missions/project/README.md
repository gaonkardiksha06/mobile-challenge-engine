# 04-challenge-missions

## 📊 Progress Evidence

*Auto-updated when you run review. Last run: 3/9/2026, 5:39:08 pm*

| Metric | Value |
|--------|-------|
| Challenges completed | 14 / 14 (100%) |
| Average score | 86.8% |

| Challenge | Skills covered | Status |
|-----------|----------------|--------|
| Habit Tracker | useState, FlatList, AsyncStorage | Passed |
| Pokemon Explorer | fetch, FlatList, Navigation | Passed |
| Notes App | AsyncStorage, CRUD, TextInput | Passed |
| Calculator | useState, UI layout | Passed |
| Meme Viewer | fetch, Image, ScrollView | Passed |
| Realtime Chat | Firebase, FlatList, Auth | Passed |
| Expense Tracker | Redux, Charts, Forms | Passed |
| Movie App | API, Search, Navigation | Passed |
| AI Recipe App | API, Forms, Loading states | Passed |
| Food Delivery | Maps, Cart, Navigation | Passed |
| Social Media Platform | Auth, Feed, Firebase, Upload | Passed |
| Full Marketplace | Redux, Payments, Search | Passed |
| Fitness Tracker | Charts, AsyncStorage, Notifications | Passed |
| Anime Streaming UI | UI design, FlatList, Navigation | Passed |

## Getting started

```bash
npm install
npx expo start
```

## Extra packages (by mission tier)

| Missions | Install |
|----------|---------|
| Notes, Habit, Fitness (AsyncStorage) | `npm install @react-native-async-storage/async-storage` |
| Expense, Marketplace, Food delivery (Redux) | `@reduxjs/toolkit`, `react-redux` (in package.json) |
| Food delivery (maps) | `react-native-maps` |
| Chat, Social (Firebase) | Mock `lib/firebase.ts` included — real Firebase optional |

Use `npm install --legacy-peer-deps` if peer dependency warnings appear.

Mission screens live under `app/` (e.g. `app/index.tsx`, `app/notes.tsx`). Open them from the home hub or Expo Router.

Run a challenge review:

```bash
npm run review -- --challenge=01-expo-setup-basics
```
