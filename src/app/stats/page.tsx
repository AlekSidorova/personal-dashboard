import styles from "./page.module.css";
import { MoodTracker, HabitTracker } from "@/components/Stats";

export default function StatsPage() {
  return (
    <div>
      <div>
        <MoodTracker />
      </div>

      <div>
        <HabitTracker />
      </div>
    </div>
  )
}