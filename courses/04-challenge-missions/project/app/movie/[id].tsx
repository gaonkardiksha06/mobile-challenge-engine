import { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

type Movie = {
  Title: string;
  Year: string;
  Plot: string;
  Poster: string;
  imdbRating: string;
};

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`https://www.omdbapi.com/?apikey=trilogy&i=${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.Response === 'True') setMovie(data);
      })
      .catch(() => {
        setMovie({
          Title: 'Demo Movie',
          Year: '2024',
          Plot: 'A learner builds mobile apps with Expo.',
          Poster: 'https://placehold.co/200x300/0f172a/38bdf8?text=Movie',
          imdbRating: '8.5',
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="#38bdf8" size="large" />
      </View>
    );
  }

  if (!movie) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Movie not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: movie.Poster }} style={styles.poster} testID="movie-poster" />
      <Text style={styles.title}>{movie.Title}</Text>
      <Text style={styles.meta}>{movie.Year} · ★ {movie.imdbRating}</Text>
      <Text style={styles.plot}>{movie.Plot}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f172a' },
  poster: { width: '100%', height: 360, borderRadius: 12, marginBottom: 16 },
  title: { fontSize: 24, fontWeight: '700', color: '#38bdf8' },
  meta: { color: '#94a3b8', marginTop: 4, marginBottom: 12 },
  plot: { color: '#f8fafc', lineHeight: 22 },
  error: { color: '#f87171' },
});
