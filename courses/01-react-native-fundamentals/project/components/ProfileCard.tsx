import { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';

const AVATAR_URI = 'https://i.pravatar.cc/150?u=sakshi_dev';

export default function ProfileCard() {
  const [following, setFollowing] = useState(false);

  return (
    <View style={styles.card} testID="profile-card">
      <Image source={{ uri: AVATAR_URI }} style={styles.avatar} testID="profile-avatar" />
      <Text style={styles.username} testID="profile-username">
        @sakshi_dev
      </Text>
      <Text style={styles.bio} testID="profile-bio">
        React Native learner building mobile apps with Expo.
      </Text>
      <Pressable
        style={[styles.followButton, following && styles.followingButton]}
        testID="follow-button"
        onPress={() => setFollowing((prev) => !prev)}
      >
        <Text style={styles.followButtonText}>{following ? 'Following' : 'Follow'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 12,
  },
  username: {
    fontSize: 20,
    fontWeight: '700',
    color: '#f8fafc',
    marginBottom: 8,
  },
  bio: {
    fontSize: 15,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 16,
  },
  followButton: {
    backgroundColor: '#38bdf8',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 24,
  },
  followingButton: {
    backgroundColor: '#334155',
  },
  followButtonText: {
    color: '#0f172a',
    fontSize: 15,
    fontWeight: '600',
  },
});
