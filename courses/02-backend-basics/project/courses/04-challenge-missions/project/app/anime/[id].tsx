import { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

type AnimeEpisode = { id: string; title: string; number: number };

const DEMO_EPISODES: AnimeEpisode[] = [
  { id: '1', title: 'The Beginning', number: 1 },
  { id: '2', title: 'Rising Action', number: 2 },
  { id: '3', title: 'Climax', number: 3 },
  { id: '4', title: 'Resolution', number: 4 },
];

export default function AnimeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const [title, setTitle] = useState('Loading...');

  useEffect(() => {
    setTitle(id ? `Anime #${id}` : 'Unknown Anime');
  }, [id]);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()} testID="back-button">
        <Text style={styles.back}>← Back</Text>
      </Pressable>
      <Image
        source={{ uri: 'https://placehold.co/400x220/0f172a/38bdf8?text=Anime' }}
        style={styles.banner}
        testID="anime-banner"
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>Episodes</Text>
      <FlatList
        data={DEMO_EPISODES}
        keyExtractor={(item) => item.id}
        testID="episodes-list"
        renderItem={({ item }) => (
          <View style={styles.episode}>
            <Text style={styles.episodeNum}>EP {item.number}</Text>
            <Text style={styles.episodeTitle}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 16 },
  back: { color: '#38bdf8', marginBottom: 12 },
  banner: { width: '100%', height: 200, borderRadius: 12, marginBottom: 12 },
  title: { fontSize: 24, fontWeight: '700', color: '#f8fafc' },
  subtitle: { color: '#38bdf8', fontSize: 16, fontWeight: '600', marginTop: 16, marginBottom: 8 },
  episode: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
    gap: 12,
  },
  episodeNum: { color: '#38bdf8', fontWeight: '700', width: 48 },
  episodeTitle: { color: '#f8fafc', flex: 1 },
});
