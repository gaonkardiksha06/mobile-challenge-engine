import { ScrollView, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import ProfileCard from '../../components/ProfileCard';
import FeatureCards from '../../components/FeatureCards';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      testID="home-screen"
    >
      <Text style={styles.title}>Home</Text>
      <ProfileCard />
      <FeatureCards />
      <Pressable
        style={styles.button}
        testID="view-profile-button"
        onPress={() => router.push('/details/sakshi_dev')}
      >
        <Text style={styles.buttonText}>View profile details</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  container: {
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#f8fafc',
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  button: {
    marginTop: 8,
    backgroundColor: '#38bdf8',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonText: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '600',
  },
});
