import styles from "./page.module.css";
import { MoodTracker, HabitTracker } from "@/components/Stats";

export default function StatsPage() {
  return (
    <div className={styles.page}>
      <MoodTracker />
      <HabitTracker />
    </div>
  );
}