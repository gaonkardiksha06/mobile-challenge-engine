import { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchPosts, type ApiPost } from '../../lib/api';
import { useAuthStorage } from '../../hooks/useAuthStorage';

export default function FeedScreen() {
  const { user } = useAuthStorage();
  const [posts, setPosts] = useState<ApiPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts()
      .then(setPosts)
      .catch(() => setError('Failed to load feed'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.centered} testID="feed-loading">
        <ActivityIndicator size="large" color="#38bdf8" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered} testID="feed-error">
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container} testID="feed-screen">
      <Text style={styles.greeting}>
        Welcome{user ? `, ${user.username}` : ''}!
      </Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => String(item.id)}
        testID="feed-list"
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card} testID={`feed-post-${item.id}`}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.body} numberOfLines={3}>
              {item.body}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f172a' },
  greeting: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f8fafc',
    padding: 16,
    paddingBottom: 0,
  },
  list: { padding: 16 },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  title: { fontSize: 16, fontWeight: '700', color: '#38bdf8', marginBottom: 8 },
  body: { fontSize: 14, color: '#94a3b8', lineHeight: 20 },
  error: { color: '#f87171', fontSize: 16 },
});
