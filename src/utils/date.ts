// formatDate(date) - может форматировать любую Date
export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// getToday() - может получить сегодняшнюю дату
export const getToday = (): string => {
  return formatDate(new Date());
};

// buildDateString() - собирает дату для календаря
export const buildDateString = (
  year: number,
  month: number,
  day: number
): string => {
  const formattedMonth = String(month + 1).padStart(2, "0");
  const formattedDay = String(day).padStart(2, "0");

  return `${year}-${formattedMonth}-${formattedDay}`;
};