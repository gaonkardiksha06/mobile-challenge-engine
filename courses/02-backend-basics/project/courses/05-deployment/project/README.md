# 05-deployment

## 📊 Progress Evidence

*Auto-updated when you run review. Last run: 6/8/2026, 12:45:42 pm*

| Metric | Value |
|--------|-------|
| Challenges completed | 0 / 3 (0%) |
| Average score | 75% |

| Challenge | Skills covered | Status |
|-----------|----------------|--------|
| APK Build | APK, Android build, Device testing | Not passed |
| Expo EAS | EAS Build, eas.json, Cloud build | Not passed |
| Play Store Prep | Screenshots, App icon, Privacy policy, Signed release | Not passed |

## Getting started

```bash
npm install
npx expo start
```

## Tools for deployment challenges

| Tool | Purpose | Install |
|------|---------|---------|
| EAS CLI | Cloud builds | `npm install -g eas-cli` then `eas login` |
| Android SDK | Local APK testing | [Android Studio](https://developer.android.com/studio) |
| Play assets | Store listing | Add screenshots under `store-assets/` (see `store-assets/README.md`) |

Build APK preview:

```bash
eas build --platform android --profile preview
```

Run a challenge review:

```bash
npm run review -- --challenge=01-expo-setup-basics
```
