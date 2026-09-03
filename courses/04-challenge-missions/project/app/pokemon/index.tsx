import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';

type Pokemon = {
  name: string;
  url: string;
};

type PokemonResponse = {
  results: Pokemon[];
};

export default function PokemonListScreen() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        const response = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=20'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch Pokemon');
        }

        const data: PokemonResponse = await response.json();
        setPokemon(data.results);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading Pokemon...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Unable to load Pokemon</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Pokemon Explorer</Text>

      <FlatList
        data={pokemon}
        keyExtractor={(item) => item.name}
        testID="pokemon-list"
        contentContainerStyle={styles.list}
        renderItem={({ item, index }) => (
          <Pressable
            style={styles.card}
            testID={`pokemon-${item.name}`}
            onPress={() => router.push(`/pokemon/${index + 1}`)}
          >
            <Text style={styles.number}>#{index + 1}</Text>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.details}>View details →</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },

  list: {
    padding: 16,
    paddingBottom: 32,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f172a',
  },

  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#38bdf8',
    padding: 16,
  },

  card: {
    backgroundColor: '#1e293b',
    padding: 16,
    marginBottom: 10,
    borderRadius: 12,
  },

  number: {
    color: '#64748b',
    fontSize: 13,
  },

  name: {
    color: '#f8fafc',
    fontSize: 20,
    fontWeight: '600',
    textTransform: 'capitalize',
    marginTop: 4,
  },

  details: {
    color: '#38bdf8',
    marginTop: 6,
  },

  loadingText: {
    color: '#f8fafc',
    marginTop: 10,
  },

  error: {
    color: '#f87171',
    fontSize: 16,
  },
});