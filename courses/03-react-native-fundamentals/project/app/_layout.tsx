import { Stack } from 'expo-router';

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
