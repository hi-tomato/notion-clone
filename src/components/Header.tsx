import React, { useEffect } from 'react';
import SearchInput from '@/components/SearchInput';
import useAuthStore from '@/store/authStore';
// import useThemeStore from '@/store/themeStore';
import { FaCalendarAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';
import { GiHamburgerMenu } from 'react-icons/gi';
import NotificationContainer from '@/components/NotificationContainer';

const Header = () => {
  const initAuth = useAuthStore((state) => state.initAuth);
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
  };
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = initAuth();
    return () => {
      unsubscribe();
    };
  }, [initAuth]);

  return (
    <header className="app-header app-header sticky top-0 z-10 py-4 px-4 md:px-6 lg:ml-0">
      <div className="flex justify-between items-center">
        <div className="hidden md:block">
          <h1 className="text-xl md:text-2xl font-bold">
            <Link to="/">Welcome back, Developer 👋</Link>
          </h1>
        </div>

        <div className="md:hidden">
          <h1 className="text-lg font-bold">Welcome back, Developer 👋</h1>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="hidden md:block">
            <SearchInput onSubmit={handleSearch} />
          </div>

          <Button
            type="button"
            className="icon-button p-2 rounded-full transition-colors"
            onClick={() => navigate('/calendar')}
          >
            <FaCalendarAlt />
          </Button>

          {/* Bell-icon */}
          <NotificationContainer />

          <Button
            type="button"
            className="sm:hidden icon-button p-2 rounded-full transition-colors"
          >
            <GiHamburgerMenu />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
