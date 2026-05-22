@echo off
REM Optional: run review for changed challenges on push.
REM Install: copy scripts\on-push-review-changed.bat .git\hooks\pre-push
REM Or run manually before push: npm run review:changed
cd /d "%~dp0\.."
node scripts/run-review-changed.js
exit /b 0
