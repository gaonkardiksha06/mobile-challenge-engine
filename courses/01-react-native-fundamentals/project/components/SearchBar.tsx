import { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';

type SearchBarProps = {
  onSearch: (query: string) => void;
  placeholder?: string;
};

export default function SearchBar({ onSearch, placeholder = 'Search...' }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleChange = (text: string) => {
    setQuery(text);
    onSearch(text);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <View style={styles.container} testID="search-bar">
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={handleChange}
        placeholder={placeholder}
        placeholderTextColor="#64748b"
        testID="search-input"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {query.length > 0 && (
        <Pressable onPress={handleClear} testID="search-clear" style={styles.clearButton}>
          <Text style={styles.clearText}>✕</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    color: '#f8fafc',
    fontSize: 15,
    paddingVertical: 12,
  },
  clearButton: {
    paddingLeft: 8,
    paddingVertical: 4,
  },
  clearText: {
    color: '#94a3b8',
    fontSize: 14,
  },
});