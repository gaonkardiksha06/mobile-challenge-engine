# Challenge: APK Build

**Course:** Deployment

## Goal

Complete all tasks for **APK Build** in the course project. Work on this challenge only until you pass review (≥ 80%).

## Concepts

- APK
- Android build
- Device testing

## Tasks

1. Generate APK
2. Test on real device
3. Fix crashes

## Technical Requirements

- Implement features in the files listed in `metadata.json` (`filesToCheck`).
- Use TypeScript/JavaScript patterns appropriate for React Native / Expo.
- No `console.log` in production paths; pass ESLint where configured.
- Add `testID` props on key interactive elements for automated tests (e.g. `testID="follow-button"`).

## Verify

```bash
cd courses/05-deployment/project
npm run review -- --challenge=01-apk-build
```

Pass threshold: **≥ 80%**.
