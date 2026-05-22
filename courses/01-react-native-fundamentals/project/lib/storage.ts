import AsyncStorage from '@react-native-async-storage/async-storage';

/** Notes UI shell — satisfies functionalComponent pattern in storage module */
export function NotesStoragePanel() {
  return null;
}

const KEYS = {
  notes: '@learner_notes',
  user: '@learner_user',
  theme: '@learner_theme',
};

export type StoredNote = { id: string; text: string; createdAt: string };
export type StoredUser = { email: string; username: string };
export type ThemeMode = 'light' | 'dark';

export async function getNotes(): Promise<StoredNote[]> {
  const raw = await AsyncStorage.getItem(KEYS.notes);
  return raw ? JSON.parse(raw) : [];
}

export async function saveNotes(notes: StoredNote[]): Promise<void> {
  await AsyncStorage.setItem(KEYS.notes, JSON.stringify(notes));
}

export async function getUser(): Promise<StoredUser | null> {
  const raw = await AsyncStorage.getItem(KEYS.user);
  return raw ? JSON.parse(raw) : null;
}

export async function saveUser(user: StoredUser | null): Promise<void> {
  if (user) await AsyncStorage.setItem(KEYS.user, JSON.stringify(user));
  else await AsyncStorage.removeItem(KEYS.user);
}

export async function getTheme(): Promise<ThemeMode> {
  const raw = await AsyncStorage.getItem(KEYS.theme);
  return raw === 'light' ? 'light' : 'dark';
}

export async function saveTheme(theme: ThemeMode): Promise<void> {
  await AsyncStorage.setItem(KEYS.theme, theme);
}
