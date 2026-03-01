//типы для заметок
export type TNote = {
  id: string;
  text: string;
  createdAt: string; //когда сделали
  //потом пожно добавить:
  //updatedAt: string; //дата последнего редактирования
  //pinned?: boolean; //закреплена ли заметка
  //color?: string; //цвет карточки
}

//типы для трекера настроений
export type TMoodEntry = {
  date: string;
  mood: number; //от 1-5
}

//типы для трекера привычек
export type THabit = {
  id: string;
  title: string;
  completedDates: string[];
}

//типы для тудушки в планере
export type TPlan = {
  id: string;
  text: string;
  completed: boolean;
}

export type TDayPlans = {
  date: string; //YYYY-MM-DD
  plans: TPlan[];
}
