import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

type Recipe = { id: string; title: string; instructions: string };

export default function RecipesScreen() {
  const [ingredient, setIngredient] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  const generateRecipes = async () => {
    const query = ingredient.trim();
    if (!query) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      const meals = data.meals ?? [];
      setRecipes(
        meals.slice(0, 5).map((m: { idMeal: string; strMeal: string }) => ({
          id: m.idMeal,
          title: m.strMeal,
          instructions: `Cook with ${query} — AI-style suggestion for ${m.strMeal}.`,
        }))
      );
    } catch {
      setRecipes([
        {
          id: '1',
          title: `${query} Stir Fry`,
          instructions: `Sauté ${query} with garlic and soy sauce.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>AI Recipe App</Text>
      <TextInput
        style={styles.input}
        value={ingredient}
        onChangeText={setIngredient}
        placeholder="Ingredient (e.g. chicken)"
        placeholderTextColor="#94a3b8"
        testID="ingredient-input"
      />
      <Pressable style={styles.btn} onPress={generateRecipes} testID="generate-recipes">
        <Text style={styles.btnText}>Generate recipes</Text>
      </Pressable>
      {loading && <ActivityIndicator color="#38bdf8" style={{ marginTop: 16 }} />}
      {recipes.map((r) => (
        <View key={r.id} style={styles.card}>
          <Text style={styles.recipeTitle}>{r.title}</Text>
          <Text style={styles.recipeBody}>{r.instructions}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  content: { padding: 16 },
  title: { fontSize: 22, fontWeight: '700', color: '#38bdf8', marginBottom: 12 },
  input: {
    backgroundColor: '#1e293b',
    color: '#f8fafc',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  btn: { backgroundColor: '#38bdf8', borderRadius: 12, padding: 14, alignItems: 'center' },
  btnText: { color: '#0f172a', fontWeight: '600' },
  card: { backgroundColor: '#1e293b', padding: 14, borderRadius: 12, marginTop: 12 },
  recipeTitle: { color: '#38bdf8', fontSize: 16, fontWeight: '600' },
  recipeBody: { color: '#f8fafc', marginTop: 6, lineHeight: 20 },
});
