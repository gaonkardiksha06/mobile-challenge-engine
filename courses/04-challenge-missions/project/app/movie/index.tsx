import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { router } from 'expo-router';

type Movie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
};

const demoMovies: Movie[] = [
  {
    imdbID: 'tt0111161',
    Title: 'The Shawshank Redemption',
    Year: '1994',
    Poster: 'https://placehold.co/200x300/0f172a/38bdf8?text=Shawshank',
  },
  {
    imdbID: 'tt0068646',
    Title: 'The Godfather',
    Year: '1972',
    Poster: 'https://placehold.co/200x300/0f172a/38bdf8?text=Godfather',
  },
  {
    imdbID: 'tt0133093',
    Title: 'The Matrix',
    Year: '1999',
    Poster: 'https://placehold.co/200x300/0f172a/38bdf8?text=Matrix',
  },
];

export default function MovieSearchScreen() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>(demoMovies);
  const [loading, setLoading] = useState(false);

  const searchMovies = async () => {
    const search = query.trim();

    if (!search) {
      setMovies(demoMovies);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=trilogy&s=${encodeURIComponent(search)}`
      );

      const data = await response.json();

      if (data.Response === 'True' && Array.isArray(data.Search)) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch {
      setMovies(
        demoMovies.filter((movie) =>
          movie.Title.toLowerCase().includes(search.toLowerCase())
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const renderMovie = ({ item }: { item: Movie }) => (
    <Pressable
      style={styles.card}
      testID={`movie-card-${item.imdbID}`}
      onPress={() => router.push(`/movie/${item.imdbID}`)}
    >
      <Image
        source={{ uri: item.Poster }}
        style={styles.poster}
        resizeMode="cover"
      />

      <View style={styles.info}>
        <Text style={styles.movieTitle}>{item.Title}</Text>
        <Text style={styles.year}>{item.Year}</Text>

        <Text style={styles.details}>View Details →</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Movie App</Text>

      <TextInput
        testID="movie-search-input"
        value={query}
        onChangeText={setQuery}
        placeholder="Search movies..."
        placeholderTextColor="#64748b"
        style={styles.input}
        onSubmitEditing={searchMovies}
        returnKeyType="search"
      />

      <Pressable
        testID="movie-search-button"
        style={styles.searchButton}
        onPress={searchMovies}
      >
        <Text style={styles.searchText}>Search</Text>
      </Pressable>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator
            testID="movie-loading"
            color="#38bdf8"
            size="large"
          />
        </View>
      ) : (
        <FlatList
          testID="movie-list"
          data={movies}
          keyExtractor={(item) => item.imdbID}
          renderItem={renderMovie}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text testID="no-movies" style={styles.empty}>
              No movies found
            </Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#38bdf8',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#1e293b',
    color: '#f8fafc',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
  },
  searchButton: {
    backgroundColor: '#38bdf8',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  searchText: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '700',
  },
  list: {
    gap: 12,
    paddingBottom: 24,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    overflow: 'hidden',
  },
  poster: {
    width: 90,
    height: 130,
  },
  info: {
    flex: 1,
    padding: 14,
  },
  movieTitle: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '700',
  },
  year: {
    color: '#94a3b8',
    marginTop: 6,
  },
  details: {
    color: '#38bdf8',
    marginTop: 18,
    fontWeight: '600',
  },
  empty: {
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 30,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});