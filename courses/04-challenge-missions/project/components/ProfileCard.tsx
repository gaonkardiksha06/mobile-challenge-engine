import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileCard() {
  const [following, setFollowing] = useState(false);

  return (
    <View style={styles.card} testID="profile-card">
      <Image
        testID="profile-avatar"
        source={{ uri: 'https://i.pravatar.cc/150?img=47' }}
        style={styles.avatar}
      />

      <View style={styles.info}>
        <Text style={styles.username} testID="profile-username">
          @sakshi_dev
        </Text>

        <Text style={styles.bio} testID="profile-bio">
          React Native Developer • Building mobile experiences
        </Text>

        <TouchableOpacity
          testID="follow-button"
          style={styles.followButton}
          onPress={() => setFollowing(!following)}
        >
          <Text style={styles.followText}>
            {following ? 'Following' : 'Follow'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: 420,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 18,
    backgroundColor: '#1e293b',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  username: {
    fontSize: 20,
    fontWeight: '700',
    color: '#f8fafc',
    marginBottom: 6,
  },
  bio: {
    fontSize: 14,
    color: '#cbd5e1',
    marginBottom: 12,
  },
  followButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 10,
    backgroundColor: '#38bdf8',
  },
  followText: {
    color: '#0f172a',
    fontWeight: '700',
  },
});