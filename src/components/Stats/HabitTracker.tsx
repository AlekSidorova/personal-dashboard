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
  const year = now.getFullYear();
  const month = now.getMonth();

  //сколько дней в месяце
  //"нулевой день следующего месяца" -> это последний день текущего месяца
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  //генерируем массив чисел
  //теперь [1, 2, 3, ..., 31]
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  //превращаем число дня в строку
  const getDateString = (day: number) => {
    return new Date(year, month, day).toISOString().slice(0, 10);
  };

  //заголовок месяца
  const monthName = now.toLocaleDateString("ru-RU", { month: "long" });

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

  //добавление трекеров
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

  const getStreak = (dates: string[]) => {
    let streak = 0;
    let current = new Date();

    while (true) {
      const d = current.toISOString().slice(0, 10);
      if (dates.includes(d)) {
        streak++;
        current.setDate(current.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h3 className={styles.title}>Привычки</h3>
      </div>

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

      <h4 className={styles.monthTitle}>
        {monthName} {year}
      </h4>
      
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
                      className={`
                  ${styles.cell}
                  ${isCompleted ? styles.done : ""}
                  ${isFuture ? styles.future : ""}
                `}
                      onClick={() => toggleDate(habit.id, dateString)}
                    />
                  );
                })}

                <div className={styles.streakCol}>
                  {getStreak(habit.completedDates)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
