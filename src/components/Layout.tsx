// 수정된 Layout.tsx
import Header from '@/components/Header';
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import useAuthStore from '@/store/authStore';

const Layout = () => {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  // 로그인 페이지인지 확인
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {!isLoginPage && <Header />}

      <div className="md:flex flex-1 overflow-hidden">
        {user && !isLoginPage && <Sidebar />}

        <main className={`flex-1 ${!isLoginPage ? 'p-4' : ''} overflow-auto`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
