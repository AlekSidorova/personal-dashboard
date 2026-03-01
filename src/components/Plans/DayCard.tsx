"use client";

import { useState } from "react";
import type { TPlan } from "@/types";

type DayCardProps = {
  date: string;
  plans: TPlan[];
  onAdd: (date: string, text: string) => void;
  onToggle: (date: string, planId: string) => void;
};

export default function DayCard({
  date,
  plans,
  onAdd,
  onToggle,
}: DayCardProps) {
  const [text, setText] = useState("");

  const completedCount = plans.filter((p) => p.completed).length;

  const handleAdd = () => {
    if (!text.trim()) return;
    onAdd(date, text);
    setText("");
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
                onChange={() => onToggle(date, plan.id)}
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
