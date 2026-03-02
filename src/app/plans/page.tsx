//вывод планов одного дня
"use client";

import { DayCard } from "@/components/Plans";
import { getToday } from "@/utils/date";

export default function PlansPage() {
  const today = getToday();

  return (
    <div>
      <h1>Планы на день</h1>

      <DayCard date={today} />
    </div>
  );
}
