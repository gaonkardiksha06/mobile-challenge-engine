#!/bin/sh
# Optional: run review for changed challenges on push.
# Install: cp scripts/on-push-review-changed.sh .git/hooks/pre-push && chmod +x .git/hooks/pre-push
# Or run manually before push: npm run review:changed
cd "$(git rev-parse --show-toplevel)" || exit 1
node scripts/run-review-changed.js
exit 0
