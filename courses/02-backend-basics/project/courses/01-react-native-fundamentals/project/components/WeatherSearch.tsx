import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { fetchWeather } from '../lib/api';

export default function WeatherSearch() {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<{
    name: string;
    temp: number;
    description: string;
    icon: string;
  } | null>(null);

  const search = async () => {
    if (!city.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const result = await fetchWeather(city);
      setWeather(result);
    } catch {
      setError('Could not find weather for that city.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container} testID="weather-search">
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        placeholderTextColor="#64748b"
        value={city}
        onChangeText={setCity}
        testID="weather-city-input"
      />
      <Pressable style={styles.button} onPress={search} testID="weather-search-button">
        <Text style={styles.buttonText}>Search</Text>
      </Pressable>

      {loading && <ActivityIndicator color="#38bdf8" style={styles.loader} />}

      {error && (
        <View testID="weather-error">
          <Text style={styles.errorText}>{error}</Text>
          <Pressable style={styles.button} onPress={search} testID="weather-retry">
            <Text style={styles.buttonText}>Retry</Text>
          </Pressable>
        </View>
      )}

      {weather && !loading && (
        <View style={styles.result} testID="weather-result">
          {weather.icon ? (
            <Image source={{ uri: weather.icon }} style={styles.icon} testID="weather-icon" />
          ) : null}
          <Text style={styles.city}>{weather.name}</Text>
          <Text style={styles.temp} testID="weather-temp">
            {weather.temp}°C
          </Text>
          <Text style={styles.desc}>{weather.description}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', padding: 16 },
  input: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: '#f8fafc',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  button: {
    backgroundColor: '#38bdf8',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: { color: '#0f172a', fontWeight: '700', fontSize: 16 },
  loader: { marginVertical: 16 },
  errorText: { color: '#f87171', marginBottom: 12, textAlign: 'center' },
  result: { alignItems: 'center', padding: 16, backgroundColor: '#1e293b', borderRadius: 12 },
  icon: { width: 64, height: 64, marginBottom: 8 },
  city: { fontSize: 22, fontWeight: '700', color: '#f8fafc' },
  temp: { fontSize: 36, fontWeight: '700', color: '#38bdf8', marginVertical: 8 },
  desc: { fontSize: 16, color: '#94a3b8' },
});
