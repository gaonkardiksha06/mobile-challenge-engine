import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStorage } from '../../hooks/useAuthStorage';
import { useThemeStorage } from '../../hooks/useThemeStorage';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuthStorage();
  const { theme, toggleTheme, isDark } = useThemeStorage();

  return (
    <View
      style={[styles.container, !isDark && styles.containerLight]}
      testID="profile-screen"
    >
      <Text style={[styles.title, !isDark && styles.textDark]}>Profile</Text>
      {isLoggedIn && user ? (
        <>
          <Text style={[styles.label, !isDark && styles.textMutedDark]} testID="profile-username">
            @{user.username}
          </Text>
          <Text style={[styles.email, !isDark && styles.textMutedDark]} testID="profile-email">
            {user.email}
          </Text>
          <Pressable style={styles.button} onPress={logout} testID="logout-button">
            <Text style={styles.buttonText}>Log out</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text style={[styles.subtitle, !isDark && styles.textMutedDark]}>
            Sign in to see your profile
          </Text>
          <Pressable
            style={styles.button}
            onPress={() => router.push('/auth/login')}
            testID="go-login-button"
          >
            <Text style={styles.buttonText}>Log in</Text>
          </Pressable>
        </>
      )}
      <Pressable style={styles.themeButton} onPress={toggleTheme} testID="theme-toggle">
        <Text style={styles.themeText}>
          Theme: {theme} (tap to switch)
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerLight: { backgroundColor: '#f1f5f9' },
  title: { fontSize: 28, fontWeight: '700', color: '#f8fafc', marginBottom: 16 },
  textDark: { color: '#0f172a' },
  subtitle: { fontSize: 16, color: '#94a3b8', marginBottom: 24, textAlign: 'center' },
  label: { fontSize: 22, fontWeight: '700', color: '#38bdf8', marginBottom: 8 },
  email: { fontSize: 16, color: '#94a3b8', marginBottom: 24 },
  textMutedDark: { color: '#475569' },
  button: {
    backgroundColor: '#38bdf8',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  buttonText: { color: '#0f172a', fontSize: 16, fontWeight: '700' },
  themeButton: {
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  themeText: { color: '#94a3b8', fontSize: 14 },
});
