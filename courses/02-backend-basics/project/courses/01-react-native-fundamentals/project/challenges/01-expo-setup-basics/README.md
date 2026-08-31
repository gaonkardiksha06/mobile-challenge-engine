# Challenge: Expo Setup & Basics

**Course:** React Native Fundamentals

## Goal

Complete all tasks for **Expo Setup & Basics** in the course project. Work on this challenge only until you pass review (≥ 80%).

## Concepts

- Expo
- Components
- Flexbox
- Styling
- View
- Text
- Image
- Button

## Tasks

1. Create Expo app and run on Expo Go
2. Change app name and icon
3. Build profile card UI (image, username, bio, follow button)
4. Flexbox: 3 cards in a row with responsive spacing and center alignment
5. Theme styling: dark mode colors, custom fonts, rounded UI

## Technical Requirements

- Implement features in the files listed in `metadata.json` (`filesToCheck`).
- Use TypeScript/JavaScript patterns appropriate for React Native / Expo.
- No `console.log` in production paths; pass ESLint where configured.
- Add `testID` props on key interactive elements for automated tests (e.g. `testID="follow-button"`).

## Preview your work

All Challenge 01 UI lives in this course project. From the repo root:

```bash
cd courses/01-react-native-fundamentals/project
npm install
npx expo start
```

Edit `components/ProfileCard.tsx`, `components/FeatureCards.tsx`, and `app/(tabs)/index.tsx` (see `metadata.json`). **Fast Refresh** applies saves to every connected preview automatically.

### See changes side by side

Run **two previews of the same project** so you can compare layout on desktop vs a real device while you build the profile card, feature cards, and theme:

| Preview | How to open |
|---------|-------------|
| **Web** | In the Expo terminal, press `w`, or run `npm run web` in a second terminal from the same project folder |
| **Phone (Expo Go)** | Scan the QR code with [Expo Go](https://expo.dev/go) (Android) or the Camera app (iOS) |

Keep the browser window and your phone on screen together — both update when you save.

If the dev server is already bound to port `8081` for Expo Go, you can start web on another port in a **second terminal**:

```bash
cd courses/01-react-native-fundamentals/project
npx expo start --web --port 8082
```

### Other Expo course projects (optional)

To compare this app with other pathway projects at the same time, run **each course project in its own terminal** on a **different port** (install dependencies once per project first):

```bash
# Terminal 1 — React Native Fundamentals (this challenge)
cd courses/01-react-native-fundamentals/project
npx expo start --port 8081

# Terminal 2 — Advanced React Native
cd courses/03-react-native-advanced/project
npm install
npx expo start --port 8082

# Terminal 3 — Challenge Missions
cd courses/04-challenge-missions/project
npm install
npx expo start --port 8083

# Terminal 4 — Deployment
cd courses/05-deployment/project
npm install
npx expo start --port 8084
```

Open each terminal’s web URL (`w`) or QR code in Expo Go to view the apps side by side. Only **01-react-native-fundamentals** is required for Challenge 01; the others are for comparison across the pathway.

## Verify

```bash
cd courses/01-react-native-fundamentals/project
npm run review -- --challenge=01-expo-setup-basics
```

Pass threshold: **≥ 80%**.
