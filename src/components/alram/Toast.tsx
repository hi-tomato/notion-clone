import React, { useEffect } from 'react';
import Button from '../ui/Button';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
}

const Toast = ({ message, type, isVisible, onClose }: ToastProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  }[type];

  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-center justify-center">
      <div
        className={`${bgColor} text-white px-4 py-3 rounded-full shadow-lg flex items-center`}
      >
        <span className="mr-2">
          {type === 'success' && '✓'}
          {type === 'error' && '✗'}
          {type === 'info' && 'ℹ'}
        </span>

        <p>{message}</p>

        <Button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200"
          text="✕"
        />
      </div>
    </div>
  );
};

export default Toast;
