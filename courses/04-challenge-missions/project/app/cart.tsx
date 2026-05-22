import { View, Text, StyleSheet, Pressable } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store/index';
import { clearCart } from '../store/cartSlice';

export default function CartScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Food Delivery Cart</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 28.6139,
          longitude: 77.209,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        testID="delivery-map"
      >
        <Marker coordinate={{ latitude: 28.6139, longitude: 77.209 }} title="Restaurant" />
      </MapView>
      {items.map((item) => (
        <Text key={item.id} style={styles.item}>
          {item.name} x{item.quantity} — ${item.price.toFixed(2)}
        </Text>
      ))}
      <Text style={styles.total} testID="cart-total">Total: ${total.toFixed(2)}</Text>
      <Pressable style={styles.btn} onPress={() => dispatch(clearCart())} testID="place-order">
        <Text style={styles.btnText}>Place order</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 16 },
  title: { fontSize: 20, fontWeight: '700', color: '#38bdf8', marginBottom: 8 },
  map: { height: 200, borderRadius: 12, marginBottom: 12 },
  item: { color: '#f8fafc', marginBottom: 6 },
  total: { color: '#38bdf8', fontSize: 18, marginVertical: 12 },
  btn: { backgroundColor: '#38bdf8', padding: 14, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#0f172a', fontWeight: '600' },
});
