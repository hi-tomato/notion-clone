import React, { useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { ko } from 'date-fns/locale';
import { getCalendar } from '@utils/calendar';
import CalendarHeader from '@/components/CalendarHeader';
import CalendarContents from '@/components/CalendarContents';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const calendarMatrix = getCalendar(currentDate);

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="w-full max-w-6xl mx-auto text-white">
      <CalendarHeader
        handlePrevMonth={handlePrevMonth}
        handleNextMonth={handleNextMonth}
        currentDate={currentDate}
      />

      {/* 캘린더 본문 */}
      <CalendarContents
        currentDate={currentDate}
        calendarMatrix={calendarMatrix}
        selectedDate={selectedDate}
        handleDateClick={handleDateClick}
      />

      {/* 선택된 날짜 정보 표시 */}
      {selectedDate && (
        <div className="mt-4 p-4 bg-[#2c2c2e] rounded-lg shadow text-gray-200">
          <h3 className="text-lg font-medium">
            선택된 날짜:{' '}
            {format(selectedDate, 'yyyy년 MM월 dd일 (EEEE)', { locale: ko })}
          </h3>
        </div>
      )}
    </div>
  );
}
