#!/usr/bin/env node
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

function ensureDir(p) {
  mkdirSync(p, { recursive: true });
}

function write(path, content) {
  ensureDir(dirname(path));
  if (!existsSync(path)) writeFileSync(path, content);
  else console.log(`  skip (exists): ${path}`);
}

// --- React Native / Expo courses ---
const rnCourses = [
  '03-react-native-fundamentals',
  '05-react-native-advanced',
  '06-challenge-missions',
  '07-deployment',
];

const expoPackage = {
  name: 'mobile-challenge-project',
  version: '1.0.0',
  main: 'expo-router/entry',
  scripts: {
    start: 'expo start',
    android: 'expo start --android',
    ios: 'expo start --ios',
    web: 'expo start --web',
    test: 'jest',
    lint: 'eslint .',
    review: 'node ../review-engine/index.js',
    'test:e2e': 'echo "E2E: configure Detox or Maestro per course"',
  },
  dependencies: {
    expo: '~52.0.0',
    'expo-router': '~4.0.0',
    'expo-status-bar': '~2.0.0',
    react: '18.3.1',
    'react-native': '0.76.5',
    'react-native-safe-area-context': '4.12.0',
    'react-native-screens': '~4.4.0',
    '@react-navigation/native': '^7.0.0',
  },
  devDependencies: {
    '@babel/core': '^7.25.0',
    '@types/react': '~18.3.0',
    jest: '^29.7.0',
    'jest-expo': '~52.0.0',
    '@testing-library/react-native': '^12.8.0',
    eslint: '^8.57.0',
    typescript: '~5.3.0',
  },
  private: true,
};

const appJson = {
  expo: {
    name: 'Mobile Challenges',
    slug: 'mobile-challenges',
    version: '1.0.0',
    orientation: 'portrait',
    scheme: 'mobilechallenges',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    plugins: ['expo-router'],
  },
};

for (const courseId of rnCourses) {
  const base = join(ROOT, 'courses', courseId, 'project');
  console.log(`📱 Scaffolding ${courseId}`);
  write(join(base, 'package.json'), JSON.stringify({ ...expoPackage, name: courseId }, null, 2));
  write(join(base, 'app.json'), JSON.stringify(appJson, null, 2));
  write(
    join(base, 'tsconfig.json'),
    JSON.stringify(
      {
        extends: 'expo/tsconfig.base',
        compilerOptions: { strict: true },
        include: ['**/*.ts', '**/*.tsx', '.expo/types/**/*.ts', 'expo-env.d.ts'],
      },
      null,
      2
    )
  );
  write(join(base, 'expo-env.d.ts'), '/// <reference types="expo/types" />\n\n');
  write(
    join(base, 'app/_layout.tsx'),
    `import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="challenge/[id]" options={{ title: 'Challenge' }} />
    </Stack>
  );
}
`
  );
  write(
    join(base, 'app/(tabs)/_layout.tsx'),
    `import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="challenges" options={{ title: 'Challenges' }} />
    </Tabs>
  );
}
`
  );
  write(
    join(base, 'app/(tabs)/index.tsx'),
    `import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container} testID="home-screen">
      <Text style={styles.title}>Mobile Challenge Engine</Text>
      <Text>Open Challenges tab to pick a challenge README.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
});
`
  );
  write(
    join(base, 'app/(tabs)/challenges.tsx'),
    `import { ScrollView, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const CHALLENGES = ${JSON.stringify(
      JSON.parse(readFileSync(join(ROOT, 'courses', courseId, 'course-config.json'), 'utf-8')).challenges.map((c) => ({
        id: c.id,
        name: c.name,
      })),
      null,
      2
    )};

export default function ChallengesScreen() {
  const router = useRouter();
  return (
    <ScrollView style={styles.container} testID="challenge-list">
      {CHALLENGES.map((c) => (
        <Pressable
          key={c.id}
          testID={\`challenge-link-\${c.id}\`}
          style={styles.item}
          onPress={() => router.push(\`/challenge/\${c.id}\`)}
        >
          <Text style={styles.name}>{c.name}</Text>
          <Text style={styles.id}>{c.id}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: { padding: 16, borderBottomWidth: 1, borderColor: '#ddd' },
  name: { fontSize: 16, fontWeight: '600' },
  id: { fontSize: 12, color: '#666', marginTop: 4 },
});
`
  );
  write(
    join(base, 'app/challenge/[id].tsx'),
    `import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function ChallengeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View style={styles.container} testID="challenge-screen">
      <Text style={styles.title}>Challenge: {id}</Text>
      <Text>Read challenges/{id}/README.md and implement in this project.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
});
`
  );
  write(
    join(base, 'components/ProfileCard.tsx'),
    `import { View, Text } from 'react-native';

/** Stub — implement per challenge 01 README */
export default function ProfileCard() {
  return <View testID="profile-card" />;
}
`
  );
  write(
    join(base, 'components/FeatureCards.tsx'),
    `import { View } from 'react-native';

export default function FeatureCards() {
  return <View testID="feature-cards" />;
}
`
  );
  write(
    join(base, 'jest.config.js'),
    `module.exports = {
  preset: 'jest-expo',
  testMatch: ['**/tests/**/*.test.[jt]s?(x)'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg)',
  ],
};
`
  );
  write(
    join(base, 'tests/sample.test.tsx'),
    `import { describe, it, expect } from '@jest/globals';

describe('challenge engine', () => {
  it('runs jest', () => {
    expect(true).toBe(true);
  });
});
`
  );
  write(
    join(base, 'README.md'),
    `# ${courseId}

## 📊 Progress Evidence

| Challenge | Skills | Status |
|-----------|--------|--------|
| _Run review to populate_ | — | — |

## Getting started

\`\`\`bash
npm install
npx expo start
\`\`\`

Run a challenge review:

\`\`\`bash
npm run review -- --challenge=01-expo-setup-basics
\`\`\`
`
  );
  write(join(base, '.eslintrc.json'), JSON.stringify({ extends: ['expo', 'prettier'], rules: { 'no-console': 'warn' } }, null, 2));
}

