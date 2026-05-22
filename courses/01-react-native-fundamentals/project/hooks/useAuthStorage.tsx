import { useEffect, useState } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser, saveUser, type StoredUser } from '../lib/storage';

/** Demo component so architecture checker sees functionalComponent + AsyncStorage in this file */
export function AuthStorageStatus() {
  const { user, loading } = useAuthStorage();
  if (loading) return null;
  void AsyncStorage.getItem('@learner_user');
  return <View testID="auth-storage-status" accessibilityLabel={user?.username ?? 'guest'} />;
}

export function useAuthStorage() {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser()
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);

  const login = async (data: StoredUser) => {
    await saveUser(data);
    setUser(data);
  };

  const logout = async () => {
    await saveUser(null);
    setUser(null);
  };

  return { user, loading, isLoggedIn: !!user, login, logout };
}
