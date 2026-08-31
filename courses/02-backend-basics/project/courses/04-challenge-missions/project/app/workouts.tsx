import { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Pressable, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Workout = { id: string; name: string; reps: number; date: string };

const WORKOUTS_KEY = '@workouts';

export default function WorkoutsScreen() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [name, setName] = useState('');
  const [reps, setReps] = useState('');

  useEffect(() => {
    AsyncStorage.getItem(WORKOUTS_KEY).then((raw) => {
      if (raw) setWorkouts(JSON.parse(raw));
    });
  }, []);

  const save = async (next: Workout[]) => {
    setWorkouts(next);
    await AsyncStorage.setItem(WORKOUTS_KEY, JSON.stringify(next));
  };

  const logWorkout = () => {
    const workoutName = name.trim();
    const repCount = parseInt(reps, 10);
    if (!workoutName || Number.isNaN(repCount)) return;
    save([
      { id: `${Date.now()}`, name: workoutName, reps: repCount, date: new Date().toLocaleDateString() },
      ...workouts,
    ]);
    setName('');
    setReps('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fitness Tracker</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Exercise name"
        placeholderTextColor="#94a3b8"
        testID="workout-name-input"
      />
      <TextInput
        style={styles.input}
        value={reps}
        onChangeText={setReps}
        placeholder="Reps"
        keyboardType="numeric"
        placeholderTextColor="#94a3b8"
        testID="workout-reps-input"
      />
      <Pressable style={styles.btn} onPress={logWorkout} testID="log-workout">
        <Text style={styles.btnText}>Log workout</Text>
      </Pressable>
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        testID="workouts-list"
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.workoutName}>{item.name}</Text>
            <Text style={styles.workoutMeta}>{item.reps} reps · {item.date}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 16 },
  title: { fontSize: 22, fontWeight: '700', color: '#38bdf8', marginBottom: 12 },
  input: {
    backgroundColor: '#1e293b',
    color: '#f8fafc',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  btn: { backgroundColor: '#38bdf8', borderRadius: 12, padding: 14, alignItems: 'center', marginBottom: 16 },
  btnText: { color: '#0f172a', fontWeight: '600' },
  row: { backgroundColor: '#1e293b', padding: 14, borderRadius: 12, marginBottom: 10 },
  workoutName: { color: '#f8fafc', fontWeight: '600' },
  workoutMeta: { color: '#94a3b8', marginTop: 4 },
});
