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
  displayName?: string;
  email?: string;
  photoURL?: string | null;
  uid?: string;

  initAuth: () => Unsubscribe;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  initAuth: () => {
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

    return unsubscribe;
  },

  login: async (): Promise<void> => {
    set({ isLoading: true, error: null });
    try {
      const user = await login();
      if (user) {
        set({ user, isLoading: false });
      }
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    try {
      await logout();
      set({ user: null, isLoading: false, error: null });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
}));

export default useAuthStore;
