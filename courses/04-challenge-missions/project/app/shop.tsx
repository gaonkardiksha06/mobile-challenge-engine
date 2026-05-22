import { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store/index';
import { addItem } from '../store/cartSlice';

type Product = { id: number; title: string; price: number };

export default function ShopScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=10')
      .then((r) => r.json())
      .then((data: { id: number; title: string; price: number }[]) => {
        setProducts(data.map((p) => ({ id: p.id, title: p.title, price: p.price })));
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="#38bdf8" size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Marketplace</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        testID="shop-list"
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.info}>
              <Text style={styles.name} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            </View>
            <Pressable
              style={styles.btn}
              onPress={() => dispatch(addItem({ id: item.id, name: item.title, price: item.price }))}
              testID={`buy-${item.id}`}
            >
              <Text style={styles.btnText}>Add</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f172a' },
  title: { fontSize: 22, fontWeight: '700', color: '#38bdf8', marginBottom: 12 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  info: { flex: 1 },
  name: { color: '#f8fafc' },
  price: { color: '#38bdf8', marginTop: 4 },
  btn: { backgroundColor: '#38bdf8', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8 },
  btnText: { color: '#0f172a', fontWeight: '600' },
});
