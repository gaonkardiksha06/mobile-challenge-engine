import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStorage } from '../../hooks/useAuthStorage';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuthStorage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const next: { email?: string; password?: string } = {};
    if (!email.trim()) next.email = 'Email is required';
    if (!password) next.password = 'Password is required';
    else if (password.length < 6) next.password = 'Password must be at least 6 characters';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    await login({ email: email.trim(), username: email.split('@')[0] || 'user' });
    router.replace('/(tabs)/feed');
  };

  return (
    <View style={styles.container} testID="login-screen">
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#64748b"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        testID="login-email"
      />
      {errors.email ? <Text style={styles.error} testID="login-email-error">{errors.email}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#64748b"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        testID="login-password"
      />
      {errors.password ? (
        <Text style={styles.error} testID="login-password-error">{errors.password}</Text>
      ) : null}
      <Pressable style={styles.button} onPress={handleLogin} testID="login-submit">
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
      <Pressable onPress={() => router.push('/auth/signup')} testID="go-signup">
        <Text style={styles.link}>Create an account</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#0f172a', justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '700', color: '#f8fafc', marginBottom: 24 },
  input: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: '#f8fafc',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  error: { color: '#f87171', marginBottom: 12, fontSize: 14 },
  button: {
    backgroundColor: '#38bdf8',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: { color: '#0f172a', fontSize: 16, fontWeight: '700' },
  link: { color: '#38bdf8', textAlign: 'center', marginTop: 16, fontSize: 15 },
});
