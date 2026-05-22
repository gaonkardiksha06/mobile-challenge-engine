export type FeedPost = {
  id: string;
  author: string;
  body: string;
  likes: number;
};

const posts: FeedPost[] = [
  { id: '1', author: 'Alex', body: 'Shipped my first Expo app!', likes: 12 },
  { id: '2', author: 'Sam', body: 'Redux + Firebase = 🔥', likes: 8 },
];

export const firebaseAuth = {
  currentUser: { uid: 'user-1', displayName: 'Learner' },
};

export const firestore = {
  collection: (path: string) => ({
    orderBy: () => ({
      onSnapshot: (cb: (snap: { docs: { id: string; data: () => FeedPost }[] }) => void) => {
        if (path.includes('posts')) {
          cb({ docs: posts.map((p) => ({ id: p.id, data: () => p })) });
        }
        return () => undefined;
      },
    }),
    add: async (data: Omit<FeedPost, 'id'>) => {
      const post = { ...data, id: `${Date.now()}` };
      posts.unshift(post);
      return post;
    },
  }),
};
