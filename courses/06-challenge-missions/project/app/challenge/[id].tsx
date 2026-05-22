import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function ChallengeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View style={styles.container} testID="challenge-screen">
      <Text style={styles.title}>Challenge: {id}</Text>
      <Text>Read challenges/{id}/README.md and implement in this project.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
});
