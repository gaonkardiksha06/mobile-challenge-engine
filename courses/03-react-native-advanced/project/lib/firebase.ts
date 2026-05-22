// Firebase configuration (mock for local development)
export const firebaseConfig = {
  apiKey: 'demo-api-key',
  authDomain: 'mobile-challenges.firebaseapp.com',
  projectId: 'mobile-challenges',
  storageBucket: 'mobile-challenges.appspot.com',
  messagingSenderId: '000000000000',
  appId: '1:000000000000:web:demo',
};

export type ChatMessage = {
  id: string;
  text: string;
  userId: string;
  createdAt: number;
};

const messages: ChatMessage[] = [];

export const firebaseAuth = {
  currentUser: { uid: 'demo-user', displayName: 'Learner' },
  signInAnonymously: async () => ({ uid: 'demo-user' }),
};

export const firestore = {
  collection: (_path: string) => ({
    orderBy: () => ({
      onSnapshot: (callback: (snap: { docs: { id: string; data: () => ChatMessage }[] }) => void) => {
        callback({
          docs: messages.map((m) => ({
            id: m.id,
            data: () => m,
          })),
        });
        return () => undefined;
      },
    }),
    add: async (data: Omit<ChatMessage, 'id'>) => {
      const msg: ChatMessage = { ...data, id: `${Date.now()}` };
      messages.push(msg);
      return msg;
    },
  }),
};

export const firebaseStorage = {
  ref: (_path: string) => ({
    put: async (_file: unknown) => ({ ref: { getDownloadURL: async () => 'https://placehold.co/100' } }),
  }),
};
