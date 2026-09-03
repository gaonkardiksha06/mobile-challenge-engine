import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';

type PokemonStat = {
  base_stat: number;
  stat: {
    name: string;
  };
};

type PokemonDetail = {
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
  stats: PokemonStat[];
  moves: {
    move: {
      name: string;
    };
  }[];
};

export default function PokemonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError(true);
      return;
    }

    const loadPokemon = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch Pokemon');
        }

        const data: PokemonDetail = await response.json();
        setPokemon(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading Pokemon...</Text>
      </View>
    );
  }

  if (error || !pokemon) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Pokemon not found</Text>
      </View>
    );
  }

  const types = pokemon.types.map((item) => item.type.name);

  const stats = pokemon.stats.map((item) => ({
    name: item.stat.name,
    value: item.base_stat,
  }));

  const moves = pokemon.moves
    .slice(0, 20)
    .map((item) => item.move.name);

  return (
    <View style={styles.container}>
      <FlatList
        data={moves}
        keyExtractor={(item) => item}
        testID="moves-list"
        ListHeaderComponent={
          <>
            <Image
              source={{ uri: pokemon.sprites.front_default }}
              style={styles.sprite}
              testID="pokemon-image"
            />

            <Text style={styles.name} testID="pokemon-name">
              {pokemon.name}
            </Text>

            <Text style={styles.label}>Types</Text>

            <FlatList
              data={types}
              horizontal
              keyExtractor={(item) => item}
              testID="types-list"
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.chip}>
                  <Text style={styles.chipText}>{item}</Text>
                </View>
              )}
            />

            <Text style={styles.label}>Stats</Text>

            <View testID="stats-list">
              {stats.map((stat) => (
                <View style={styles.statRow} key={stat.name}>
                  <Text style={styles.statName}>
                    {stat.name.replace('-', ' ')}
                  </Text>

                  <Text style={styles.statValue}>{stat.value}</Text>
                </View>
              ))}

              <Text style={styles.label}>Moves</Text>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <Text style={styles.move}>{item}</Text>
        )}
        contentContainerStyle={styles.content}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },

  content: {
    padding: 16,
    paddingBottom: 32,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f172a',
  },

  loadingText: {
    color: '#f8fafc',
    marginTop: 10,
  },

  sprite: {
    width: 180,
    height: 180,
    alignSelf: 'center',
  },

  name: {
    fontSize: 28,
    fontWeight: '700',
    color: '#38bdf8',
    textAlign: 'center',
    marginVertical: 12,
    textTransform: 'capitalize',
  },

  label: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 10,
    textTransform: 'capitalize',
  },

  chip: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 16,
    marginRight: 8,
  },

  chipText: {
    color: '#38bdf8',
    textTransform: 'capitalize',
  },

  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1e293b',
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 6,
    borderRadius: 8,
  },

  statName: {
    color: '#cbd5e1',
    textTransform: 'capitalize',
  },

  statValue: {
    color: '#38bdf8',
    fontWeight: '700',
  },

  move: {
    color: '#94a3b8',
    paddingVertical: 4,
    textTransform: 'capitalize',
  },

  error: {
    color: '#f87171',
    fontSize: 16,
  },
});