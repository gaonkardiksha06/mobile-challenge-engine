import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../store/index';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="challenge/[id]" options={{ title: 'Challenge' }} />
        <Stack.Screen name="chat" options={{ title: 'Chat' }} />
        <Stack.Screen name="map" options={{ title: 'Map' }} />
        <Stack.Screen name="checkout" options={{ title: 'Checkout' }} />
      </Stack>
    </Provider>
  );
}
