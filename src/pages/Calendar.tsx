import React, { useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { ko } from 'date-fns/locale';
import { getCalendar } from '@utils/calendar';
import CalendarHeader from '@/components/calendar/CalendarHeader';
import CalendarContents from '@/components/calendar/CalendarContents';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // 캘린더 매트릭스 가져오기
  const calendarMatrix = getCalendar(currentDate);

  // 이전 달로 이동
  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  // 다음 달로 이동
  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  // 날짜 선택 처리
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
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
        <div className="mt-4 p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">
            선택된 날짜:{' '}
            {format(selectedDate, 'yyyy년 MM월 dd일 (EEEE)', { locale: ko })}
          </h3>
        </div>
      )}
    </div>
  );
}
