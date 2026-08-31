import { useMemo, useCallback, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductList, { type Product } from '../components/ProductList';
import { addToCart, clearCart } from '../store/cartSlice';
import { firebaseAuth } from '../lib/firebase';
import type { RootState, AppDispatch } from '../store/index';

const DEMO_PRODUCTS: Product[] = [
  { id: 1, title: 'Wireless Earbuds', price: 49.99 },
  { id: 2, title: 'Phone Stand', price: 12.5 },
  { id: 3, title: 'USB-C Cable', price: 8.99 },
];

export default function CheckoutScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [products] = useState(DEMO_PRODUCTS);

  useEffect(() => {
    firebaseAuth.signInAnonymously();
  }, []);

  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const handleAdd = useCallback(
    (product: Product) => {
      dispatch(addToCart(product));
    },
    [dispatch]
  );

  const handlePay = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <ProductList products={products} onAdd={handleAdd} />
      <View style={styles.footer}>
        <Text style={styles.total} testID="cart-total">
          Total: ${total.toFixed(2)}
        </Text>
        <Pressable
          style={[styles.payBtn, total === 0 && styles.payDisabled]}
          onPress={handlePay}
          disabled={total === 0}
          testID="pay-button"
        >
          <Text style={styles.payText}>Pay with Stripe (demo)</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 16 },
  title: { fontSize: 22, fontWeight: '700', color: '#38bdf8', marginBottom: 12 },
  footer: { marginTop: 'auto', paddingTop: 16 },
  total: { color: '#f8fafc', fontSize: 18, marginBottom: 12 },
  payBtn: {
    backgroundColor: '#38bdf8',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  payDisabled: { opacity: 0.5 },
  payText: { color: '#0f172a', fontWeight: '700', fontSize: 16 },
});
