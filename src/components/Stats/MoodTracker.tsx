'use client';

import styles from "./MoodTracker.module.css";
import { useState, useEffect } from "react";
import type { TMoodEntry } from "@/types";

const today = new Date().toISOString().slice(0, 10);

export default function MoodTracker() {
  const [history, setHistory] = useState<TMoodEntry[]>([]);
  const [todayMood, setTodayMood] = useState<number | null>(null);

  //загрузка
  useEffect(() => {
    const saved = localStorage.getItem('mood-history');
    if (saved) {
      const parsed: TMoodEntry[] = JSON.parse(saved);
      setHistory(parsed);

      const todayEntry = parsed.find((e) => e.date === today);
      if (todayEntry) setTodayMood(todayEntry.mood);
    }
  }, []);

  //сохранение
  useEffect(() => {
    localStorage.setItem('mood-history', JSON.stringify(history));
  }, [history]);

  const setMood = (value: number) => {
    setTodayMood(value);
    setHistory((prev) => {
      const filtered = prev.filter((e) => e.date !== today);
      return [...filtered, { date: today, mood: value }];
    });
  };

  const lastDays = history
    .filter((entry) => entry.date !== today)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  return (
    <section className={styles.section}>
      <h3 className={styles.title}>Настроение</h3>

      <div className={styles.buttons}>
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            className={`${styles.moodButton} ${todayMood === value ? styles.moodButtonSelected : ""}`}
            onClick={() => setMood(value)}
          >
            {value}
          </button>
        ))}
      </div>

      {todayMood !== null && (
        <p className={styles.result}>Сегодня: {todayMood}</p>
      )}

      {lastDays.length > 0 ? (
        <ul className={styles.history}>
          {lastDays.map((entry) => (
            <li key={entry.date} className={styles.historyItem}>
              <span className={styles.historyDate}>{entry.date}</span>
              <span className={styles.historyMood}>{entry.mood}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.emptyHistory}>Записей за прошлые дни пока нет</p>
      )}
    </section>
  );
}