import { useEffect, useState, useMemo } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import SearchBar from './SearchBar';

type Post = {
  id: string;
  username: string;
  content: string;
  likes: number;
};

const SAMPLE_POSTS: Post[] = [
  { id: '1', username: 'alex_dev', content: 'Just shipped my first Expo app!', likes: 42 },
  { id: '2', username: 'mobile_guru', content: 'FlatList makes scrolling feeds easy.', likes: 128 },
  { id: '3', username: 'sakshi_dev', content: 'Learning React Native fundamentals.', likes: 56 },
  { id: '4', username: 'ui_crafts', content: 'Dark mode + rounded cards look great.', likes: 91 },
  { id: '5', username: 'api_ninja', content: 'fetch + useEffect = happy data loading.', likes: 33 },
];

export default function PostFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setPosts(SAMPLE_POSTS);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (p) => p.username.toLowerCase().includes(q) || p.content.toLowerCase().includes(q)
    );
  }, [posts, searchQuery]);

  if (loading) {
    return (
      <View style={styles.centered} testID="loading-spinner">
        <ActivityIndicator size="large" color="#38bdf8" />
        <Text style={styles.loadingText}>Loading posts...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container} testID="post-feed">
      <SearchBar onSearch={setSearchQuery} />
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id}
        testID="post-list"
        ListEmptyComponent={
          <View style={styles.empty} testID="empty-state">
            <Text style={styles.emptyText}>No Data</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card} testID={`post-${item.id}`}>
            <Text style={styles.username}>@{item.username}</Text>
            <Text style={styles.content}>{item.content}</Text>
            <Text style={styles.likes}>{item.likes} likes</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  loadingText: { marginTop: 12, color: '#94a3b8', fontSize: 16 },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  username: { fontSize: 16, fontWeight: '700', color: '#38bdf8', marginBottom: 6 },
  content: { fontSize: 15, color: '#f8fafc', lineHeight: 22, marginBottom: 8 },
  likes: { fontSize: 13, color: '#94a3b8' },
  empty: { padding: 32, alignItems: 'center' },
  emptyText: { fontSize: 18, color: '#64748b', fontWeight: '600' },
});
