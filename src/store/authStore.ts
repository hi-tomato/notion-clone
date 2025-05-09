import { login, logout, onUserStateChange } from '@/firebase/firebase';
import { Unsubscribe, User } from 'firebase/auth';
import { create } from 'zustand';

interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;

  initAuth: () => Unsubscribe;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

// 인증 리스너가 중복 등록되지 않도록 하는 플래그
let authListenerInitialized = false;

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  error: null,

  initAuth: () => {
    if (authListenerInitialized) {
      return () => {};
    }

    authListenerInitialized = true;
    console.log('Firebase auth listener initialized');

    const unsubscribe = onUserStateChange((user: User | null) => {
      if (user) {
        set({
          user: {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          isLoading: false,
          error: null,
        });
      } else {
        set({ user: null, isLoading: false, error: null });
      }
    });

    return () => {
      authListenerInitialized = false;
      unsubscribe();
    };
  },

  login: async (): Promise<void> => {
    set({ isLoading: true, error: null });
    try {
      await login();
      // 상태 업데이트는 onUserStateChange에서 처리됨
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    set({ isLoading: true, error: null });
    try {
      await logout();
      // 상태 업데이트는 onUserStateChange에서 처리됨
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
}));

export default useAuthStore;
