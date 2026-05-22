import { useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store/index';
import { increment, decrement } from '../features/counter/counterSlice';
import { addTodo, toggleTodo, removeTodo } from '../features/todos/todoSlice';

export default function ReduxDemo() {
  const dispatch = useDispatch<AppDispatch>();
  const count = useSelector((state: RootState) => state.counter.value);
  const todos = useSelector((state: RootState) => state.todos.items);

  return (
    <View style={styles.wrap}>
      <Text style={styles.section}>Counter</Text>
      <View style={styles.row}>
        <Pressable style={styles.btn} onPress={() => dispatch(decrement())} testID="counter-decrement">
          <Text style={styles.btnText}>−</Text>
        </Pressable>
        <Text style={styles.count} testID="counter-value">{count}</Text>
        <Pressable style={styles.btn} onPress={() => dispatch(increment())} testID="counter-increment">
          <Text style={styles.btnText}>+</Text>
        </Pressable>
      </View>

      <Text style={styles.section}>Todos</Text>
      <TodoInput onAdd={(text) => dispatch(addTodo(text))} />
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        testID="todo-list"
        renderItem={({ item }) => (
          <View style={styles.todoRow}>
            <Pressable onPress={() => dispatch(toggleTodo(item.id))} testID={`toggle-todo-${item.id}`}>
              <Text style={[styles.todoText, item.done && styles.todoDone]}>
                {item.done ? '✓ ' : ''}{item.text}
              </Text>
            </Pressable>
            <Pressable onPress={() => dispatch(removeTodo(item.id))} testID={`remove-todo-${item.id}`}>
              <Text style={styles.remove}>×</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

function TodoInput({ onAdd }: { onAdd: (text: string) => void }) {
  const [text, setText] = useState('');
  return (
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="New todo"
        placeholderTextColor="#94a3b8"
        testID="todo-input"
      />
      <Pressable
        style={styles.btn}
        onPress={() => {
          const t = text.trim();
          if (!t) return;
          onAdd(t);
          setText('');
        }}
        testID="add-todo-button"
      >
        <Text style={styles.btnText}>Add</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 20 },
  section: { fontSize: 18, fontWeight: '600', color: '#f8fafc', marginBottom: 10 },
  row: { flexDirection: 'row', gap: 8, alignItems: 'center', marginBottom: 12 },
  btn: { backgroundColor: '#38bdf8', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10 },
  btnText: { color: '#0f172a', fontWeight: '600' },
  count: { color: '#f8fafc', fontSize: 24, fontWeight: '700', minWidth: 48, textAlign: 'center' },
  input: {
    flex: 1,
    backgroundColor: '#1e293b',
    color: '#f8fafc',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  todoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  todoText: { color: '#f8fafc' },
  todoDone: { textDecorationLine: 'line-through', color: '#94a3b8' },
  remove: { color: '#f87171', fontSize: 20 },
});
