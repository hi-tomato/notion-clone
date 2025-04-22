import React, { useEffect } from 'react';
import SearchInput from '@/components/SearchInput';
import useAuthStore from '@/store/authStore';
import { FaCalendarAlt, FaBell } from 'react-icons/fa';

const Header = () => {
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const initAuth = useAuthStore((state) => state.initAuth);

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
  };

  console.log(user);

  useEffect(() => {
    const unsubscribe = initAuth();
    return () => {
      unsubscribe();
    };
  }, [initAuth]);

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 py-4 px-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, Developer 👋</h1>
        </div>

        <div className="flex items-center space-x-4">
          <SearchInput onSubmit={handleSearch} />

          <button
            type="button"
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
          >
            <FaCalendarAlt />
          </button>

          <button
            type="button"
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
          >
            <FaBell />
          </button>

          {user ? (
            <button
              type="button"
              onClick={logout}
              className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              로그아웃
            </button>
          ) : (
            <button
              type="button"
              onClick={login}
              className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              로그인
            </button>
          )}

          {user && (
            <div className="flex items-center space-x-2">
              <img
                src={user.photoURL || '/default-avatar.png'}
                alt={user.displayName || 'User Profile'}
                className="w-10 h-10 rounded-full object-cover"
              />
              <h2 className="text-sm font-medium">{user.displayName}</h2>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
