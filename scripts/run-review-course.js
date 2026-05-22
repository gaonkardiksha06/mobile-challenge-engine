#!/usr/bin/env node
/**
 * Run review for an entire course. Updates progress after.
 * Usage: node scripts/run-review-course.js --course=01-react-fundamentals
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..');

function main() {
  const args = process.argv.slice(2);
  const courseArg = args.find(a => a.startsWith('--course='));
  const courseId = courseArg ? courseArg.split('=')[1] : null;
  if (!courseId) {
    console.error('Usage: node scripts/run-review-course.js --course=<courseId>');
    console.error('Example: node scripts/run-review-course.js --course=01-react-fundamentals');
    process.exit(1);
  }

  const courseDir = join(ROOT_DIR, 'courses', courseId);
  const reviewScript = join(courseDir, 'review-engine', 'index.js');
  if (!existsSync(reviewScript)) {
    console.error(`❌ Review engine not found: ${courseId}`);
    process.exit(1);
  }

  console.log(`📝 Reviewing all challenges in course: ${courseId}\n`);
  execSync(`node "${reviewScript}"`, { cwd: courseDir, stdio: 'inherit' });
  console.log('\n📊 Updating progress...');
  execSync('node scripts/update-progress.js', { cwd: ROOT_DIR, stdio: 'inherit' });
  console.log('\n✅ Done.');
}

main();
