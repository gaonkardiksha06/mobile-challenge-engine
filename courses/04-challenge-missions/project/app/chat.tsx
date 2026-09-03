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

type Message = {
  id: string;
  body: string;
  author: string;
};

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const unsubscribe = firestore
      .collection('chat')
      .orderBy()
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => {
            const data = doc.data();

            return {
              id: doc.id,
              body: data.body,
              author: data.author,
            };
          })
        );
      });

    return unsubscribe;
  }, []);

  const send = async () => {
    const body = input.trim();

    if (!body) {
      return;
    }

    await firestore.collection('chat').add({
      body,
      author: firebaseAuth.currentUser?.displayName ?? 'Guest',
      createdAt: Date.now(),
    });

    setInput('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Realtime Chat</Text>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        testID="chat-messages"
        contentContainerStyle={styles.messageList}
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

        <Pressable
          style={styles.btn}
          onPress={send}
          testID="send-chat"
        >
          <Text style={styles.btnText}>Send</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#38bdf8',
    marginBottom: 12,
  },

  messageList: {
    paddingBottom: 8,
  },

  bubble: {
    backgroundColor: '#1e293b',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },

  author: {
    color: '#38bdf8',
    fontSize: 12,
    marginBottom: 4,
  },

  body: {
    color: '#f8fafc',
  },

  row: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },

  input: {
    flex: 1,
    backgroundColor: '#1e293b',
    color: '#f8fafc',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  btn: {
    backgroundColor: '#38bdf8',
    borderRadius: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },

  btnText: {
    color: '#0f172a',
    fontWeight: '600',
  },
});