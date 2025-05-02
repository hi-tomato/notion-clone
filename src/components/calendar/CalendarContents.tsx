import React from 'react';
import { format, isToday, isSameMonth } from 'date-fns';

interface ContentsProps {
  currentDate: Date;
  calendarMatrix: Date[][];
  selectedDate: Date | null;
  handleDateClick: (date: Date) => void;
}
const CalendarContents = ({
  currentDate,
  calendarMatrix,
  selectedDate,
  handleDateClick,
}: ContentsProps) => {
  return (
    <div className="bg-white rounded-b-lg shadow-sm">
      <div className="grid grid-cols-7">
        {calendarMatrix.flat().map((date, index) => {
          const isCurrentMonth = isSameMonth(date, currentDate);
          const isSelected =
            selectedDate &&
            date.getDate() === selectedDate.getDate() &&
            date.getMonth() === selectedDate.getMonth() &&
            date.getFullYear() === selectedDate.getFullYear();
          const isTodayDate = isToday(date);
          const isWeekend = date.getDay() === 0 || date.getDay() === 6;

          return (
            <div
              key={index}
              onClick={() => handleDateClick(date)}
              className={`border-b border-r border-gray-100 p-1 cursor-pointer transition-colors
                ${!isCurrentMonth ? 'bg-white opacity-60' : 'bg-white'}
                ${
                  isWeekend && isCurrentMonth
                    ? date.getDay() === 0
                      ? 'text-red-500'
                      : 'text-blue-500'
                    : ''
                }
                hover:bg-gray-50
              `}
            >
              <div
                className={`flex items-center justify-center h-8 w-8 mx-auto rounded-full text-sm
                  ${isSelected ? 'bg-blue-500 text-white' : ''}
                  ${
                    isTodayDate && !isSelected
                      ? 'border border-blue-500 text-blue-500'
                      : ''
                  }
                  ${!isCurrentMonth ? 'text-gray-400' : 'text-gray-900'}
                `}
              >
                {format(date, 'd')}
              </div>

              {/* 이벤트 표시 영역 */}
              <div className="mt-1 flex justify-center space-x-1">
                {/* 이벤트 표시 도트를 여기에 추가할 수 있습니다 */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarContents;
