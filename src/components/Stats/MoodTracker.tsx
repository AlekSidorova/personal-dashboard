'use client';

import styles from "./MoodTracker.module.css";
import { useState, useEffect } from "react";

const today = new Date().toISOString().slice(0, 10);

export default function MoodTracker() {
  const [mood, setMood] = useState<number | null>(null);

  //загрузка
  useEffect(() => {
    const saved = localStorage.getItem('mood-' + today)
    if (saved) setMood(Number(saved))
  }, []);

  //сохранение
  useEffect(() => {
    if (mood !== null) {
      localStorage.setItem('mood-' + today, mood.toString())
    }
  }, [mood])

  return (
    <section className={styles.section}>
      <h3 className={styles.title}>Настроение</h3>

      <div className={styles.buttons}>
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            className={`${styles.moodButton} ${mood === value ? styles.moodButtonSelected : ""}`}
            onClick={() => setMood(value)}
          >
            {value}
          </button>
        ))}
      </div>

      {mood !== null && (
        <p className={styles.result}>Сегодня: {mood}</p>
      )}
    </section>
  );
}