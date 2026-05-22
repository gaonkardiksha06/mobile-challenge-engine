import React, { useCallback, useMemo } from 'react';
import { FlatList, Text, Pressable, StyleSheet, View } from 'react-native';

export type Product = {
  id: number;
  title: string;
  price: number;
};

type ProductListProps = {
  products: Product[];
  onAdd: (product: Product) => void;
};

function ProductRow({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (p: Product) => void;
}) {
  return (
    <View style={styles.row}>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {product.title}
        </Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </View>
      <Pressable
        style={styles.addBtn}
        onPress={() => onAdd(product)}
        testID={`add-product-${product.id}`}
      >
        <Text style={styles.addText}>Add</Text>
      </Pressable>
    </View>
  );
}

const MemoProductRow = React.memo(ProductRow);

export default function ProductList({ products, onAdd }: ProductListProps) {
  const sorted = useMemo(
    () => [...products].sort((a, b) => a.price - b.price),
    [products]
  );

  const handleAdd = useCallback(
    (product: Product) => {
      onAdd(product);
    },
    [onAdd]
  );

  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <MemoProductRow product={item} onAdd={handleAdd} />
    ),
    [handleAdd]
  );

  return (
    <FlatList
      data={sorted}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderItem}
      testID="product-list"
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: { paddingBottom: 16 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  info: { flex: 1 },
  title: { color: '#f8fafc', fontSize: 15 },
  price: { color: '#38bdf8', marginTop: 4 },
  addBtn: {
    backgroundColor: '#38bdf8',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addText: { color: '#0f172a', fontWeight: '600' },
});
