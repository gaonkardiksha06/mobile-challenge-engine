import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../store/index';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Missions' }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="challenge/[id]" options={{ title: 'Challenge' }} />
        <Stack.Screen name="notes" options={{ title: 'Notes' }} />
        <Stack.Screen name="chat" options={{ title: 'Chat' }} />
        <Stack.Screen name="recipes" options={{ title: 'Recipes' }} />
        <Stack.Screen name="cart" options={{ title: 'Cart' }} />
        <Stack.Screen name="feed" options={{ title: 'Feed' }} />
        <Stack.Screen name="shop" options={{ title: 'Shop' }} />
        <Stack.Screen name="workouts" options={{ title: 'Workouts' }} />
        <Stack.Screen name="pokemon/[id]" options={{ title: 'Pokemon' }} />
        <Stack.Screen name="movie/[id]" options={{ title: 'Movie' }} />
        <Stack.Screen name="anime/[id]" options={{ title: 'Anime' }} />
      </Stack>
    </Provider>
  );
}
