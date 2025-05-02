import React, { useState } from 'react';
import KanbanBoard from '@/components/kanban/KanbanBoard';
import TodoModal from '@/components/TodoModal';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Add Task</h1>
        <button onClick={openModal}>새로운 할 일이 생겼다면!</button>
        <TodoModal modalStatus={isModalOpen} closeModal={closeModal} />
      </div>

      <KanbanBoard />
    </>
  );
};

export default Dashboard;
