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
  day: number,
): string => {
  const formattedMonth = String(month + 1).padStart(2, "0");
  const formattedDay = String(day).padStart(2, "0");

  return `${year}-${formattedMonth}-${formattedDay}`;
};

// getStartOfWeek - вычисляет дату первого дня недели (понедельника) от текущей даты
export const getStartOfWeek = (): Date => {
  const today = new Date();
  const day = today.getDay(); //0-воскресенье, 1-понедельник
  const diff = day === 0 ? -6 : 1 - day; //смещаем к понедельнику

  const monday = new Date(today);
  monday.setDate(today.getDate() + diff);
  return monday;
};

// getCurrentWeekDates - возвращает массив строк с датами текущей недели (с понедельника по воскресенье).
export const getCurrentWeekDates = (): string[] => {
  const start = getStartOfWeek();
  const week: string[] = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    week.push(formatDate(date));
  }

  return week;
};
