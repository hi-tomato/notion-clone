import React, { useEffect } from 'react';
import SearchInput from '@/components/SearchInput';
import useAuthStore from '@/store/authStore';
import useThemeStore from '@/store/themeStore';
import { FaCalendarAlt, FaBell } from 'react-icons/fa';

const Header = () => {
  const user = useAuthStore((state) => state.user);
  const initAuth = useAuthStore((state) => state.initAuth);
  const { darkMode } = useThemeStore();
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
  };

  useEffect(() => {
    const unsubscribe = initAuth();
    return () => {
      unsubscribe();
    };
  }, [initAuth]);

  return (
    <header
      className={`sticky top-0 z-10 ${
        darkMode
          ? 'bg-gray-800 text-white border-gray-700'
          : 'bg-white text-gray-800 border-gray-200'
      } border-b py-4 px-4 md:px-6 lg:ml-0 transition-colors`}
    >
      <div className="flex justify-between items-center">
        <div className="hidden md:block">
          <h1
            className={`text-xl md:text-2xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}
          >
            Welcome back, Developer 👋
          </h1>
        </div>

        <div className="md:hidden">
          <h1
            className={`text-lg font-bold ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}
          >
            Welcome back, Developer 👋
          </h1>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="hidden md:block">
            <SearchInput onSubmit={handleSearch} />
          </div>

          <button
            type="button"
            className={`p-2 ${
              darkMode
                ? 'text-gray-300 hover:bg-gray-700'
                : 'text-gray-600 hover:bg-gray-100'
            } rounded-full transition-colors`}
          >
            <FaCalendarAlt />
          </button>

          <button
            type="button"
            className={`p-2 ${
              darkMode
                ? 'text-gray-300 hover:bg-gray-700'
                : 'text-gray-600 hover:bg-gray-100'
            } rounded-full transition-colors`}
          >
            <FaBell />
          </button>

          {user && (
            <div className="hidden md:flex items-center space-x-2">
              <img
                src={user.photoURL || '/default-avatar.png'}
                alt={user.displayName || 'User Profile'}
                className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border border-transparent"
              />
              <h2
                className={`text-sm font-medium ${
                  darkMode ? 'text-gray-200' : 'text-gray-800'
                }`}
              >
                {user.displayName}
              </h2>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
