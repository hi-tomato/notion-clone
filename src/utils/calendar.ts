import {
  differenceInCalendarDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
//
export const getDatesInRange = (start: Date, end: Date) =>
  eachDayOfInterval({ start, end });

export const differenceDays = (start: Date, end: Date) =>
  differenceInCalendarDays(end, start) + 1;

export const getCalendar = (currentDate: Date) => {
  const calendarStart = startOfWeek(startOfMonth(currentDate));
  const calendarEnd = endOfWeek(endOfMonth(currentDate));

  const allDates = getDatesInRange(calendarStart, calendarEnd);
  const totalWeeks = Math.ceil(allDates.length / 7);

  return Array.from({ length: totalWeeks }, (_, weekIndex) => {
    return Array.from({ length: 7 }, (_, dayIndex) => {
      const dateIndex = weekIndex * 7 + dayIndex;
      return dateIndex < allDates.length ? allDates[dateIndex] : new Date();
    });
  });
};

export const getWeekDays = (date: Date = new Date()) =>
  eachDayOfInterval({
    start: startOfWeek(date),
    end: endOfWeek(date),
  });
