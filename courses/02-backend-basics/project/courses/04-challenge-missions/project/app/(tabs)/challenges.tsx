import { ScrollView, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const CHALLENGES = [
  {
    "id": "01-habit-tracker",
    "name": "Habit Tracker"
  },
  {
    "id": "02-pokemon-explorer",
    "name": "Pokemon Explorer"
  },
  {
    "id": "03-notes-app",
    "name": "Notes App"
  },
  {
    "id": "04-calculator",
    "name": "Calculator"
  },
  {
    "id": "05-meme-viewer",
    "name": "Meme Viewer"
  },
  {
    "id": "06-realtime-chat",
    "name": "Realtime Chat"
  },
  {
    "id": "07-expense-tracker",
    "name": "Expense Tracker"
  },
  {
    "id": "08-movie-app",
    "name": "Movie App"
  },
  {
    "id": "09-ai-recipe-app",
    "name": "AI Recipe App"
  },
  {
    "id": "10-food-delivery",
    "name": "Food Delivery"
  },
  {
    "id": "11-social-media-platform",
    "name": "Social Media Platform"
  },
  {
    "id": "12-full-marketplace",
    "name": "Full Marketplace"
  },
  {
    "id": "13-fitness-tracker",
    "name": "Fitness Tracker"
  },
  {
    "id": "14-anime-streaming-ui",
    "name": "Anime Streaming UI"
  }
];

export default function ChallengesScreen() {
  const router = useRouter();
  return (
    <ScrollView style={styles.container} testID="challenge-list">
      {CHALLENGES.map((c) => (
        <Pressable
          key={c.id}
          testID={`challenge-link-${c.id}`}
          style={styles.item}
          onPress={() => router.push(`/challenge/${c.id}`)}
        >
          <Text style={styles.name}>{c.name}</Text>
          <Text style={styles.id}>{c.id}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: { padding: 16, borderBottomWidth: 1, borderColor: '#ddd' },
  name: { fontSize: 16, fontWeight: '600' },
  id: { fontSize: 12, color: '#666', marginTop: 4 },
});
