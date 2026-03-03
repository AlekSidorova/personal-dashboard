"use client";

import { useState } from "react";
import DayCard from "./DayCard";
import styles from "./WeeklyBoard.module.css";
//утилита для дней недели
import { formatDate, getCurrentWeekDates } from "@/utils/date";

export default function WeeklyBoard() {
  //состояние для текущей недели
  const [currentWeek, setCurrentWeek] = useState(getCurrentWeekDates());

  const generateWeekFromMonday = (monday: Date): string[] => {
    const week: string[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      week.push(formatDate(date));
    }
    return week;
  };

  //навигация по неделям
  const prevWeek = () => {
    //берем первую дату текущей недели (понедельник)
    const currentMonday = new Date(currentWeek[0]);
    //отнимаем 7 дней - получаем понедельник прошлой недели
    currentMonday.setDate(currentMonday.getDate() - 7);
    //генерируем новую неделю
    setCurrentWeek(generateWeekFromMonday(currentMonday));
  };

  const nextWeek = () => {
    const currentMonday = new Date(currentWeek[0]);
    currentMonday.setDate(currentMonday.getDate() + 7);
    setCurrentWeek(generateWeekFromMonday(currentMonday));
  };

  return (
    <div className={styles.board}>
      {/*Заголовок с датами и стрелками */}
      <div className={styles.header}>

        <button onClick={prevWeek} className={styles.switchButton}>
          ‹
        </button>

        <div>
          <span>
            {currentWeek[0]} - {currentWeek[6]}
          </span>
          <div>
            {/* Строка поиска */}
            <input type="text" placeholder="Поиск по задачам" />

            {/* Сетка из DayCard */}
            <div className={styles.grid}>
              {currentWeek.map((date) => (
                <DayCard key={date} date={date} />
              ))}
            </div>
          </div>
        </div>

        <button onClick={nextWeek} className={styles.switchButton}>
          ›
        </button>
        
      </div>
    </div>
  );
}
