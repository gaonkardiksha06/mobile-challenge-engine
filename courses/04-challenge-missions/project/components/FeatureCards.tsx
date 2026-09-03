import { StyleSheet, Text, View } from 'react-native';

export default function FeatureCards() {
  const features = [
    { id: 1, title: 'Build', description: 'Create amazing apps' },
    { id: 2, title: 'Learn', description: 'Improve your skills' },
    { id: 3, title: 'Share', description: 'Show your work' },
  ];

  return (
    <View style={styles.container} testID="feature-cards">
      {features.map((feature) => (
        <View
          key={feature.id}
          style={styles.card}
          testID={`feature-card-${feature.id}`}
        >
          <Text style={styles.title}>{feature.title}</Text>
          <Text style={styles.description}>{feature.description}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 420,
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  card: {
    flex: 1,
    minHeight: 110,
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#1e293b',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#38bdf8',
    marginBottom: 6,
  },
  description: {
    fontSize: 12,
    color: '#cbd5e1',
  },
});