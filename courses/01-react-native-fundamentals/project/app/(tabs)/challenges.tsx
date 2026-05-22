import { ScrollView, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const CHALLENGES = [
  {
    "id": "01-expo-setup-basics",
    "name": "Expo Setup & Basics"
  },
  {
    "id": "02-navigation-system",
    "name": "Navigation System"
  },
  {
    "id": "03-lists-data-rendering",
    "name": "Lists & Data Rendering"
  },
  {
    "id": "04-forms-validation",
    "name": "Forms & Validation"
  },
  {
    "id": "05-api-integration",
    "name": "API Integration"
  },
  {
    "id": "06-async-storage",
    "name": "AsyncStorage"
  },
  {
    "id": "07-mini-social-feed",
    "name": "Mini Social Feed (Capstone)"
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
