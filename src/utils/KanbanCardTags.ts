export const getCategoryClassName = (category: string) => {
  if (!category) return '';

  switch (category.toLowerCase()) {
    case 'work':
      return 'bg-blue-400 text-white'; // #5DADE2와 유사한 파란색
    case 'personal':
      return 'bg-yellow-500 text-white'; // #F39C12와 유사한 주황색
    case 'study':
      return 'bg-green-500 text-white'; // #27AE60와 유사한 초록색
    default:
      return 'bg-gray-400 text-white'; // #BDC3C7와 유사한 회색
  }
};

export const getPriorityClassName = (priority: string) => {
  if (!priority) return '';

  switch (priority.toLowerCase()) {
    case 'low':
      return 'bg-gray-400 text-white'; // #BDC3C7와 유사한 회색
    case 'medium':
      return 'bg-green-300 text-white'; // #82E0AA와 유사한 연한 초록색
    case 'high':
      return 'bg-red-500 text-white'; // #E74C3C와 유사한 빨간색
    default:
      return 'bg-gray-400 text-white'; // #BDC3C7와 유사한 회색
  }
};
