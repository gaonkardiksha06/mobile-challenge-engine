# Play Store Release Checklist

Use this folder for icons, screenshots, and store listing assets before a **release** build.

## Required assets

- [ ] App icon (1024×1024 PNG, no transparency for Play Store)
- [ ] Feature graphic (1024×500)
- [ ] Phone screenshots (min. 2, 16:9 or 9:16)
- [ ] Short description (80 chars max)
- [ ] Full description (4000 chars max)
- [ ] Privacy policy URL (required if app collects data)

## Build & sign

- [ ] Bump `version` and `android.versionCode` in `app.json`
- [ ] Run `eas build --platform android --profile production`
- [ ] Download AAB from EAS dashboard
- [ ] Test signed **release** APK/AAB on a physical device

## Play Console

- [ ] Create app listing in Google Play Console
- [ ] Upload AAB to Internal testing track first
- [ ] Complete content rating questionnaire
- [ ] Set target API level per current Play requirements
- [ ] Submit for review when checklist is complete

## Verify locally

```bash
cd courses/05-deployment/project
npx expo prebuild
eas build --profile preview --platform android
```
