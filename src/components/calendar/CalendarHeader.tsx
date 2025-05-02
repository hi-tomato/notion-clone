import React from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { GiNextButton, GiPreviousButton } from 'react-icons/gi';

interface HeaderProps {
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  currentDate: Date;
}

const CalendarHeader = ({
  handlePrevMonth,
  handleNextMonth,
  currentDate,
}: HeaderProps) => {
  return (
    <div className="bg-gray-50 rounded-t-lg shadow-sm max-w-6xl w-full mx-auto">
      <div className="flex items-center justify-between px-10 py-6">
        <button
          onClick={handlePrevMonth}
          className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
        >
          <GiPreviousButton className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-medium text-gray-900">
          {format(currentDate, 'yyyy년 MMMM', { locale: ko })}
        </h2>
        <button
          onClick={handleNextMonth}
          className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
        >
          <GiNextButton className="h-6 w-6" />
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 border-b border-gray-100">
        {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
          <div
            key={index}
            className={`py-3 text-center text-base font-medium ${
              index === 0
                ? 'text-red-400'
                : index === 6
                ? 'text-blue-400'
                : 'text-gray-500'
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarHeader;