// --- Backend course ---
const backendBase = join(ROOT, 'courses', '04-backend-basics', 'project');
console.log('🖥️ Scaffolding 04-backend-basics');
write(
  join(backendBase, 'package.json'),
  JSON.stringify(
    {
      name: '04-backend-basics',
      version: '1.0.0',
      type: 'module',
      scripts: {
        start: 'node src/server.js',
        dev: 'node --watch src/server.js',
        test: 'node --experimental-vm-modules node_modules/jest/bin/jest.js',
        lint: 'eslint src',
        review: 'node ../review-engine/index.js',
      },
      dependencies: {
        express: '^4.21.0',
        mongoose: '^8.9.0',
        bcrypt: '^5.1.1',
        jsonwebtoken: '^9.0.2',
        dotenv: '^16.4.5',
        cors: '^2.8.5',
      },
      devDependencies: {
        jest: '^29.7.0',
        supertest: '^7.0.0',
        eslint: '^8.57.0',
      },
    },
    null,
    2
  )
);
write(
  join(backendBase, 'src/server.js'),
  `import express from 'express';

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 4000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(\`Server on \${PORT}\`));
}

export default app;
`
);
write(join(backendBase, 'src/fs-utils.js'), `/** Stub — read/write file helpers */\nexport async function readNotesFile() { return []; }\nexport async function writeNotesFile() {}\n`);
write(join(backendBase, 'src/math.js'), `export function add(a, b) { return a + b; }\n`);
write(join(backendBase, 'src/routes/notes.js'), `import { Router } from 'express';\nconst router = Router();\nexport default router;\n`);
write(join(backendBase, 'src/middleware/logger.js'), `export function logger(req, _res, next) { console.log(req.method, req.url); next(); }\n`);
write(join(backendBase, 'src/db.js'), `/** Stub — Mongoose connection */\nexport async function connectDB() {}\n`);
write(join(backendBase, 'src/models/User.js'), `/** Stub — User schema */\nexport const User = {};\n`);
write(join(backendBase, 'src/routes/users.js'), `import { Router } from 'express';\nexport default Router();\n`);
write(join(backendBase, 'src/routes/auth.js'), `import { Router } from 'express';\nexport default Router();\n`);
write(join(backendBase, 'src/middleware/auth.js'), `export function requireAuth(_req, _res, next) { next(); }\n`);
write(join(backendBase, 'src/routes/posts.js'), `import { Router } from 'express';\nexport default Router();\n`);
write(join(backendBase, 'src/app.js'), `import express from 'express';\nconst app = express();\nexport default app;\n`);
write(join(backendBase, 'tests/sample.test.js'), `import { describe, it, expect } from '@jest/globals';\ndescribe('backend', () => { it('works', () => expect(1).toBe(1)); });\n`);
write(
  join(backendBase, 'README.md'),
  `# Backend Basics

## 📊 Progress Evidence

| Challenge | Skills | Status |
|-----------|--------|--------|
| _Run review to populate_ | — | — |

\`\`\`bash
npm install
npm run dev
npm run review -- --challenge=01-nodejs-basics
\`\`\`
`
);

console.log('\n✅ Project scaffolds written.');
