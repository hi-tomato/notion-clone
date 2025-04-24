export const formatDate = (dateStr: Date | string) => {
  if (!dateStr) return '';

  const date: Date | string = new Date(dateStr);
  const day = date.getDate();

  // 월 이름 배열
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const month = monthNames[date.getMonth()]; // 0-11을 월 이름으로 변환
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};
