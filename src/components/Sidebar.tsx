import React, { useEffect } from 'react';
import {
  FaHome,
  FaChartBar,
  FaCalendarAlt,
  FaCog,
  FaUsers,
  FaFolder,
  FaSignOutAlt,
  FaSun,
  FaMoon,
  FaSignInAlt,
} from 'react-icons/fa';
import useAuthStore from '@/store/authStore';
import useThemeStore from '@/store/themeStore';

const Sidebar = () => {
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const { darkMode, toggleDarkMode } = useThemeStore();

  const menuItems = [
    { icon: <FaHome />, label: '대시보드', path: '/' },
    { icon: <FaChartBar />, label: '분석', path: '/analytics' },
    { icon: <FaCalendarAlt />, label: '캘린더', path: '/calendar' },
    { icon: <FaUsers />, label: '사용자', path: '/users' },
    { icon: <FaFolder />, label: '문서', path: '/documents' },
    { icon: <FaCog />, label: '설정', path: '/settings' },

    {
      icon: darkMode ? (
        <FaSun className="text-yellow-500" />
      ) : (
        <FaMoon className="text-gray-700" />
      ),
      label: darkMode ? '라이트 모드' : '다크 모드',
      onClick: toggleDarkMode,
      path: '#',
    },
  ];

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <div className="flex flex-col h-full py-6">
      {user && (
        <div className="px-6 mb-6 lg:hidden">
          <div className="flex items-center space-x-3">
            <img
              src={user.photoURL || '/default-avatar.png'}
              alt={user.displayName || 'User Profile'}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h2 className="text-sm font-medium">{user.displayName}</h2>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* 네비게이션 메뉴 */}
      <nav className="flex-1 px-2">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.onClick ? (
                <button
                  onClick={item.onClick}
                  className="flex items-center w-full px-4 py-3 text-gray-700 rounded-md hover:bg-gray-100 hover:text-blue-600 transition-colors"
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </button>
              ) : (
                <a
                  href={item.path}
                  className="flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-gray-100 hover:text-blue-600 transition-colors"
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* 로그아웃/로그인 버튼 */}
      <div className="px-6 mt-6">
        {user ? (
          <button
            onClick={logout}
            className="flex items-center w-full px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100 hover:text-red-600 transition-colors"
          >
            <FaSignOutAlt className="mr-3" />
            로그아웃
          </button>
        ) : (
          <button
            onClick={login}
            className="flex items-center w-full px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100 hover:text-blue-600 transition-colors"
          >
            <FaSignInAlt className="mr-3" />
            로그인
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
