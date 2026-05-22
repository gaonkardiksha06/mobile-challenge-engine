#!/usr/bin/env node
/**
 * Generates mobile pathway courses, challenges (README + metadata), and course configs.
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const COURSES = [
  {
    id: '01-react-native-fundamentals',
    name: 'React Native Fundamentals',
    description: 'Expo, components, navigation, lists, forms, APIs, and AsyncStorage',
    challenges: [
      {
        id: '01-expo-setup-basics',
        name: 'Expo Setup & Basics',
        skills: ['Expo', 'Components', 'Flexbox', 'Styling', 'View', 'Text', 'Image', 'Button'],
        parts: [
          'Create Expo app and run on Expo Go',
          'Change app name and icon',
          'Build profile card UI (image, username, bio, follow button)',
          'Flexbox: 3 cards in a row with responsive spacing and center alignment',
          'Theme styling: dark mode colors, custom fonts, rounded UI',
        ],
        files: ['app/(tabs)/index.tsx', 'components/ProfileCard.tsx', 'components/FeatureCards.tsx'],
        patterns: ['functionalComponent', 'useState', 'StyleSheet'],
      },
      {
        id: '02-navigation-system',
        name: 'Navigation System',
        skills: ['React Navigation', 'Stack navigation', 'Tabs', 'Route params', 'Dynamic headers'],
        parts: [
          'Install navigation and create Home + Profile screens',
          'Stack: Home → Details with username param',
          'Bottom tabs: Home, Search, Profile',
          'Dynamic header title and custom header styling',
        ],
        files: ['app/_layout.tsx', 'app/(tabs)/_layout.tsx', 'app/details/[username].tsx'],
        patterns: ['functionalComponent', 'useNavigation'],
      },
      {
        id: '03-lists-data-rendering',
        name: 'Lists & Data Rendering',
        skills: ['FlatList', 'ScrollView', 'map()', 'Search filter', 'Empty states', 'Loading'],
        parts: [
          'Vertical image gallery + horizontal category scroll (ScrollView)',
          'FlatList feed with posts, usernames, likes',
          'Search bar with live filter',
          'Empty state ("No Data") and loading spinner',
        ],
        files: ['components/PostFeed.tsx', 'components/ImageGallery.tsx', 'components/SearchBar.tsx'],
        patterns: ['functionalComponent', 'useState', 'useEffect', 'FlatList'],
      },
      {
        id: '04-forms-validation',
        name: 'Forms & Validation',
        skills: ['TextInput', 'useState', 'Form validation', 'Multi-step forms'],
        parts: [
          'Login form: email, password; validate empty fields and password length',
          'Signup: confirm password, username, error messages',
          'Multi-step form with step indicator and Next/Previous',
        ],
        files: ['app/auth/login.tsx', 'app/auth/signup.tsx', 'components/MultiStepForm.tsx'],
        patterns: ['functionalComponent', 'useState', 'TextInput'],
      },
      {
        id: '05-api-integration',
        name: 'API Integration',
        skills: ['fetch', 'async/await', 'useEffect', 'Loading states', 'Error handling'],
        parts: [
          'Fetch users from JSONPlaceholder (cards with email, avatar)',
          'Weather app: search city, temperature, weather icon',
          'Network error UI with retry button',
        ],
        files: ['components/UserList.tsx', 'components/WeatherSearch.tsx', 'lib/api.ts'],
        patterns: ['functionalComponent', 'useEffect', 'useState', 'fetch'],
      },
      {
        id: '06-async-storage',
        name: 'AsyncStorage',
        skills: ['AsyncStorage', 'Local persistence', 'Theme preference', 'Auto-login'],
        parts: [
          'Save and retrieve notes locally',
          'Persistent login state with auto-login',
          'Save and restore dark/light theme preference',
        ],
        files: ['lib/storage.ts', 'hooks/useAuthStorage.ts', 'hooks/useThemeStorage.ts'],
        patterns: ['functionalComponent', 'useEffect', 'useState', 'AsyncStorage'],
      },
      {
        id: '07-mini-social-feed',
        name: 'Mini Social Feed (Capstone)',
        skills: ['Auth UI', 'Navigation', 'API posts', 'AsyncStorage', 'FlatList', 'Profile'],
        parts: [
          'Authentication UI (login/signup screens)',
          'Tab + stack navigation wired together',
          'API-driven post feed with FlatList',
          'AsyncStorage login persistence',
          'Profile page with user info',
        ],
        files: ['app/(tabs)/feed.tsx', 'app/(tabs)/profile.tsx', 'app/_layout.tsx'],
        patterns: ['functionalComponent', 'useEffect', 'FlatList', 'useState'],
      },
    ],
  },
  {
    id: '02-backend-basics',
    name: 'Backend Basics',
    description: 'Node.js, Express, MongoDB, and JWT authentication',
    challenges: [
      {
        id: '01-nodejs-basics',
        name: 'Node.js Basics',
        skills: ['Modules', 'npm', 'File system', 'HTTP server'],
        parts: ['Setup Node project and simple HTTP server', 'Read and write files', 'Custom modules with export/import'],
        files: ['src/server.js', 'src/fs-utils.js', 'src/math.js'],
        patterns: ['http', 'fs'],
      },
      {
        id: '02-express-apis',
        name: 'Express.js APIs',
        skills: ['Express', 'Routes', 'Middleware', 'REST'],
        parts: ['GET, POST, DELETE routes', 'Logger and error middleware', 'Notes REST API (add, delete, get)'],
        files: ['src/app.js', 'src/routes/notes.js', 'src/middleware/logger.js'],
        patterns: ['express', 'middleware'],
      },
      {
        id: '03-mongodb',
        name: 'MongoDB',
        skills: ['Mongoose', 'Schemas', 'CRUD', 'MongoDB Atlas'],
        parts: ['Connect MongoDB with Mongoose', 'User schema (username, email, password)', 'Create, update, delete user'],
        files: ['src/db.js', 'src/models/User.js', 'src/routes/users.js'],
        patterns: ['mongoose', 'schema'],
      },
      {
        id: '04-jwt-authentication',
        name: 'JWT Authentication',
        skills: ['bcrypt', 'JWT', 'Protected routes'],
        parts: ['Register API with hashed password', 'Login API with token generation', 'Protected profile route'],
        files: ['src/routes/auth.js', 'src/middleware/auth.js'],
        patterns: ['jwt', 'bcrypt'],
      },
      {
        id: '05-blog-backend-api',
        name: 'Blog Backend API (Capstone)',
        skills: ['User auth', 'CRUD posts', 'JWT protection', 'MongoDB'],
        parts: ['User registration and login', 'CRUD for blog posts', 'JWT-protected routes', 'MongoDB storage'],
        files: ['src/app.js', 'src/routes/posts.js', 'src/routes/auth.js'],
        patterns: ['express', 'jwt', 'mongoose'],
      },
    ],
  },
  {
    id: '03-react-native-advanced',
    name: 'Advanced React Native',
    description: 'Redux Toolkit, NativeWind, Firebase, maps, payments, optimization',
    challenges: [
      {
        id: '01-redux-toolkit',
        name: 'Redux Toolkit',
        skills: ['Store', 'Slice', 'Actions', 'createAsyncThunk'],
        parts: ['Counter app (increment/decrement)', 'Todo state (add/delete)', 'Fetch products API into Redux'],
        files: ['store/index.ts', 'features/counter/counterSlice.ts', 'features/todos/todoSlice.ts'],
        patterns: ['redux', 'createSlice', 'useSelector'],
      },
      {
        id: '02-nativewind',
        name: 'NativeWind',
        skills: ['Tailwind styling', 'Responsive layouts', 'Tablet support'],
        parts: ['Convert traditional StyleSheet to NativeWind', 'Responsive UI with tablet breakpoints'],
        files: ['app/(tabs)/index.tsx', 'tailwind.config.js'],
        patterns: ['className', 'nativewind'],
      },
      {
        id: '03-firebase',
        name: 'Firebase',
        skills: ['Firebase Auth', 'Firestore', 'Storage'],
        parts: ['Signup and login with Firebase Auth', 'Firestore chat (save/fetch messages)', 'Upload profile image to Storage'],
        files: ['lib/firebase.ts', 'app/chat.tsx', 'components/ProfileImageUpload.tsx'],
        patterns: ['firebase', 'useEffect'],
      },
      {
        id: '04-notifications-maps',
        name: 'Notifications & Maps',
        skills: ['Push notifications', 'Maps', 'Location'],
        parts: ['Send local push notification', 'Maps with static marker and user location'],
        files: ['lib/notifications.ts', 'app/map.tsx'],
        patterns: ['expo-notifications', 'react-native-maps'],
      },
      {
        id: '05-payments-optimization',
        name: 'Payments & Optimization',
        skills: ['Stripe', 'Memoization', 'Lazy loading', 'Performance'],
        parts: ['Payment/checkout screen and success page', 'Memoization, lazy loading, reduce re-renders'],
        files: ['app/checkout.tsx', 'components/ProductList.tsx'],
        patterns: ['useMemo', 'useCallback', 'React.memo'],
      },
      {
        id: '06-full-ecommerce-app',
        name: 'Full E-Commerce App (Capstone)',
        skills: ['Auth', 'Redux cart', 'Payments', 'Maps', 'Firebase', 'AsyncStorage'],
        parts: [
          'Authentication flow',
          'Redux cart with persistent storage',
          'Stripe checkout',
          'Maps and push notifications',
          'Firebase image upload and product API',
        ],
        files: ['app/_layout.tsx', 'store/cartSlice.ts', 'app/checkout.tsx'],
        patterns: ['redux', 'firebase', 'useMemo'],
      },
    ],
  },
  {
    id: '04-challenge-missions',
    name: 'Challenge Missions',
    description: 'Beginner, intermediate, and advanced mission projects',
    challenges: [
      { id: '01-habit-tracker', name: 'Habit Tracker', tier: 'beginner', skills: ['useState', 'FlatList', 'AsyncStorage'], parts: ['Track daily habits', 'Mark complete', 'Persist habits locally'], files: ['app/index.tsx'], patterns: ['useState', 'FlatList'] },
      { id: '02-pokemon-explorer', name: 'Pokemon Explorer', tier: 'beginner', skills: ['fetch', 'FlatList', 'Navigation'], parts: ['List Pokemon from API', 'Detail screen with stats'], files: ['app/pokemon/[id].tsx'], patterns: ['fetch', 'FlatList'] },
      { id: '03-notes-app', name: 'Notes App', tier: 'beginner', skills: ['AsyncStorage', 'CRUD', 'TextInput'], parts: ['Create, edit, delete notes', 'Persist locally'], files: ['app/notes.tsx'], patterns: ['AsyncStorage', 'useState'] },
      { id: '04-calculator', name: 'Calculator', tier: 'beginner', skills: ['useState', 'UI layout'], parts: ['Basic arithmetic operations', 'Clear and display'], files: ['app/index.tsx'], patterns: ['useState'] },
      { id: '05-meme-viewer', name: 'Meme Viewer', tier: 'beginner', skills: ['fetch', 'Image', 'ScrollView'], parts: ['Fetch memes from API', 'Vertical scroll gallery'], files: ['app/index.tsx'], patterns: ['fetch', 'ScrollView'] },
      { id: '06-realtime-chat', name: 'Realtime Chat', tier: 'intermediate', skills: ['Firebase', 'FlatList', 'Auth'], parts: ['Auth', 'Send/receive messages in realtime'], files: ['app/chat.tsx'], patterns: ['firebase', 'FlatList'] },
      { id: '07-expense-tracker', name: 'Expense Tracker', tier: 'intermediate', skills: ['Redux', 'Charts', 'Forms'], parts: ['Add expenses', 'Category totals', 'Monthly summary'], files: ['store/expenseSlice.ts'], patterns: ['redux', 'useState'] },
      { id: '08-movie-app', name: 'Movie App', tier: 'intermediate', skills: ['API', 'Search', 'Navigation'], parts: ['Movie search', 'Detail page', 'Favorites'], files: ['app/movie/[id].tsx'], patterns: ['fetch', 'useState'] },
      { id: '09-ai-recipe-app', name: 'AI Recipe App', tier: 'intermediate', skills: ['API', 'Forms', 'Loading states'], parts: ['Ingredient input', 'Fetch AI recipes', 'Save favorites'], files: ['app/recipes.tsx'], patterns: ['fetch', 'useState'] },
      { id: '10-food-delivery', name: 'Food Delivery', tier: 'advanced', skills: ['Maps', 'Cart', 'Navigation'], parts: ['Restaurant list', 'Cart', 'Map tracking UI'], files: ['app/cart.tsx'], patterns: ['redux', 'react-native-maps'] },
      { id: '11-social-media-platform', name: 'Social Media Platform', tier: 'advanced', skills: ['Auth', 'Feed', 'Firebase', 'Upload'], parts: ['Feed, likes, comments', 'Profile and image upload'], files: ['app/feed.tsx'], patterns: ['firebase', 'FlatList'] },
      { id: '12-full-marketplace', name: 'Full Marketplace', tier: 'advanced', skills: ['Redux', 'Payments', 'Search'], parts: ['Product catalog', 'Cart checkout', 'Seller listings'], files: ['app/shop.tsx'], patterns: ['redux', 'fetch'] },
      { id: '13-fitness-tracker', name: 'Fitness Tracker', tier: 'advanced', skills: ['Charts', 'AsyncStorage', 'Notifications'], parts: ['Workout log', 'Progress charts', 'Reminders'], files: ['app/workouts.tsx'], patterns: ['AsyncStorage', 'useState'] },
      { id: '14-anime-streaming-ui', name: 'Anime Streaming UI', tier: 'advanced', skills: ['UI design', 'FlatList', 'Navigation'], parts: ['Browse grid', 'Detail with episodes UI', 'Watchlist'], files: ['app/anime/[id].tsx'], patterns: ['FlatList', 'useNavigation'] },
    ],
  },
  {
    id: '05-deployment',
    name: 'Deployment',
    description: 'APK builds, Expo EAS, and Play Store preparation',
    challenges: [
      {
        id: '01-apk-build',
        name: 'APK Build',
        skills: ['APK', 'Android build', 'Device testing'],
        parts: ['Generate APK', 'Test on real device', 'Fix crashes'],
        files: ['app.json', 'eas.json'],
        patterns: ['expo-build'],
      },
      {
        id: '02-expo-eas',
        name: 'Expo EAS',
        skills: ['EAS Build', 'eas.json', 'Cloud build'],
        parts: ['Configure eas.json', 'Run cloud build'],
        files: ['eas.json', 'app.json'],
        patterns: ['eas'],
      },
      {
        id: '03-play-store-prep',
        name: 'Play Store Prep',
        skills: ['Screenshots', 'App icon', 'Privacy policy', 'Signed release'],
        parts: ['Create screenshots and app icon', 'Privacy policy', 'Signed release build'],
        files: ['app.json', 'store-assets/README.md'],
        patterns: ['release'],
      },
    ],
  },
];

function buildReadme(course, ch) {
  const parts = (ch.parts || []).map((p, i) => `${i + 1}. ${p}`).join('\n');
  const tier = ch.tier ? `\n**Tier:** ${ch.tier}\n` : '';
  return `# Challenge: ${ch.name}

**Course:** ${course.name}${tier}

## Goal

Complete all tasks for **${ch.name}** in the course project. Work on this challenge only until you pass review (≥ 80%).

## Concepts

${(ch.skills || []).map(s => `- ${s}`).join('\n')}

## Tasks

${parts || '- See challenge description in the pathway curriculum.'}

## Technical Requirements

- Implement features in the files listed in \`metadata.json\` (\`filesToCheck\`).
- Use TypeScript/JavaScript patterns appropriate for ${course.id.includes('backend') ? 'Node.js' : 'React Native / Expo'}.
- No \`console.log\` in production paths; pass ESLint where configured.
- Add \`testID\` props on key interactive elements for automated tests (e.g. \`testID="follow-button"\`).

## Verify

\`\`\`bash
cd courses/${course.id}/project
npm run review -- --challenge=${ch.id}
\`\`\`

Pass threshold: **≥ 80%**.
`;
}

function buildMetadata(course, ch) {
  return {
    challengeId: ch.id,
    challengeName: ch.name,
    difficulty: ch.tier || (ch.id.includes('capstone') || ch.name.includes('Capstone') ? 'advanced' : 'intermediate'),
    estimatedTime: ch.tier === 'beginner' ? '2-4 hours' : ch.tier === 'advanced' ? '6-10 hours' : '3-5 hours',
    skills: ch.skills || [],
    filesToCheck: ch.files || [],
    patternsRequired: ch.patterns || ['functionalComponent'],
    ...(ch.tier ? { tier: ch.tier } : {}),
  };
}

function writeCourseConfig(course) {
  const n = course.challenges.length;
  const weight = Math.round((1 / n) * 1000) / 1000;
  const config = {
    courseId: course.id,
    courseName: course.name,
    description: course.description,
    version: '1.0.0',
    challenges: course.challenges.map(ch => ({
      id: ch.id,
      name: ch.name,
      weight,
    })),
    scoring: {
      functionalTests: 0.35,
      codeQuality: 0.15,
      architecture: 0.1,
      bestPractices: 0.1,
      e2eTests: 0.15,
      aiReview: 0.15,
    },
    requirements: { minScore: 80, minCompletion: 100 },
  };
  const dir = join(ROOT, 'courses', course.id);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'course-config.json'), JSON.stringify(config, null, 2));
}

function writeChallenges(course) {
  const challengesDir = join(ROOT, 'courses', course.id, 'project', 'challenges');
  for (const ch of course.challenges) {
    const dir = join(challengesDir, ch.id);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'README.md'), buildReadme(course, ch));
    writeFileSync(join(dir, 'metadata.json'), JSON.stringify(buildMetadata(course, ch), null, 2));
  }
}

function writeEmptyResults(courseId) {
  const resultsDir = join(ROOT, 'courses', courseId, 'results');
  mkdirSync(resultsDir, { recursive: true });
  writeFileSync(join(resultsDir, 'challenge-results.json'), '[]\n');
  writeFileSync(
    join(resultsDir, 'course-summary.json'),
    JSON.stringify(
      {
        courseId,
        averageScore: 0,
        completionPercentage: 0,
        totalChallenges: 0,
        completedChallenges: 0,
        badgeLevel: 'none',
        challengeResults: [],
      },
      null,
      2
    )
  );
  writeFileSync(join(resultsDir, 'ai-feedback.json'), '[]\n');
}

// Main
for (const course of COURSES) {
  writeCourseConfig(course);
  writeChallenges(course);
  writeEmptyResults(course.id);
  console.log(`✅ ${course.id}: ${course.challenges.length} challenges`);
}

console.log('\nDone generating mobile courses.');
