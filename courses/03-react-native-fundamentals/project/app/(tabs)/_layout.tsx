import { Tabs } from 'expo-router';

const headerStyle = {
  backgroundColor: '#1e293b',
  borderBottomColor: '#334155',
};

const headerTitleStyle = {
  color: '#f8fafc',
  fontWeight: '700' as const,
  fontSize: 18,
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle,
        headerTitleStyle,
        headerTintColor: '#38bdf8',
        tabBarStyle: {
          backgroundColor: '#1e293b',
          borderTopColor: '#334155',
        },
        tabBarActiveTintColor: '#38bdf8',
        tabBarInactiveTintColor: '#94a3b8',
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="search" options={{ title: 'Search' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      <Tabs.Screen name="challenges" options={{ href: null }} />
    </Tabs>
  );
}
