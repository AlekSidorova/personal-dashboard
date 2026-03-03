"use client";

import { WeeklyBoard } from "@/components/Plans";
import styles from "./page.module.css";

export default function PlansPage() {
  return (
    <div>
      <h1 className={styles.title}>Планы на день</h1>
      <WeeklyBoard />
    </div>
  );
}
