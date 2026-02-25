'use client';

import styles from "./MoodTracker.module.css";
import { useState } from "react";

export default function MoodTracker() {
  const [mood, setMood] = useState<number | null>(null);

  return (
    <div>
      <h3>Настроение</h3>

      <div>
        {[1,2,3,4,5].map(value => (
          <button key={value} onClick={() => setMood(value)}>
            {value}
          </button>
        ))}
      </div>

      {mood && <p>Сегодня: {mood}</p>}
    </div>
  )
}