#!/usr/bin/env node
/**
 * Detects which challenges are affected by changed files.
 * Uses git diff (unstaged + staged, or against a ref).
 * Output: JSON array of { courseId, challengeId, challengeName } to stdout.
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join, normalize } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { getChallengesForFiles } from './lib/file-to-challenge-map.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..');

function norm(p) {
  return normalize(p).replace(/\\/g, '/');
}

/**
 * Get list of changed files (repo-relative) from git.
 * ref: optional, e.g. 'HEAD' for staged, 'origin/main' for comparison. If not set, use working tree vs HEAD (staged + unstaged).
 */
function getChangedFiles(ref = null) {
  const gitDir = join(ROOT_DIR, '.git');
  if (!existsSync(gitDir)) {
    return [];
  }
  try {
    let output;
    if (ref) {
      // Compare against ref (e.g. origin/main)
      output = execSync(`git diff --name-only ${ref}`, { cwd: ROOT_DIR, encoding: 'utf-8' });
    } else {
      // Staged + unstaged vs HEAD
      output = execSync('git diff --name-only HEAD', { cwd: ROOT_DIR, encoding: 'utf-8' });
    }
    const files = output.trim().split(/\n/).filter(Boolean).map(f => norm(f));
    return files;
  } catch (e) {
    return [];
  }
}

const args = process.argv.slice(2);
const refIndex = args.indexOf('--ref');
const ref = refIndex >= 0 && args[refIndex + 1] ? args[refIndex + 1] : null;

const changedFiles = getChangedFiles(ref);
const challenges = getChallengesForFiles(changedFiles);

console.log(JSON.stringify(challenges, null, 0));
