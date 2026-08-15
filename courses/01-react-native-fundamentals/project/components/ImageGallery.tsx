import { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

type GalleryImage = {
  id: string;
  category: string;
  uri: string;
};

const CATEGORIES = ['All', 'Nature', 'City', 'Food', 'Travel'];

const MOCK_IMAGES: GalleryImage[] = [
  { id: '1', category: 'Nature', uri: 'https://picsum.photos/seed/nature1/300' },
  { id: '2', category: 'City', uri: 'https://picsum.photos/seed/city1/300' },
  { id: '3', category: 'Food', uri: 'https://picsum.photos/seed/food1/300' },
  { id: '4', category: 'Travel', uri: 'https://picsum.photos/seed/travel1/300' },
  { id: '5', category: 'Nature', uri: 'https://picsum.photos/seed/nature2/300' },
  { id: '6', category: 'City', uri: 'https://picsum.photos/seed/city2/300' },
];

export default function ImageGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const timer = setTimeout(() => {
      setImages(MOCK_IMAGES);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredImages =
    selectedCategory === 'All'
      ? images
      : images.filter((img) => img.category === selectedCategory);

  return (
    <View style={styles.container} testID="image-gallery">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryContent}
        testID="category-scroll"
      >
        {CATEGORIES.map((category) => (
          <Pressable
            key={category}
            onPress={() => setSelectedCategory(category)}
            testID={`category-${category}`}
            style={[
              styles.categoryChip,
              selectedCategory === category && styles.categoryChipActive,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive,
              ]}
            >
              {category}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {loading ? (
        <View style={styles.centerState} testID="gallery-loading">
          <ActivityIndicator color="#38bdf8" size="large" />
        </View>
      ) : filteredImages.length === 0 ? (
        <View style={styles.centerState} testID="empty-state">
          <Text style={styles.emptyText}>No Data</Text>
        </View>
      ) : (
        <FlatList
          data={filteredImages}
          keyExtractor={(item) => item.id}
          numColumns={2}
          testID="gallery-scroll"
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <Image source={{ uri: item.uri }} style={styles.image} testID={`gallery-image-${item.id}`} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%' },
  categoryScroll: { marginBottom: 16 },
  categoryContent: { paddingRight: 8, gap: 8 },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: '#38bdf8',
    borderColor: '#38bdf8',
  },
  categoryText: {
    color: '#94a3b8',
    fontSize: 13,
    fontWeight: '600',
  },
  categoryTextActive: {
    color: '#0f172a',
  },
  row: { gap: 12, marginBottom: 12 },
  listContent: { paddingBottom: 12 },
  image: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: '#1e293b',
  },
  centerState: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#94a3b8',
    fontSize: 15,
  },
});