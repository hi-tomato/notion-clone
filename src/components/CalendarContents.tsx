import React from 'react';
import { isSameMonth } from 'date-fns';
import CalendarDateCell from './CalendarDateCell';
import { CalendarContentsProps } from '@/types/calendar';

const CalendarContents = ({
  currentDate,
  calendarMatrix,
  selectedDate,
  handleDateClick,
  todos,
}: CalendarContentsProps) => {
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

          return (
            <CalendarDateCell
              key={index}
              date={date}
              currentDate={currentDate}
              selectedDate={selectedDate}
              isCurrentMonth={isCurrentMonth}
              isSelected={isSelected}
              todos={todos}
              onDateClick={handleDateClick}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CalendarContents;
