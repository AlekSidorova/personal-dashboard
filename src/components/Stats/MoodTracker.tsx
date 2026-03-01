"use client";

import styles from "./MoodTracker.module.css";
import { useState, useEffect } from "react";
import type { TMoodEntry } from "@/types";
//библиотека для графиков
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getToday } from "@/utils/date";

const today = getToday();

export default function MoodTracker() {
  const [history, setHistory] = useState<TMoodEntry[]>([]);
  const [todayMood, setTodayMood] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  //загрузка
  useEffect(() => {
    const saved = localStorage.getItem("mood-history");
    if (saved) {
      const parsed = JSON.parse(saved);
      setHistory(parsed);

      const todayEntry = parsed.find((e) => e.date === today);
      if (todayEntry) setTodayMood(todayEntry.mood);
    }
    setIsLoaded(true);
  }, []);

  //сохранение
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("mood-history", JSON.stringify(history));
    }
  }, [history, isLoaded]);

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

  const chartData = history
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((entry) => ({
      date: entry.date.slice(5),
      mood: entry.mood,
    }));

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

      {chartData.length > 0 && (
        <div className={styles.chartWrapper}>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart
              data={chartData}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <XAxis
                dataKey="date"
                stroke="#888"
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                domain={[1, 5]}
                allowDecimals={false}
                stroke="#888"
                fontSize={12}
                tickLine={false}
                width={24}
              />
              <Tooltip
                contentStyle={{
                  background: "#f8f9fa",
                  border: "2px solid #e0e0e0",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#171717" }}
              />
              <Line
                type="monotone"
                dataKey="mood"
                stroke="#1a1a2e"
                strokeWidth={2}
                dot={{ fill: "#1a1a2e", strokeWidth: 0 }}
                activeDot={{ fill: "#2d2d44", stroke: "#1a1a2e" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}
