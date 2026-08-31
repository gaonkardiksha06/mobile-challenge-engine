import { ScrollView, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import ProfileCard from '../../components/ProfileCard';
import FeatureCards from '../../components/FeatureCards';
import ImageGallery from '../../components/ImageGallery';
import PostFeed from '../../components/PostFeed';
import MultiStepForm from '../../components/MultiStepForm';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      testID="home-screen"
    >
      <Text style={styles.title}>Home</Text>
      <ImageGallery />
      <Text style={styles.sectionTitle}>Posts</Text>
      <PostFeed />
      <MultiStepForm />
      <ProfileCard />
      <FeatureCards />
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
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
    backgroundColor: '#0A0A0B',
  },
  container: {
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FAFAFA',
    marginBottom: 20,
    alignSelf: 'flex-start',
    letterSpacing: -0.3,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FAFAFA',
    marginTop: 24,
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  button: {
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#3A3A3C',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 100,
  },
  buttonPressed: {
    backgroundColor: '#141416',
  },
  buttonText: {
    color: '#FAFAFA',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
});