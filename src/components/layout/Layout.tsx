import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      <div className="md:flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
