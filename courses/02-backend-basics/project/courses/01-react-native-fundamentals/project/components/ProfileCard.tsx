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
        <Text style={[styles.followButtonText, following && styles.followingButtonText]}>
          {following ? 'Following' : 'Follow'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#141416',
    borderWidth: 1,
    borderColor: '#232326',
    borderRadius: 20,
    paddingVertical: 32,
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  username: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FAFAFA',
    marginBottom: 6,
    letterSpacing: -0.2,
  },
  bio: {
    fontSize: 14,
    color: '#8A8A8E',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
    maxWidth: 260,
  },
  followButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#3A3A3C',
    paddingHorizontal: 28,
    paddingVertical: 9,
    borderRadius: 100,
  },
  followingButton: {
    backgroundColor: '#FAFAFA',
    borderColor: '#FAFAFA',
  },
  followButtonText: {
    color: '#FAFAFA',
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  followingButtonText: {
    color: '#141416',
  },
});