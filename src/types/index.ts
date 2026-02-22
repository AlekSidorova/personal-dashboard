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