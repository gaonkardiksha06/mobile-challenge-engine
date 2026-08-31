import { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import SearchBar from './SearchBar';

type Post = {
  id: string;
  username: string;
  avatar: string;
  caption: string;
  likes: number;
};

const MOCK_POSTS: Post[] = [
  { id: '1', username: '@codewithnina', avatar: 'https://i.pravatar.cc/100?u=nina', caption: 'Learning React Native has been fun.', likes: 42 },
  { id: '2', username: '@devraj', avatar: 'https://i.pravatar.cc/100?u=devraj', caption: 'Flexbox finally clicked for me.', likes: 84 },
  { id: '3', username: '@sakshi_dev', avatar: 'https://i.pravatar.cc/100?u=sakshi_dev', caption: 'Shipped a new feature today 🚀', likes: 128 },
  { id: '4', username: '@aisha.codes', avatar: 'https://i.pravatar.cc/100?u=aisha', caption: 'Dark mode everything.', likes: 57 },
];

export default function PostFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setPosts(MOCK_POSTS);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredPosts = posts.filter(
    (post) =>
      post.username.toLowerCase().includes(query.toLowerCase()) ||
      post.caption.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container} testID="post-feed">
      <SearchBar onSearch={setQuery} placeholder="Search posts or usernames" />

      {loading ? (
        <View style={styles.centerState} testID="feed-loading">
          <ActivityIndicator color="#38bdf8" size="large" />
        </View>
      ) : filteredPosts.length === 0 ? (
        <View style={styles.centerState} testID="empty-state">
          <Text style={styles.emptyText}>No Data</Text>
        </View>
      ) : (
        <FlatList
          data={filteredPosts}
          keyExtractor={(item) => item.id}
          testID="post-list"
          renderItem={({ item }) => (
            <View style={styles.post} testID={`post-${item.id}`}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <View style={styles.postBody}>
                <Text style={styles.username}>{item.username}</Text>
                <Text style={styles.caption}>{item.caption}</Text>
                <Text style={styles.likes}>{item.likes} likes</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%' },
  post: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  avatar: { width: 44, height: 44, borderRadius: 22, marginRight: 12 },
  postBody: { flex: 1 },
  username: { color: '#f8fafc', fontWeight: '700', fontSize: 14, marginBottom: 4 },
  caption: { color: '#cbd5e1', fontSize: 14, marginBottom: 6, lineHeight: 19 },
  likes: { color: '#94a3b8', fontSize: 13 },
  centerState: { paddingVertical: 40, alignItems: 'center', justifyContent: 'center' },
  emptyText: { color: '#94a3b8', fontSize: 15 },
});