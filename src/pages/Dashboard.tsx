import React from 'react';
import Contents from '@/components/Contents';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

const Dashboard = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <Contents />
    </div>
  );
};

export default Dashboard;
