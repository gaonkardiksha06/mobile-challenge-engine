import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';

export default function DetailsScreen() {
  const { username } = useLocalSearchParams<{ username: string }>();
  const navigation = useNavigation();
  const displayName = typeof username === 'string' ? username : 'Guest';

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `@${displayName}`,
    });
  }, [navigation, displayName]);

  return (
    <View style={styles.container} testID="details-screen">
      <Text style={styles.label}>Profile details</Text>
      <Text style={styles.username} testID="details-username">
        @{displayName}
      </Text>
      <Text style={styles.bio}>Mobile developer learning React Navigation.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#0f172a',
  },
  label: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 8,
  },
  username: {
    fontSize: 28,
    fontWeight: '700',
    color: '#f8fafc',
    marginBottom: 12,
  },
  bio: {
    fontSize: 16,
    color: '#cbd5e1',
    lineHeight: 24,
  },
});
