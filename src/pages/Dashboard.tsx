import React, { useState } from 'react';
import KanbanBoard from '@/components/KanbanBoard';
import TodoModal from '@/components/TodoModal';
import { BiPlus } from 'react-icons/bi';
import useAuthStore from '@/store/authStore';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const user = useAuthStore((state) => state.user);

  const today = new Date().toLocaleDateString('ko-KR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <div className="mb-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6 p-2 rounded-xl bg-[#f5f6fa] dark:bg-[#2e2f3e] shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            안녕하세요,{' '}
            <span className=" font-bold">{user?.displayName || '사용자'}</span>
            님!
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {today}의 일정을 간단하게 정리해보세요.
          </p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">
              오늘의 할 일 ✏️
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              일정 확인이 필요하시다면, 캘린더를 확인해보세요!{' '}
            </p>
          </div>
          <button
            onClick={openModal}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full shadow-md transition-all"
          >
            <BiPlus className="w-5 h-5" />
            <span className="hidden sm:inline">새 할 일 추가</span>
          </button>
        </div>
      </div>

      <TodoModal modalStatus={isModalOpen} closeModal={closeModal} />
      <KanbanBoard />
    </>
  );
};

export default Dashboard;
