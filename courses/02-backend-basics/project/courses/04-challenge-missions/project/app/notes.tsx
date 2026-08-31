import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Note = { id: string; text: string };

const NOTES_KEY = '@notes';

export default function NotesScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    AsyncStorage.getItem(NOTES_KEY).then((raw) => {
      if (raw) setNotes(JSON.parse(raw));
    });
  }, []);

  const save = async (next: Note[]) => {
    setNotes(next);
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(next));
  };

  const addNote = () => {
    const text = input.trim();
    if (!text) return;
    save([{ id: `${Date.now()}`, text }, ...notes]);
    setInput('');
  };

  const deleteNote = (id: string) => {
    save(notes.filter((n) => n.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notes</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Write a note..."
          placeholderTextColor="#94a3b8"
          testID="note-input"
        />
        <Pressable style={styles.btn} onPress={addNote} testID="save-note-button">
          <Text style={styles.btnText}>Save</Text>
        </Pressable>
      </View>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        testID="notes-list"
        renderItem={({ item }) => (
          <View style={styles.noteRow}>
            <Text style={styles.noteText}>{item.text}</Text>
            <Pressable onPress={() => deleteNote(item.id)} testID={`delete-note-${item.id}`}>
              <Text style={styles.delete}>Delete</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 16 },
  title: { fontSize: 22, fontWeight: '700', color: '#38bdf8', marginBottom: 12 },
  row: { flexDirection: 'row', gap: 8, marginBottom: 12 },
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
  noteRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  noteText: { color: '#f8fafc', flex: 1 },
  delete: { color: '#f87171' },
});
