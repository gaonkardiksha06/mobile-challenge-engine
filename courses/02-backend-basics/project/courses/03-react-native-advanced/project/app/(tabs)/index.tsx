import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
// nativewind — utility-first styling for React Native
import '../../global.css';
import ReduxDemo from '../../components/ReduxDemo';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView
      className="flex-1 bg-slate-900 px-6"
      contentContainerClassName="items-center py-8"
      testID="home-screen"
    >
      <Text className="text-2xl font-bold text-sky-400 mb-2">
        Advanced React Native
      </Text>
      <Text className="text-base text-slate-300 text-center mb-6">
        Open Challenges tab to pick a challenge README.
      </Text>
      <Pressable
        className="bg-sky-400 px-5 py-3 rounded-xl"
        onPress={() => router.push('/checkout')}
        testID="checkout-link"
      >
        <Text className="text-slate-900 font-semibold">Go to Checkout</Text>
      </Pressable>
      <View className="w-full max-w-md">
        <ReduxDemo />
      </View>
    </ScrollView>
  );
}
