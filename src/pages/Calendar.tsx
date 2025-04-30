// Calendar.tsx
import React, { useState } from 'react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
} from 'date-fns';
import { ko } from 'date-fns/locale';
import { getDatesInRange } from '@/utils/calendar';

interface CalendarProps {
  onDateSelect?: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const prevMonth = (): void => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = (): void => setCurrentDate(addMonths(currentDate, 1));

  const onDateClick = (day: Date): void => {
    setSelectedDate(day);
    if (onDateSelect) {
      onDateSelect(day);
    }
  };

  const renderDays = () => {
    const dateFormat = 'EEEEEE';
    const startDateValue = startOfWeek(new Date());

    const weekdays = Array.from({ length: 7 }, (_, index) => {
      const dayDate = addDays(startDateValue, index);
      return (
        <div className="p-2" key={index}>
          {format(dayDate, dateFormat, { locale: ko })}
        </div>
      );
    });

    return weekdays;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDateValue = startOfWeek(monthStart);
    const endDateValue = endOfWeek(monthEnd);

    // 날짜 범위 배열 생성 (시작일과 종료일 포함)
    const allDates = getDatesInRange(startDateValue, endDateValue);

    // 날짜를 7일씩 나누는 2D 배열 생성
    const dateRows = Array.from(
      { length: allDates.length / 7 },
      (_, rowIndex) => allDates.slice(rowIndex * 7, rowIndex * 7 + 7)
    );

    return (
      <div className="calendar-body space-y-2">
        {dateRows.map((weekDates, rowIndex) => (
          <div
            className="calendar-row grid grid-cols-7 gap-1"
            key={`row-${rowIndex}`}
          >
            {weekDates.map((date) => {
              const isCurrentMonth = isSameMonth(date, monthStart);
              const isToday = isSameDay(date, new Date());
              const isSelected = selectedDate && isSameDay(date, selectedDate);

              const dayClasses = [
                'p-2 text-center rounded-lg transition-colors duration-200 cursor-pointer',
                !isCurrentMonth && 'text-gray-400', // 지난달 or 다음달
                isCurrentMonth && 'text-gray-900', // 현재 월
                isToday && 'bg-blue-500 text-white',
                isSelected && 'bg-indigo-500 text-white',
                'hover:bg-indigo-100',
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <div
                  key={date.toString()}
                  className={dayClasses}
                  onClick={() => onDateClick(date)}
                >
                  <span>{format(date, 'd')}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  const monthYearFormat = 'yyyy년 MMMM';

  return (
    <div className="calendar p-4 max-w-md mx-auto bg-white rounded-2xl shadow-md">
      <div className="calendar-header mb-4">
        <div className="navigation flex justify-between items-center">
          <button
            onClick={prevMonth}
            className="text-gray-600 hover:text-black px-2 py-1"
          >
            &lt;
          </button>
          <span className="current-month text-lg font-semibold text-gray-900">
            {format(currentDate, monthYearFormat, { locale: ko })}
          </span>
          <button
            onClick={nextMonth}
            className="text-gray-600 hover:text-black px-2 py-1"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* 요일 */}
      <div className="weekdays grid grid-cols-7 gap-1 text-xs text-center text-gray-500 mb-2">
        {renderDays()}
      </div>

      {/* 날짜들 */}
      <div className="calendar-body grid grid-cols-7 gap-1 text-center text-sm">
        {renderCells()}
      </div>
    </div>
  );
};

export default Calendar;
