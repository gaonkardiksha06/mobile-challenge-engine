import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    fetch(`https://www.omdbapi.com/?apikey=trilogy&i=${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === 'True') {
          setMovie(data);
        } else {
          setMovie({
            Title: 'Demo Movie',
            Year: '2024',
            Plot: 'A learner builds mobile apps with Expo.',
            Poster:
              'https://placehold.co/200x300/0f172a/38bdf8?text=Movie',
            imdbRating: '8.5',
          });
        }
      })
      .catch(() => {
        setMovie({
          Title: 'Demo Movie',
          Year: '2024',
          Plot: 'A learner builds mobile apps with Expo.',
          Poster:
            'https://placehold.co/200x300/0f172a/38bdf8?text=Movie',
          imdbRating: '8.5',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          testID="movie-loading"
          color="#38bdf8"
          size="large"
        />
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
      <Image
        source={{ uri: movie.Poster }}
        style={styles.poster}
        testID="movie-poster"
      />

      <Text testID="movie-title" style={styles.title}>
        {movie.Title}
      </Text>

      <Text testID="movie-meta" style={styles.meta}>
        {movie.Year} · ★ {movie.imdbRating}
      </Text>

      <Pressable
        testID="favorite-button"
        style={[
          styles.favoriteButton,
          favorite && styles.favoriteButtonActive,
        ]}
        onPress={() => setFavorite((current) => !current)}
      >
        <Text style={styles.favoriteText}>
          {favorite ? '♥ Remove from Favorites' : '♡ Add to Favorites'}
        </Text>
      </Pressable>

      <Text style={styles.sectionTitle}>Plot</Text>

      <Text testID="movie-plot" style={styles.plot}>
        {movie.Plot}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f172a',
  },
  poster: {
    width: '100%',
    height: 360,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#38bdf8',
  },
  meta: {
    color: '#94a3b8',
    marginTop: 4,
    marginBottom: 16,
  },
  favoriteButton: {
    backgroundColor: '#1e293b',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  favoriteButtonActive: {
    backgroundColor: '#334155',
  },
  favoriteText: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '700',
  },
  sectionTitle: {
    color: '#38bdf8',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  plot: {
    color: '#f8fafc',
    lineHeight: 22,
    marginBottom: 30,
  },
  error: {
    color: '#f87171',
  },
});