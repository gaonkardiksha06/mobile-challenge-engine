#!/usr/bin/env node

/**
 * Sync with upstream: save local work, pull from upstream, and accept all upstream changes on conflicts.
 * Use this when you want to get the latest courses/updates and are okay discarding your conflicting changes.
 * Run from repo root: npm run sync-upstream
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

function run(cmd, opts = {}) {
  try {
    return execSync(cmd, { cwd: REPO_ROOT, encoding: 'utf-8', stdio: opts.silent ? 'pipe' : 'inherit', ...opts });
  } catch (e) {
    if (!opts.ignoreExit) throw e;
    return null;
  }
}

if (!existsSync(join(REPO_ROOT, '.git'))) {
  console.error('Not a git repository. Run from the repo root.');
  process.exit(1);
}

// 1. Commit current work if there are changes (so we don't lose uncommitted work)
try {
  run('git add -A');
  const status = run('git status --short', { silent: true }) || '';
  if (status.trim()) {
    run('git commit -m "WIP: save work before syncing with upstream"');
    console.log('Saved your current work in a commit.\n');
  }
} catch (e) {
  console.error('Could not commit. Fix any errors and try again.');
  process.exit(1);
}

// 2. Fetch and merge upstream, accepting upstream's version on conflicts
try {
  run('git fetch upstream');
  run('git merge upstream/main -X theirs -m "Merge upstream/main (accept upstream changes)"');
  console.log('\nSynced with upstream. Your repo now has the latest courses and updates.');
  console.log('To push to your own repo: git push origin main');
} catch (e) {
  console.error('\nMerge failed. You may need to resolve conflicts manually.');
  console.error('To abort the merge: git merge --abort');
  process.exit(1);
}
