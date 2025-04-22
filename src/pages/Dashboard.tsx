import React, { useState } from 'react';
import Contents from '@/components/Contents';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { FaBars } from 'react-icons/fa';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="hidden md:flex flex-1 ">
        <Sidebar />
        <div className="flex-1 bg-gray-100 p-4">
          <Contents />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
