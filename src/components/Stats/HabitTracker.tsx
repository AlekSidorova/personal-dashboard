'use client'

import styles from "./HabitTracker.module.css";
import { useState, useEffect } from "react";
import type { THabit } from "@/types";

const today = new Date().toISOString().slice(0, 10);

export default function HabitTracker() {
  const [habits, setHabits] = useState<THabit[]>([]);
  const [text, setText] = useState('');

  //загрузка
  useEffect(() => {
    const saved = localStorage.getItem('habits')
    if (saved) setHabits(JSON.parse(saved))
  }, [])

  //сохранение
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits))
  }, [habits])

  //добавление трекеров
  const addHabit = () => {
    if (!text.trim()) return

    const newHabit: THabit = {
      id: crypto.randomUUID(),
      title: text,
      completedDates: [],
    }

    setHabits([...habits, newHabit])
    setText('')
  }

  const toggleToday = (id: string) => {
    setHabits(habits.map(habit => {
      if (habit.id !== id) return habit

      const doneToday = habit.completedDates.includes(today)

      return {
        ...habit,
        completedDates: doneToday
        ? habit.completedDates.filter(d => d !== today)
        : [...habit.completedDates, today]
      }
    }))
  }

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
          <li className={styles.emptyState}>Пока нет привычек. Добавь первую!</li>
        ) : (
          habits.map((habit) => {
            const doneToday = habit.completedDates.includes(today);

            return (
              <li key={habit.id} className={styles.habitItem}>
                <label className={styles.habitLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={doneToday}
                    onChange={() => toggleToday(habit.id)}
                  />
                  <span className={styles.habitTitle}>{habit.title}</span>
                </label>
              </li>
            );
          })
        )}
      </ul>
    </section>
  );
}