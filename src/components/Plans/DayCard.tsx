"use client";

import { useState, useEffect } from "react";
import type { TPlan } from "@/types";

type DayCardProps = {
  date: string;
};

export default function DayCard({ date }: DayCardProps) {
  const [plans, setPlans] = useState<TPlan[]>([]);
  const [text, setText] = useState("");

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
  }, [date]);

  //сохранение
  useEffect(() => {
    localStorage.setItem(`plans-${date}`, JSON.stringify(plans));
  }, [plans, date]);

  const completedCount = plans.filter((p) => p.completed).length;

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
    <div>
      <h3>{date}</h3>

      <p>
        Выполнено {completedCount}/{plans.length}
      </p>

      {/* Список задач */}
      <ul>
        {plans.map((plan) => (
          <li key={plan.id}>
            <label>
              <input
                type="checkbox"
                checked={plan.completed}
                onChange={() => handleToggle(plan.id)}
              />
              {plan.text}
            </label>
          </li>
        ))}
      </ul>

      {/* Добавление */}
      <div>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Новая задача"
        />
        <button onClick={handleAdd}>+</button>
      </div>
    </div>
  );
}
