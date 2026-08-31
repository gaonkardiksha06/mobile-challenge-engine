# 04-challenge-missions

## 📊 Progress Evidence

*Auto-updated when you run review. Last run: 6/8/2026, 12:45:00 pm*

| Metric | Value |
|--------|-------|
| Challenges completed | 0 / 14 (0%) |
| Average score | 71.8% |

| Challenge | Skills covered | Status |
|-----------|----------------|--------|
| Habit Tracker | useState, FlatList, AsyncStorage | Not passed |
| Pokemon Explorer | fetch, FlatList, Navigation | Not passed |
| Notes App | AsyncStorage, CRUD, TextInput | Not passed |
| Calculator | useState, UI layout | Not passed |
| Meme Viewer | fetch, Image, ScrollView | Not passed |
| Realtime Chat | Firebase, FlatList, Auth | Not passed |
| Expense Tracker | Redux, Charts, Forms | Not passed |
| Movie App | API, Search, Navigation | Not passed |
| AI Recipe App | API, Forms, Loading states | Not passed |
| Food Delivery | Maps, Cart, Navigation | Not passed |
| Social Media Platform | Auth, Feed, Firebase, Upload | Not passed |
| Full Marketplace | Redux, Payments, Search | Not passed |
| Fitness Tracker | Charts, AsyncStorage, Notifications | Not passed |
| Anime Streaming UI | UI design, FlatList, Navigation | Not passed |

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
