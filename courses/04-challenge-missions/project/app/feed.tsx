import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { firestore } from '../lib/firebase';

type Post = { id: string; author: string; body: string; likes: number };

export default function FeedScreen() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const unsub = firestore.collection('posts').orderBy('createdAt').onSnapshot((snap) => {
      setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Social Feed</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        testID="feed-list"
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.author}>{item.author}</Text>
            <Text style={styles.body}>{item.body}</Text>
            <Text style={styles.likes}>{item.likes} likes</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 16 },
  title: { fontSize: 22, fontWeight: '700', color: '#38bdf8', marginBottom: 12 },
  card: { backgroundColor: '#1e293b', padding: 14, borderRadius: 12, marginBottom: 10 },
  author: { color: '#38bdf8', fontWeight: '600' },
  body: { color: '#f8fafc', marginTop: 6 },
  likes: { color: '#94a3b8', marginTop: 8, fontSize: 12 },
});
