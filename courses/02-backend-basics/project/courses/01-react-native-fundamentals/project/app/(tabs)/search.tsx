import { ScrollView, Text, StyleSheet } from 'react-native';
import PostFeed from '../../components/PostFeed';
import ImageGallery from '../../components/ImageGallery';
import UserList from '../../components/UserList';
import WeatherSearch from '../../components/WeatherSearch';
import MultiStepForm from '../../components/MultiStepForm';

export default function SearchScreen() {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container} testID="search-screen">
      <Text style={styles.title}>Explore</Text>
      <PostFeed />
      <ImageGallery />
      <Text style={styles.section}>Users API</Text>
      <UserList />
      <Text style={styles.section}>Weather</Text>
      <WeatherSearch />
      <Text style={styles.section}>Multi-step form</Text>
      <MultiStepForm />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: '#0f172a' },
  container: { padding: 16, paddingBottom: 32 },
  title: { fontSize: 22, fontWeight: '700', color: '#f8fafc', marginBottom: 16 },
  section: { fontSize: 18, fontWeight: '700', color: '#38bdf8', marginTop: 24, marginBottom: 8 },
});
