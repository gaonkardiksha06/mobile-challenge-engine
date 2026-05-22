import { ScrollView, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const CHALLENGES = [
  {
    "id": "01-redux-toolkit",
    "name": "Redux Toolkit"
  },
  {
    "id": "02-nativewind",
    "name": "NativeWind"
  },
  {
    "id": "03-firebase",
    "name": "Firebase"
  },
  {
    "id": "04-notifications-maps",
    "name": "Notifications & Maps"
  },
  {
    "id": "05-payments-optimization",
    "name": "Payments & Optimization"
  },
  {
    "id": "06-full-ecommerce-app",
    "name": "Full E-Commerce App (Capstone)"
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
