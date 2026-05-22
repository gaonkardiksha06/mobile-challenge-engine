import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { firestore, firebaseAuth, type ChatMessage } from '../lib/firebase';

export default function ChatScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const unsubscribe = firestore.collection('messages').orderBy('createdAt').onSnapshot((snap) => {
      setMessages(snap.docs.map((d) => d.data()));
    });
    return unsubscribe;
  }, []);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;
    await firestore.collection('messages').add({
      text,
      userId: firebaseAuth.currentUser?.uid ?? 'anonymous',
      createdAt: Date.now(),
    });
    setInput('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Firebase Chat</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        testID="chat-list"
        renderItem={({ item }) => (
          <View style={styles.bubble}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No messages yet</Text>}
      />
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message"
          placeholderTextColor="#94a3b8"
          testID="chat-input"
        />
        <Pressable style={styles.sendBtn} onPress={sendMessage} testID="send-button">
          <Text style={styles.sendText}>Send</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 16 },
  title: { fontSize: 20, fontWeight: '700', color: '#38bdf8', marginBottom: 12 },
  bubble: {
    backgroundColor: '#1e293b',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  messageText: { color: '#f8fafc' },
  empty: { color: '#94a3b8', textAlign: 'center', marginTop: 24 },
  inputRow: { flexDirection: 'row', gap: 8, marginTop: 8 },
  input: {
    flex: 1,
    backgroundColor: '#1e293b',
    color: '#f8fafc',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  sendBtn: {
    backgroundColor: '#38bdf8',
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  sendText: { color: '#0f172a', fontWeight: '600' },
});
