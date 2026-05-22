#!/usr/bin/env node
/**
 * Builds a map: file path (relative to repo root) -> [{ courseId, challengeId }].
 * Used to detect which challenges are affected by changed files.
 */

import { readFileSync, existsSync, readdirSync } from 'fs';
import { join, normalize } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROOT_DIR = join(__dirname, '../..');

/**
 * Get all courses from pathway config
 */
function getCourses() {
  const pathwayPath = join(ROOT_DIR, 'pathway-review', 'pathway-config.json');
  if (!existsSync(pathwayPath)) return [];
  const pathway = JSON.parse(readFileSync(pathwayPath, 'utf-8'));
  return pathway.courses || [];
}

/**
 * Normalize path to forward slashes for consistent matching
 */
function norm(pathStr) {
  return normalize(pathStr).replace(/\\/g, '/');
}

/**
 * Build map: repo-relative file path -> [{ courseId, challengeId, challengeName }]
 * One file can belong to multiple challenges (e.g. App.tsx).
 */
export function buildFileToChallengeMap() {
  const courses = getCourses();
  const fileToChallenges = new Map(); // file (normalized) -> [{ courseId, challengeId, challengeName }]

  for (const course of courses) {
    const courseId = course.id;
    const projectDir = join(ROOT_DIR, 'courses', courseId, 'project');
    const challengesDir = join(projectDir, 'challenges');
    if (!existsSync(challengesDir)) continue;

    const challengeDirs = readdirSync(challengesDir, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name);

    for (const challengeDir of challengeDirs) {
      const metadataPath = join(challengesDir, challengeDir, 'metadata.json');
      if (!existsSync(metadataPath)) continue;
      const metadata = JSON.parse(readFileSync(metadataPath, 'utf-8'));
      const challengeId = metadata.challengeId || challengeDir;
      const challengeName = metadata.challengeName || challengeId;
      const filesToCheck = metadata.filesToCheck || [];
      const projectRel = `courses/${courseId}/project`;
      for (const file of filesToCheck) {
        const repoRel = norm(join(projectRel, file));
        if (!fileToChallenges.has(repoRel)) fileToChallenges.set(repoRel, []);
        fileToChallenges.get(repoRel).push({ courseId, challengeId, challengeName });
      }
    }
  }

  return fileToChallenges;
}

/**
 * Given a list of changed file paths (relative to repo root), return unique
 * { courseId, challengeId } pairs that are affected.
 */
export function getChallengesForFiles(changedFiles) {
  const map = buildFileToChallengeMap();
  const seen = new Set();
  const out = [];
  for (const f of changedFiles) {
    const normalized = norm(f);
    const challenges = map.get(normalized) || [];
    for (const c of challenges) {
      const key = `${c.courseId}:${c.challengeId}`;
      if (!seen.has(key)) {
        seen.add(key);
        out.push({ courseId: c.courseId, challengeId: c.challengeId, challengeName: c.challengeName });
      }
    }
  }
  return out;
}
