"use client";

import { useState, useEffect } from "react";
import type { TPlan } from "@/types";
import styles from "./DayCard.module.css";
import { daysOfWeek } from "./dataWeek";

type DayCardProps = {
  date: string;
};

export default function DayCard({ date }: DayCardProps) {
  //для добавления дня недели
  const dateObject = new Date(date);
  //получаем номер дня недели
  const dayOfWeekIndex = dateObject.getDay();
  //получаем название дня недели
  const dayOfWeekName = daysOfWeek[dayOfWeekIndex];

  const [plans, setPlans] = useState<TPlan[]>([]);
  const [text, setText] = useState("");
  //чтобы не переписывались данные
  const [isLoaded, setIsLoaded] = useState(false);

  //загрузка планов
  useEffect(() => {
    const saved = localStorage.getItem(`plans-${date}`);
    if (saved) {
      try {
        setPlans(JSON.parse(saved));
      } catch {
        setPlans([]);
      }
    }
    setIsLoaded(true); //флаг вкл после загрузки
  }, [date]);

  //сохранение
  useEffect(() => {
    if (isLoaded) {
      //сохраняем только после загрузки
      localStorage.setItem(`plans-${date}`, JSON.stringify(plans));
    }
  }, [plans, date, isLoaded]);

  const completedCount = plans.filter((p) => p.completed).length;
  //для подсветки счетчика
  const isAllCompleted = plans.length > 0 && completedCount === plans.length;

  const handleAdd = () => {
    if (!text.trim()) return;

    const newPlan: TPlan = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };

    setPlans([...plans, newPlan]);
    setText("");
  };

  const handleToggle = (planId: string) => {
    setPlans((prev) =>
      prev.map((p) =>
        p.id === planId ? { ...p, completed: !p.completed } : p,
      ),
    );
  };

  return (
    <div className={styles.card}>
      <div>
        {/* День недели */}
        <p className={styles.weekday}>{dayOfWeekName}</p>

        {/* Список задач */}
        <ul className={styles.plans}>
          {plans.map((plan) => (
            <li key={plan.id} className={styles.list}>
              <label>
                <div
                  className={`${styles.customCheckbox} ${
                    plan.completed ? styles.checked : ""
                  }`}
                  onClick={() => handleToggle(plan.id)}
                  role="checkbox"
                  aria-checked={plan.completed}
                  tabIndex={0}
                ></div>
                {plan.text}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        {/* Добавление */}
        <div className={styles.newPlan}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Новая задача"
            className={styles.placeholder}
          />
          <button onClick={handleAdd} className={styles.addButton}>
            +
          </button>
        </div>

        <div className={styles.footer}>
          <p className={styles.date}>{date}</p>

          <div
            className={`${styles.completed} ${isAllCompleted ? styles.completedActive : styles.completedInactive}`}
          >
            <p>
              ☑︎ {completedCount}/{plans.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
