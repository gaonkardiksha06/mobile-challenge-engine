import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';
import { firestore, firebaseAuth } from '../lib/firebase';

type Message = { id: string; body: string; author: string };

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const unsub = firestore.collection('chat').orderBy('createdAt').onSnapshot((snap) => {
      setMessages(
        snap.docs.map((d) => {
          const data = d.data() as FeedPostLike;
          return { id: d.id, body: data.body, author: data.author };
        })
      );
    });
    return unsub;
  }, []);

  const send = async () => {
    const body = input.trim();
    if (!body) return;
    await firestore.collection('chat').add({
      body,
      author: firebaseAuth.currentUser?.displayName ?? 'Guest',
      likes: 0,
    } as { body: string; author: string; likes: number });
    setInput('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Realtime Chat</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        testID="chat-messages"
        renderItem={({ item }) => (
          <View style={styles.bubble}>
            <Text style={styles.author}>{item.author}</Text>
            <Text style={styles.body}>{item.body}</Text>
          </View>
        )}
      />
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Message"
          placeholderTextColor="#94a3b8"
          testID="chat-input"
        />
        <Pressable style={styles.btn} onPress={send} testID="send-chat">
          <Text style={styles.btnText}>Send</Text>
        </Pressable>
      </View>
    </View>
  );
}

type FeedPostLike = { body: string; author: string; likes: number };

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 16 },
  title: { fontSize: 20, fontWeight: '700', color: '#38bdf8', marginBottom: 12 },
  bubble: { backgroundColor: '#1e293b', padding: 12, borderRadius: 12, marginBottom: 8 },
  author: { color: '#38bdf8', fontSize: 12, marginBottom: 4 },
  body: { color: '#f8fafc' },
  row: { flexDirection: 'row', gap: 8, marginTop: 8 },
  input: {
    flex: 1,
    backgroundColor: '#1e293b',
    color: '#f8fafc',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  btn: { backgroundColor: '#38bdf8', borderRadius: 10, paddingHorizontal: 16, justifyContent: 'center' },
  btnText: { color: '#0f172a', fontWeight: '600' },
});
