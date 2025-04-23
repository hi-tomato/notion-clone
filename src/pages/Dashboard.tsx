import React from 'react';
import KanbanBoard from '@/components/KanbanBoard';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

const Dashboard = () => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="hidden md:flex flex-1 ">
        <Sidebar />
        <div className="flex-1 p-4">
          <KanbanBoard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
