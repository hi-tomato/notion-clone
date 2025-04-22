import { FirebaseError, initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  Unsubscribe,
  User,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export const login = async (): Promise<User | null> => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log('로그인 성공 :', user);
    return user;
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      const errorMessage = error.message;
      console.log('로그인 실패 :', errorMessage);
    }
    return null;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
    console.log('로그아웃 성공!');
  } catch (error) {
    console.error('로그아웃 실패:', error);
  }
};

export const onUserStateChange = (
  callback: (user: User | null) => void
): Unsubscribe => {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};
