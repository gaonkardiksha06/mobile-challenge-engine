import { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { firebaseStorage, firebaseAuth } from '../lib/firebase';

export default function ProfileImageUpload() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setImageUri('https://placehold.co/120x120/0f172a/38bdf8?text=Profile');
  }, []);

  const handleUpload = async () => {
    setUploading(true);
    try {
      const path = `profiles/${firebaseAuth.currentUser?.uid ?? 'guest'}.jpg`;
      const ref = firebaseStorage.ref(path);
      await ref.put({ uri: imageUri });
      const url = await ref.put({}).then((r) => r.ref.getDownloadURL());
      setImageUri(url);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Profile photo</Text>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.avatar} testID="profile-image" />
      ) : (
        <View style={styles.placeholder} />
      )}
      <Pressable
        style={styles.button}
        onPress={handleUpload}
        disabled={uploading}
        testID="upload-button"
      >
        {uploading ? (
          <ActivityIndicator color="#0f172a" />
        ) : (
          <Text style={styles.buttonText}>Upload to Firebase Storage</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 16 },
  label: { color: '#f8fafc', fontSize: 16, marginBottom: 12 },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 16 },
  placeholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#1e293b',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#38bdf8',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonText: { color: '#0f172a', fontWeight: '600' },
});
