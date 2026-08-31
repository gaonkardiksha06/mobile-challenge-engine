import { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

type PokemonDetail = {
  name: string;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
  moves: { move: { name: string } }[];
};

export default function PokemonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((r) => r.json())
      .then(setPokemon)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="#38bdf8" size="large" />
      </View>
    );
  }

  if (!pokemon) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Pokemon not found</Text>
      </View>
    );
  }

  const types = pokemon.types.map((t) => t.type.name);
  const moves = pokemon.moves.slice(0, 20).map((m) => m.move.name);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: pokemon.sprites.front_default }}
        style={styles.sprite}
        testID="pokemon-image"
      />
      <Text style={styles.name}>{pokemon.name}</Text>
      <Text style={styles.label}>Types</Text>
      <FlatList
        data={types}
        horizontal
        keyExtractor={(item) => item}
        testID="types-list"
        renderItem={({ item }) => (
          <View style={styles.chip}>
            <Text style={styles.chipText}>{item}</Text>
          </View>
        )}
      />
      <Text style={styles.label}>Moves</Text>
      <FlatList
        data={moves}
        keyExtractor={(item) => item}
        testID="moves-list"
        renderItem={({ item }) => (
          <Text style={styles.move}>{item}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f172a' },
  sprite: { width: 160, height: 160, alignSelf: 'center' },
  name: { fontSize: 28, fontWeight: '700', color: '#38bdf8', textAlign: 'center', marginVertical: 12 },
  label: { color: '#f8fafc', fontSize: 16, fontWeight: '600', marginTop: 12, marginBottom: 8 },
  chip: { backgroundColor: '#1e293b', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, marginRight: 8 },
  chipText: { color: '#38bdf8', textTransform: 'capitalize' },
  move: { color: '#94a3b8', paddingVertical: 4, textTransform: 'capitalize' },
  error: { color: '#f87171' },
});
