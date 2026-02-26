"use client";

import styles from "./HabitTracker.module.css";
import { useState, useEffect } from "react";
import type { THabit } from "@/types";

const today = new Date().toISOString().slice(0, 10);

export default function HabitTracker() {
  const [habits, setHabits] = useState<THabit[]>([]);
  const [text, setText] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

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
    setHabits(
      habits.map((habit) => {
        if (habit.id !== habitId) return habit;
        const isDone = habit.completedDates.includes(date);
        return {
          ...habit,
          completedDates: isDone
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

  //календарный метод как в гитхаб
  const getLastDays = (count = 30) => {
    const days = [];

    for (let i = count - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push(d.toISOString().slice(0, 10));
    }

    return days;
  };

  const days = getLastDays(35);

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

      <ul className={styles.list}>
        {habits.length === 0 ? (
          <li className={styles.emptyState}>
            Пока нет привычек. Добавь первую!
          </li>
        ) : (
          habits.map((habit) => {
            const doneToday = habit.completedDates.includes(today);
            const streak = getStreak(habit.completedDates);

            return (
              <li key={habit.id} className={styles.habitItem}>
                <label className={styles.habitLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={doneToday}
                    onChange={() => toggleDate(habit.id, today)}
                  />
                  <span className={styles.habitTitle}>{habit.title}</span>
                  <span className={styles.streak}>{streak} дн</span>
                </label>
                <div className={styles.calendarGrid}>
                  {days.map((day) => {
                    const isCompleted = habit.completedDates.includes(day);
                    const isFuture = day > today;
                    return (
                      <button
                        key={day}
                        type="button"
                        className={`${styles.calendarCell} ${isCompleted ? styles.calendarCellDone : ""} ${isFuture ? styles.calendarCellFuture : ""}`}
                        onClick={() => !isFuture && toggleDate(habit.id, day)}
                        title={day}
                      />
                    );
                  })}
                </div>
              </li>
            );
          })
        )}
      </ul>
    </section>
  );
}
