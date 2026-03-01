//тест одного дня
"use client";

import { useState } from "react";
import { DayCard } from "@/components/Plans";
import { getToday } from "@/utils/date";
import type { TPlan } from "@/types";

export default function PlansPage() {
  const today = getToday();

  const [plansByDate, setPlansByDate] = useState<{
    [key: string]: TPlan[];
  }>({
    [today]: [],
  });

  const handleAdd = (date: string, text: string) => {
    const newPlan: TPlan = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };

    setPlansByDate((prev) => ({
      ...prev,
      [date]: [...(prev[date] || []), newPlan],
    }));
  };

  const handleToggle = (date: string, planId: string) => {
    setPlansByDate((prev) => ({
      ...prev,
      [date]: prev[date].map((plan) =>
        plan.id === planId ? { ...plan, completed: !plan.completed } : plan,
      ),
    }));
  };

  return (
    <div>
      <h1>Тест одного дня</h1>

      <DayCard
        date={today}
        plans={plansByDate[today] || []}
        onAdd={handleAdd}
        onToggle={handleToggle}
      />
    </div>
  );
}
