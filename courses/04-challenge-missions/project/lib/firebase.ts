type FeedPost = {
  id: string;
  author: string;
  body: string;
  likes: number;
  createdAt?: number;
};

type ChatMessage = {
  id: string;
  body: string;
  author: string;
  createdAt: number;
};

const posts: FeedPost[] = [
  {
    id: '1',
    author: 'Alex',
    body: 'Shipped my first Expo app!',
    likes: 12,
    createdAt: Date.now() - 2000,
  },
  {
    id: '2',
    author: 'Sam',
    body: 'Redux + Firebase = 🔥',
    likes: 8,
    createdAt: Date.now() - 1000,
  },
];

const messages: ChatMessage[] = [
  {
    id: '1',
    body: 'Welcome to the realtime chat!',
    author: 'Learner',
    createdAt: Date.now() - 1000,
  },
];

type SnapshotData = FeedPost | ChatMessage;

type Snapshot = {
  docs: {
    id: string;
    data: () => SnapshotData;
  }[];
};

type Listener = (snapshot: Snapshot) => void;

const chatListeners: Listener[] = [];
const postListeners: Listener[] = [];

const notifyChatListeners = () => {
  const snapshot: Snapshot = {
    docs: [...messages]
      .sort((a, b) => a.createdAt - b.createdAt)
      .map((message) => ({
        id: message.id,
        data: () => message,
      })),
  };

  chatListeners.forEach((listener) => listener(snapshot));
};

const notifyPostListeners = () => {
  const snapshot: Snapshot = {
    docs: [...posts]
      .sort((a, b) => (a.createdAt ?? 0) - (b.createdAt ?? 0))
      .map((post) => ({
        id: post.id,
        data: () => post,
      })),
  };

  postListeners.forEach((listener) => listener(snapshot));
};

export const firebaseAuth = {
  currentUser: {
    uid: 'user-1',
    displayName: 'Learner',
  },
};

export const firestore = {
  collection: (path: string) => ({
    orderBy: (_field?: string) => ({
      onSnapshot: (callback: Listener) => {
        if (path === 'chat') {
          chatListeners.push(callback);
          notifyChatListeners();

          return () => {
            const index = chatListeners.indexOf(callback);

            if (index !== -1) {
              chatListeners.splice(index, 1);
            }
          };
        }

        if (path === 'posts') {
          postListeners.push(callback);
          notifyPostListeners();

          return () => {
            const index = postListeners.indexOf(callback);

            if (index !== -1) {
              postListeners.splice(index, 1);
            }
          };
        }

        callback({ docs: [] });

        return () => undefined;
      },
    }),

    add: async (
      data: {
        body: string;
        author: string;
        likes?: number;
        createdAt?: number;
      }
    ) => {
      if (path === 'chat') {
        const message: ChatMessage = {
          id: `${Date.now()}-${Math.random()}`,
          body: data.body,
          author: data.author,
          createdAt: data.createdAt ?? Date.now(),
        };

        messages.push(message);
        notifyChatListeners();

        return message;
      }

      const post: FeedPost = {
        id: `${Date.now()}-${Math.random()}`,
        body: data.body,
        author: data.author,
        likes: data.likes ?? 0,
        createdAt: data.createdAt ?? Date.now(),
      };

      posts.unshift(post);
      notifyPostListeners();

      return post;
    },
  }),
};