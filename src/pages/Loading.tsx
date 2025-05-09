// src/components/LoadingSpinner.tsx
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  fullScreen?: boolean;
  text?: string;
}

const LoadingSpinner = ({
  size = 'medium',
  color = '#6a5af9',
  fullScreen = false,
  text = 'Loading...',
}: LoadingSpinnerProps) => {
  const sizeClass = {
    small: 'w-5 h-5 border-2',
    medium: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4',
  }[size];

  const spinner = (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`${sizeClass} rounded-full border-t-transparent animate-spin`}
        style={{
          borderColor: `${color}40`, // 40은 25% 투명도를 의미
          borderTopColor: 'transparent',
          borderLeftColor: color,
        }}
      ></div>
      {text && <p className="mt-3 text-sm text-gray-400">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
        {spinner}
      </div>
    );
  }

  return <div className="flex items-center justify-center p-4">{spinner}</div>;
};

export default LoadingSpinner;
