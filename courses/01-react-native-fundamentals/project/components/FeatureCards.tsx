import { View, Text, StyleSheet } from 'react-native';

const FEATURES = [
  { id: '1', title: 'Expo', subtitle: 'Fast dev' },
  { id: '2', title: 'Flexbox', subtitle: 'Layouts' },
  { id: '3', title: 'Themes', subtitle: 'Dark UI' },
];

export default function FeatureCards() {
  return (
    <View style={styles.row} testID="feature-cards">
      {FEATURES.map((feature) => (
        <View key={feature.id} style={styles.card} testID={`feature-card-${feature.id}`}>
          <Text style={styles.cardTitle}>{feature.title}</Text>
          <Text style={styles.cardSubtitle}>{feature.subtitle}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    width: '100%',
    flexWrap: 'wrap',
  },
  card: {
    flex: 1,
    minWidth: 96,
    maxWidth: 120,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#f8fafc',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
  },
});
