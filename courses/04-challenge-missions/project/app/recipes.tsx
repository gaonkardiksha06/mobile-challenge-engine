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

type Recipe = {
  id: string;
  title: string;
  instructions: string;
};

type MealApiItem = {
  idMeal: string;
  strMeal: string;
};

type MealApiResponse = {
  meals: MealApiItem[] | null;
};

export default function RecipesScreen() {
  const [ingredient, setIngredient] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateRecipes = async () => {
    const query = ingredient.trim();

    if (!query) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(
          query
        )}`
      );

      const data: MealApiResponse = await response.json();
      const meals = data.meals ?? [];

      if (meals.length > 0) {
        setRecipes(
          meals.slice(0, 5).map((meal) => ({
            id: meal.idMeal,
            title: meal.strMeal,
            instructions: `Cook with ${query} — AI-style suggestion for ${meal.strMeal}.`,
          }))
        );
      } else {
        setRecipes([
          {
            id: 'demo-1',
            title: `${query} Stir Fry`,
            instructions: `Sauté ${query} with garlic and soy sauce.`,
          },
        ]);
      }
    } catch {
      setRecipes([
        {
          id: 'demo-1',
          title: `${query} Stir Fry`,
          instructions: `Sauté ${query} with garlic and soy sauce.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (recipeId: string) => {
    setFavorites((currentFavorites) =>
      currentFavorites.includes(recipeId)
        ? currentFavorites.filter((id) => id !== recipeId)
        : [...currentFavorites, recipeId]
    );
  };

  const isFavorite = (recipeId: string) => favorites.includes(recipeId);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text testID="recipe-title" style={styles.title}>
        AI Recipe App
      </Text>

      <TextInput
        testID="ingredient-input"
        style={styles.input}
        value={ingredient}
        onChangeText={setIngredient}
        placeholder="Ingredient (e.g. chicken)"
        placeholderTextColor="#94a3b8"
      />

      <Pressable
        testID="generate-recipes"
        style={styles.btn}
        onPress={generateRecipes}
      >
        <Text style={styles.btnText}>Generate recipes</Text>
      </Pressable>

      {loading && (
        <ActivityIndicator
          testID="recipe-loading"
          color="#38bdf8"
          style={styles.loading}
        />
      )}

      {recipes.map((recipe) => (
        <View
          key={recipe.id}
          testID={`recipe-card-${recipe.id}`}
          style={styles.card}
        >
          <Text style={styles.recipeTitle}>{recipe.title}</Text>

          <Text style={styles.recipeBody}>{recipe.instructions}</Text>

          <Pressable
            testID={`favorite-${recipe.id}`}
            style={[
              styles.favoriteButton,
              isFavorite(recipe.id) && styles.favoriteButtonActive,
            ]}
            onPress={() => toggleFavorite(recipe.id)}
          >
            <Text style={styles.favoriteText}>
              {isFavorite(recipe.id)
                ? '♥ Remove from Favorites'
                : '♡ Save to Favorites'}
            </Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#38bdf8',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#1e293b',
    color: '#f8fafc',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  btn: {
    backgroundColor: '#38bdf8',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  btnText: {
    color: '#0f172a',
    fontWeight: '600',
  },
  loading: {
    marginTop: 16,
  },
  card: {
    backgroundColor: '#1e293b',
    padding: 14,
    borderRadius: 12,
    marginTop: 12,
  },
  recipeTitle: {
    color: '#38bdf8',
    fontSize: 16,
    fontWeight: '600',
  },
  recipeBody: {
    color: '#f8fafc',
    marginTop: 6,
    lineHeight: 20,
  },
  favoriteButton: {
    backgroundColor: '#334155',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  favoriteButtonActive: {
    backgroundColor: '#475569',
  },
  favoriteText: {
    color: '#f8fafc',
    fontWeight: '600',
  },
});