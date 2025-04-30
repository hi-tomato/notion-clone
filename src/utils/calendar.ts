import {
  addDays,
  differenceInCalendarDays,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

/**
 * 주어진 시작일과 종료일 사이의 날짜 배열을 반환.
 */
export const getDatesInRange = (start: Date, end: Date): Date[] =>
  Array.from({ length: differenceInDaysInclusive(start, end) }, (_, i) =>
    addDays(start, i)
  );

/**
 * 시작일과 종료일 사이의 일(day)을 계산
 */
export const differenceInDaysInclusive = (start: Date, end: Date) =>
  differenceInCalendarDays(end, start) + 1;

/**
 * 현재 달의 주 단위 날짜 배열을 반환 (2차원 배열)
 * 각 행은 한 주를 나타내고, 각 열은 요일을 나타냄 (일~토)
 */
export const getCalendarMatrix = (currentDate: Date): Date[][] => {
  const calendarStart = startOfWeek(startOfMonth(currentDate));
  const calendarEnd = endOfWeek(endOfMonth(currentDate));

  const allDates = getDatesInRange(calendarStart, calendarEnd);
  const totalWeeks = Math.ceil(allDates.length / 7);

  // 주 단위로 날짜를 그룹화 (가로 방향으로 날짜가 나열됨)
  return Array.from({ length: totalWeeks }, (_, weekIndex) => {
    return Array.from({ length: 7 }, (_, dayIndex) => {
      const dateIndex = weekIndex * 7 + dayIndex;
      return dateIndex < allDates.length ? allDates[dateIndex] : new Date();
    });
  });
};

/**
 * 월요일 ~ 일요일까지 1주일 날짜를 반환
 */
export const getWeekDays = (referenceDate: Date = new Date()) =>
  Array.from({ length: 7 }, (_, i) => addDays(startOfWeek(referenceDate), i));
