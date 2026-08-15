# Challenge: AsyncStorage

**Course:** React Native Fundamentals

## Goal

Complete all tasks for **AsyncStorage** in the course project. Work on this challenge only until you pass review (≥ 80%).

## Concepts

- AsyncStorage
- Local persistence
- Theme preference
- Auto-login

## Tasks

1. Save and retrieve notes locally
2. Persistent login state with auto-login
3. Save and restore dark/light theme preference

## Technical Requirements

- Implement features in the files listed in `metadata.json` (`filesToCheck`).
- Use TypeScript/JavaScript patterns appropriate for React Native / Expo.
- No `console.log` in production paths; pass ESLint where configured.
- Add `testID` props on key interactive elements for automated tests (e.g. `testID="follow-button"`).

## Installation

From the course project folder:

```bash
cd courses/01-react-native-fundamentals/project
npm install @react-native-async-storage/async-storage
```

Restart Expo after installing.

## Verify

```bash
cd courses/01-react-native-fundamentals/project
npm run review -- --challenge=06-async-storage
```

Pass threshold: **≥ 80%**.

