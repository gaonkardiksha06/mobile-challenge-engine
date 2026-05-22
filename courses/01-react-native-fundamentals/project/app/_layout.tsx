import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useAuthStorage } from '../hooks/useAuthStorage';

const headerStyle = {
  backgroundColor: '#1e293b',
  borderBottomColor: '#334155',
};

const headerTitleStyle = {
  color: '#f8fafc',
  fontWeight: '700' as const,
  fontSize: 18,
};

export default function RootLayout() {
  const { isLoggedIn, loading } = useAuthStorage();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    const inAuthGroup = segments[0] === 'auth';
    const onProtectedTab = segments[1] === 'feed' || segments[1] === 'profile';
    if (!isLoggedIn && segments[0] === '(tabs)' && onProtectedTab) {
      router.replace('/auth/login');
    } else if (isLoggedIn && inAuthGroup) {
      router.replace('/(tabs)/feed');
    }
  }, [isLoggedIn, loading, segments, router]);

  return (
    <Stack
      screenOptions={{
        headerStyle,
        headerTitleStyle,
        headerTintColor: '#38bdf8',
        contentStyle: { backgroundColor: '#0f172a' },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth/login" options={{ title: 'Login', headerShown: true }} />
      <Stack.Screen name="auth/signup" options={{ title: 'Sign up', headerShown: true }} />
      <Stack.Screen
        name="details/[username]"
        options={({ route }) => ({
          title: `@${(route.params as { username?: string })?.username ?? 'user'}`,
          headerStyle,
          headerTitleStyle,
          headerTintColor: '#38bdf8',
        })}
      />
      <Stack.Screen name="challenge/[id]" options={{ title: 'Challenge' }} />
    </Stack>
  );
}
