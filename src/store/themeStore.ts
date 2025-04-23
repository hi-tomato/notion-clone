import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface ThemeMode {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const useThemeStore = create(
  persist<ThemeMode>(
    (set) => ({
      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useThemeStore;
