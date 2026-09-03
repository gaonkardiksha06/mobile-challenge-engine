
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store/index';
import { clearCart } from '../store/cartSlice';
import DeliveryMap from '../components/DeliveryMap';
import type { MapViewProps } from 'react-native-maps';

export default function CartScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Keeps react-native-maps directly referenced in this challenge file.
  const mapProps: Partial<MapViewProps> = {
  testID: 'delivery-map',
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Food Delivery Cart</Text>

      <DeliveryMap {...mapProps} />

      {items.map((item) => (
        <Text key={item.id} style={styles.item}>
          {item.name} x{item.quantity} — ${item.price.toFixed(2)}
        </Text>
      ))}

      <Text style={styles.total} testID="cart-total">
        Total: ${total.toFixed(2)}
      </Text>

      <Pressable
        style={styles.btn}
        onPress={() => dispatch(clearCart())}
        testID="place-order"
      >
        <Text style={styles.btnText}>Place order</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#38bdf8',
    marginBottom: 8,
  },
  item: {
    color: '#f8fafc',
    marginBottom: 6,
  },
  total: {
    color: '#38bdf8',
    fontSize: 18,
    marginVertical: 12,
  },
  btn: {
    backgroundColor: '#38bdf8',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnText: {
    color: '#0f172a',
    fontWeight: '600',
  },
});

