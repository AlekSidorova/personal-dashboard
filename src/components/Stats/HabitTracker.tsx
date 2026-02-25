'use client'

import styles from "./HabitTracker.module.css";
import { useState } from "react";

export default function HabitTracker() {
  const [habits, setHabits] = useState<string[]>([]);
  const [text, setText] = useState('');

  const addHabit = () => {
    if (!text.trim()) return
    setHabits([...habits, text])
    setText('')
  }

  return (
    <div>
      <h3>Привычки</h3>

      <div>
        <input 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Новая привычка"
        />
        <button onClick={addHabit}>Добавить</button>
      </div>

      <ul>
        {habits.map((habit, i) => (
          <li key={i}>{habit}</li>
        ))}
      </ul>
    </div>
  )
}