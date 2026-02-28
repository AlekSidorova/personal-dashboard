"use client";

import styles from "./HabitTracker.module.css";
import { useState, useEffect } from "react";
import type { THabit } from "@/types";

export default function HabitTracker() {
  const [habits, setHabits] = useState<THabit[]>([]);
  const [text, setText] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const today = new Date().toISOString().slice(0, 10);
  const now = new Date();

  //отображаемый месяц и год
  const [displayMonth, setDisplayMonth] = useState(now.getMonth());
  const [displayYear, setDisplayYear] = useState(now.getFullYear());

  //переключение месяцев
  const prevMonth = () => {
    if (displayMonth === 0) {
      setDisplayMonth(11);
      setDisplayYear(displayYear - 1);
    } else {
      setDisplayMonth(displayMonth - 1);
    }
  };

  const nextMonth = () => {
    if (displayMonth === 11) {
      setDisplayMonth(0);
      setDisplayYear(displayYear + 1);
    } else {
      setDisplayMonth(displayMonth + 1);
    }
  };

  //количество дней в отображаемом месяце
  const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();

  //генерируем массив чисел
  //теперь [1, 2, 3, ..., 31]
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  //превращаем число дня в строку
  const getDateString = (day: number) => {
    return new Date(displayYear, displayMonth, day).toISOString().slice(0, 10);
  };

  //заголовок месяца
  const monthName = new Date(displayYear, displayMonth).toLocaleDateString(
    "ru-RU",
    { month: "long" },
  );

  //делаем первую букву месяца заглавной
  const monthNameCapitalized = monthName.charAt(0).toUpperCase()+monthName.slice(1);

  //загрузка
  useEffect(() => {
    const saved = localStorage.getItem("habits");
    if (saved) setHabits(JSON.parse(saved));
    setIsLoaded(true);
  }, []);

  //сохранение
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("habits", JSON.stringify(habits));
    }
  }, [habits, isLoaded]);

  //добавление
  const addHabit = () => {
    if (!text.trim()) return;

    const newHabit: THabit = {
      id: crypto.randomUUID(),
      title: text,
      completedDates: [],
    };

    setHabits([...habits, newHabit]);
    setText("");
  };

  //отметка дня
  const toggleDate = (habitId: string, date: string) => {
    if (date > today) return;
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== habitId) return habit;
        const isCompleted = habit.completedDates.includes(date);
        return {
          ...habit,
          completedDates: isCompleted
            ? habit.completedDates.filter((d) => d !== date)
            : [...habit.completedDates, date],
        };
      }),
    );
  };

  //подсчет выполненных дней в выбранном месяце
  const getStreakInMonth = (dates: string[]) => {
    return dates.filter((d) => {
      const date = new Date(d);
      return (
        date.getFullYear() === displayYear && date.getMonth() === displayMonth
      );
    }).length;
  };

  //удаление ненужных привычек
  const deleteHabit = (habitId: string) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== habitId));
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h3 className={styles.title}>Привычки</h3>
      </div>

      {/* Добавление привычки */}
      <div className={styles.inputRow}>
        <input
          className={styles.input}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Новая привычка"
          onKeyDown={(e) => e.key === "Enter" && addHabit()}
        />
        <button className={styles.addButton} onClick={addHabit}>
          Добавить
        </button>
      </div>

      {/* Переключение месяцев */}
      <div className={styles.monthSwitcher}>
        <button className={styles.switchButton} onClick={prevMonth}>
          ‹
        </button>
        <h4 className={styles.monthTitle}>
          {monthNameCapitalized} {displayYear}
        </h4>
        <button className={styles.switchButton} onClick={nextMonth}>
          ›
        </button>
      </div>

      {habits.length === 0 ? (
        <div className={styles.emptyState}>
          Пока нет привычек. Добавь первую!
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <div className={styles.table}>
            {/* Header */}
            <div className={styles.row}>
              <div className={styles.habitCol}></div>
              {days.map((day) => (
                <div key={day} className={styles.dayCol}>
                  {day}
                </div>
              ))}
              <div className={styles.streakCol}>🔥</div>
              <div className={styles.deleteCol}></div>
            </div>

            {/* Rows */}
            {habits.map((habit) => (
              <div key={habit.id} className={styles.row}>
                <div className={styles.habitCol}>{habit.title}</div>

                {days.map((day) => {
                  const dateString = getDateString(day);
                  const isCompleted = habit.completedDates.includes(dateString);
                  const isFuture = dateString > today;

                  return (
                    <button
                      key={day}
                      disabled={isFuture}
                      className={`${styles.cell} ${isCompleted ? styles.done : ""} ${isFuture ? styles.future : ""}`}
                      onClick={() => toggleDate(habit.id, dateString)}
                    />
                  );
                })}

                <div className={styles.streakCol}>
                  {getStreakInMonth(habit.completedDates)}
                </div>

                <button
                  className={styles.deleteButton}
                  onClick={() => {
                    if (confirm("Удалить привычку?")) deleteHabit(habit.id);
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
