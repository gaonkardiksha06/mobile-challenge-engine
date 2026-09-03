# 05-deployment

## 📊 Progress Evidence

*Auto-updated when you run review. Last run: 3/9/2026, 6:52:46 pm*

| Metric | Value |
|--------|-------|
| Challenges completed | 3 / 3 (100%) |
| Average score | 97.5% |

| Challenge | Skills covered | Status |
|-----------|----------------|--------|
| APK Build | APK, Android build, Device testing | Passed |
| Expo EAS | EAS Build, eas.json, Cloud build | Passed |
| Play Store Prep | Screenshots, App icon, Privacy policy, Signed release | Passed |

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
