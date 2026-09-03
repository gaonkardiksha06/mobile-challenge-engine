import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ProfileCard from '../../components/ProfileCard';
import FeatureCards from '../../components/FeatureCards';

export default function HomeScreen() {
  return (
    <View style={styles.container} testID="home-screen">
      <Text style={styles.title}>My Profile</Text>
      <Text style={styles.subtitle}>
        Welcome to my React Native profile
      </Text>

      <ProfileCard />

      <FeatureCards />

      <TouchableOpacity
        testID="view-profile-button"
        style={styles.viewButton}
      >
        <Text style={styles.viewButtonText}>View Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#0f172a',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#f8fafc',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 24,
  },
  viewButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#38bdf8',
  },
  viewButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
});