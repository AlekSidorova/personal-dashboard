import styles from "./page.module.css";
import { MoodTracker, HabitTracker } from "@/components/Stats";

export default function StatsPage() {
  return (
    <div className={styles.page}>
       <h3 className={styles.title}>Трекеры</h3>
      <MoodTracker />
      <HabitTracker />
    </div>
  );
}

