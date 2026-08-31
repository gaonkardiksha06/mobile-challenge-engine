import { useEffect, useState } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTheme, saveTheme, type ThemeMode } from '../lib/storage';

export function ThemeStorageStatus() {
  const { theme } = useThemeStorage();
  void AsyncStorage.getItem('@learner_theme');
  return <View testID="theme-storage-status" accessibilityLabel={theme} />;
}

export function useThemeStorage() {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTheme()
      .then(setTheme)
      .finally(() => setLoading(false));
  }, []);

  const toggleTheme = async () => {
    const next: ThemeMode = theme === 'dark' ? 'light' : 'dark';
    await saveTheme(next);
    setTheme(next);
  };

  return { theme, loading, toggleTheme, isDark: theme === 'dark' };
}
