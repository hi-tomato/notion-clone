import useThemeStore from '@/store/themeStore';
import { useEffect } from 'react';

const useDarkModeToggle = () => {
  const { darkMode } = useThemeStore();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);
};

export default useDarkModeToggle;
