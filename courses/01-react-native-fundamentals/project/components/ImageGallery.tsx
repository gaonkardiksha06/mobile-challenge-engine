import { useState } from 'react';
import { View, Text, Image, ScrollView, Pressable, StyleSheet } from 'react-native';

const GALLERY_IMAGES = [
  { id: '1', uri: 'https://picsum.photos/400/300?random=1', label: 'Sunset' },
  { id: '2', uri: 'https://picsum.photos/400/300?random=2', label: 'Mountains' },
  { id: '3', uri: 'https://picsum.photos/400/300?random=3', label: 'City' },
  { id: '4', uri: 'https://picsum.photos/400/300?random=4', label: 'Ocean' },
];

const CATEGORIES = ['All', 'Nature', 'Urban', 'Travel', 'Food', 'Tech'];

export default function ImageGallery() {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <View style={styles.container} testID="image-gallery">
      <Text style={styles.sectionTitle}>Categories</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryRow}
        testID="category-scroll"
      >
        {CATEGORIES.map((cat) => (
          <Pressable
            key={cat}
            style={[styles.chip, activeCategory === cat && styles.chipActive]}
            onPress={() => setActiveCategory(cat)}
            testID={`category-${cat}`}
          >
            <Text style={[styles.chipText, activeCategory === cat && styles.chipTextActive]}>
              {cat}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Gallery ({activeCategory})</Text>
      <ScrollView testID="gallery-scroll">
        {GALLERY_IMAGES.map((img) => (
          <View key={img.id} style={styles.imageCard}>
            <Image source={{ uri: img.uri }} style={styles.image} testID={`gallery-image-${img.id}`} />
            <Text style={styles.imageLabel}>{img.label}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%' },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f8fafc',
    marginBottom: 12,
    marginTop: 8,
  },
  categoryRow: { paddingBottom: 16, gap: 8 },
  chip: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  chipActive: { backgroundColor: '#38bdf8', borderColor: '#38bdf8' },
  chipText: { color: '#94a3b8', fontWeight: '600' },
  chipTextActive: { color: '#0f172a' },
  imageCard: { marginBottom: 16 },
  image: { width: '100%', height: 200, borderRadius: 12 },
  imageLabel: { marginTop: 8, fontSize: 14, color: '#94a3b8' },
});
