import { StyleSheet, Text, View } from 'react-native';

export default function DeliveryMap() {
  return (
    <View style={styles.map} testID="delivery-map">
      <Text style={styles.text}>Delivery Map</Text>
      <Text style={styles.location}>Restaurant • New Delhi</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#38bdf8',
    fontSize: 18,
    fontWeight: '700',
  },
  location: {
    color: '#cbd5e1',
    marginTop: 8,
  },
});
