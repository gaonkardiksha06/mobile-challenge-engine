import { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Habit = { id: string; name: string; done: boolean };

const HABITS_KEY = '@habits';
const CALC_KEYS = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'];

export default function MissionsHomeScreen() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [habitInput, setHabitInput] = useState('');
  const [display, setDisplay] = useState('0');
  const [memes, setMemes] = useState<{ id: string; url: string; title: string }[]>([]);
  const [memesLoading, setMemesLoading] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(HABITS_KEY).then((raw) => {
      if (raw) setHabits(JSON.parse(raw));
    });
  }, []);

  const persistHabits = useCallback(async (next: Habit[]) => {
    setHabits(next);
    await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(next));
  }, []);

  const addHabit = () => {
    const name = habitInput.trim();
    if (!name) return;
    persistHabits([...habits, { id: `${Date.now()}`, name, done: false }]);
    setHabitInput('');
  };

  const toggleHabit = (id: string) => {
    persistHabits(habits.map((h) => (h.id === id ? { ...h, done: !h.done } : h)));
  };

  const onCalcPress = (key: string) => {
    if (key === '=') {
      try {
        const result = Function(`"use strict"; return (${display})`)();
        setDisplay(String(result));
      } catch {
        setDisplay('Error');
      }
      return;
    }
    setDisplay((prev) => (prev === '0' && key !== '.' ? key : prev + key));
  };

  useEffect(() => {
    setMemesLoading(true);
    fetch('https://meme-api.com/gimme/3')
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [data];
        setMemes(
          list.map((m: { postLink?: string; url: string; title: string }, i: number) => ({
            id: `${i}`,
            url: m.url,
            title: m.title,
          }))
        );
      })
      .catch(() => {
        setMemes([
          { id: '0', url: 'https://placehold.co/300x200/0f172a/38bdf8?text=Meme', title: 'Demo meme' },
        ]);
      })
      .finally(() => setMemesLoading(false));
  }, []);

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Challenge Missions Hub</Text>

      <Text style={styles.section}>Habit Tracker</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          value={habitInput}
          onChangeText={setHabitInput}
          placeholder="New habit"
          placeholderTextColor="#94a3b8"
          testID="habit-input"
        />
        <Pressable style={styles.btn} onPress={addHabit} testID="add-habit-button">
          <Text style={styles.btnText}>Add</Text>
        </Pressable>
      </View>
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        testID="habit-list"
        renderItem={({ item }) => (
          <Pressable style={styles.habitRow} onPress={() => toggleHabit(item.id)}>
            <Text style={[styles.habitText, item.done && styles.habitDone]}>
              {item.done ? '✓ ' : ''}{item.name}
            </Text>
          </Pressable>
        )}
      />

      <Text style={styles.section}>Calculator</Text>
      <Text style={styles.calcDisplay} testID="calc-display">{display}</Text>
      <View style={styles.calcGrid}>
        {CALC_KEYS.map((key) => (
          <Pressable
            key={key}
            style={styles.calcKey}
            onPress={() => onCalcPress(key)}
            testID={`calc-key-${key}`}
          >
            <Text style={styles.calcKeyText}>{key}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.section}>Meme Viewer</Text>
      {memesLoading ? (
        <ActivityIndicator color="#38bdf8" />
      ) : (
        memes.map((m) => (
          <View key={m.id} style={styles.memeCard}>
            <Image source={{ uri: m.url }} style={styles.memeImage} />
            <Text style={styles.memeTitle}>{m.title}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: '#0f172a' },
  container: { padding: 16, paddingBottom: 40 },
  heading: { fontSize: 22, fontWeight: '700', color: '#38bdf8', marginBottom: 16 },
  section: { fontSize: 18, fontWeight: '600', color: '#f8fafc', marginTop: 20, marginBottom: 10 },
  row: { flexDirection: 'row', gap: 8 },
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
  habitRow: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#1e293b' },
  habitText: { color: '#f8fafc' },
  habitDone: { textDecorationLine: 'line-through', color: '#94a3b8' },
  calcDisplay: {
    backgroundColor: '#1e293b',
    color: '#f8fafc',
    fontSize: 28,
    textAlign: 'right',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  calcGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  calcKey: {
    width: '22%',
    backgroundColor: '#1e293b',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  calcKeyText: { color: '#38bdf8', fontSize: 18, fontWeight: '600' },
  memeCard: { marginBottom: 16 },
  memeImage: { width: '100%', height: 180, borderRadius: 12 },
  memeTitle: { color: '#f8fafc', marginTop: 6 },
});
