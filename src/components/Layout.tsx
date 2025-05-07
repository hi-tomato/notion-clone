import Header from '@/components/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import useAuthStore from '@/store/authStore';
import Button from '@/components/ui/Button';
import Login from '@/pages/Login';

const Layout = () => {
  const user = useAuthStore((state) => state.user);
  console.log(user);
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      {user ? (
        <div className="md:flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 p-4 overflow-auto">
            <Outlet />
          </main>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Layout;
