import Button from '@/components/ui/Button';
import { useNotificationStore } from '@/store/NotificationStore';
import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa';

interface NotificationIconProps {
  onClick: () => void;
}

const TodoNotificationIcon: React.FC<NotificationIconProps> = ({ onClick }) => {
  const { unreadCount, showTodoNotification } = useNotificationStore();
  const [isHoveringIcon, setIsHoveringIcon] = useState<boolean>(false);

  return (
    <div className="relative">
      <Button
        type="button"
        className={`icon-button p-2 rounded-full transition-colors ${
          showTodoNotification ? 'bg-gray-200' : ''
        }`}
        onClick={onClick}
        onMouseEnter={() => setIsHoveringIcon(true)}
        onMouseLeave={() => setIsHoveringIcon(false)}
      >
        <FaBell />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </Button>
    </div>
  );
};

export default TodoNotificationIcon;
