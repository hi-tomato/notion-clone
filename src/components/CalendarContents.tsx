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
    <div className="bg-[#23272f] rounded-b-lg shadow-sm">
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
              className={`border border-[#2f343f] p-1 cursor-pointer transition-colors
                ${
                  !isCurrentMonth
                    ? 'bg-[#1c1f26] text-gray-500'
                    : 'bg-[#23272f] text-gray-200'
                }
                hover:bg-[#2e333d]
              `}
            >
              <div
                className={`flex items-center justify-center h-8 w-8 mx-auto rounded-full text-sm
                  ${isSelected ? 'bg-blue-500 text-white' : ''}
                  ${
                    isTodayDate && !isSelected
                      ? 'border border-blue-400 text-blue-400'
                      : ''
                  }
                  ${
                    isWeekend && isCurrentMonth
                      ? date.getDay() === 0
                        ? 'text-red-400'
                        : 'text-blue-400'
                      : ''
                  }
                `}
              >
                {format(date, 'd')}
              </div>

              {/* 이벤트 도트 */}
              <div className="mt-1 flex justify-center space-x-1"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarContents;
