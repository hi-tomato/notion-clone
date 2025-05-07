import React, { useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { ko } from 'date-fns/locale';
import { getCalendar } from '@utils/calendar';
import CalendarHeader from '@/components/CalendarHeader';
import CalendarContents from '@/components/CalendarContents';
import Button from '@/components/ui/Button';
import TodoModal from '@/components/TodoModal';
import useToast from '@/store/toastStore';
import Toast from '@/components/alram/Toast';
import useTodoStore from '@/store/todoStore';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const todos = useTodoStore((state) => state.todos);

  const [addTodo, setAddTodo] = useState(false);
  const { message, type, isVisible, hideToast } = useToast();
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

  const handleAddClick = () => {
    setAddTodo((prev) => !prev);
  };

  if (addTodo)
    return (
      <TodoModal
        modalStatus={addTodo}
        closeModal={() => setAddTodo(false)}
        showToast={(message, type) =>
          useToast.getState().showToast(message, type)
        }
        selectedDate={selectedDate}
      />
    );

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
        todos={todos}
      />

      {/* 선택된 날짜 정보 표시 */}
      {selectedDate && (
        <div className="mt-4 p-4 bg-[#2c2c2e] rounded-lg shadow text-gray-200">
          <h3 className="text-lg font-medium">
            선택된 날짜:{' '}
            {format(selectedDate, 'yyyy년 MM월 dd일 (EEEE)', { locale: ko })}
          </h3>
          <Button
            text="할 일 추가하기"
            className="p-2 bg-blue-700 rounded-sm"
            onClick={handleAddClick}
          />
        </div>
      )}

      {/* Toast 컴포넌트 추가 */}
      <Toast
        message={message}
        type={type}
        isVisible={isVisible}
        onClose={hideToast}
      />
    </div>
  );
}
