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
    alignItems: 'stretch',
    gap: 10,
    width: '100%',
    flexWrap: 'wrap',
  },
  card: {
    flex: 1,
    minWidth: 96,
    maxWidth: 130,
    backgroundColor: '#141416',
    borderWidth: 1,
    borderColor: '#232326',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FAFAFA',
    marginBottom: 3,
    letterSpacing: -0.1,
  },
  cardSubtitle: {
    fontSize: 11,
    color: '#8A8A8E',
    textAlign: 'center',
  },
});