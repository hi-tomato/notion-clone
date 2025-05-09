import NotificationPopup from '@/components/NotificationPopup';
import TodoNotificationIcon from '@/components/TodoNotificationIcon';
import { useNotificationStore } from '@/store/NotificationStore';
import React from 'react';

const NotificationContainer = () => {
  const {
    todayTodos,
    showTodoNotification,
    toggleTodoNotification,
    dismissTodoNotification,
  } = useNotificationStore();

  return (
    <div className="relative">
      <TodoNotificationIcon onClick={toggleTodoNotification} />

      {showTodoNotification && (
        <NotificationPopup
          todos={todayTodos}
          onClose={dismissTodoNotification}
        />
      )}
    </div>
  );
};

export default NotificationContainer;
