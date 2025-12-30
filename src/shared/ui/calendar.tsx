"use client";

import cn from "@/src/shared/lib/cn";
import { useMemo, useState } from "react";

const WEEK_DAYS = ["일", "월", "화", "수", "목", "금", "토"];

export interface CalendarProps {
  className?: string;
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
}

export const Calendar = ({
  selectedDate,
  onDateSelect,
  className,
}: CalendarProps) => {
  const [viewDate, setViewDate] = useState(selectedDate || new Date());

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const { days, emptySlots } = useMemo(() => {
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return {
      days: Array.from({ length: daysInMonth }, (_, i) => i + 1),
      emptySlots: Array.from({ length: firstDayOfMonth }),
    };
  }, [year, month]);

  const isToday = (day: number) => {
    const today = new Date();
    return (
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === day
    );
  };

  const isSelected = (day: number) => {
    return (
      selectedDate?.getFullYear() === year &&
      selectedDate?.getMonth() === month &&
      selectedDate?.getDate() === day
    );
  };

  const handleMonth = (offset: number) =>
    setViewDate(new Date(year, month + offset, 1));

  return (
    <div
      className={cn("p-3 w-70 border rounded-md bg-white shadow-sm", className)}
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between  gap-1 mb-4 px-1">
        <NavButton onClick={() => handleMonth(-1)}>⬅️</NavButton>
        <h2 className="text-sm font-semibold">
          {year}년 {month + 1}
        </h2>
        <NavButton onClick={() => handleMonth(1)}>➡️</NavButton>
      </div>
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEK_DAYS.map((day) => (
          <span key={day} className="text-[10px] text-center font-medium">
            {day}
          </span>
        ))}
      </div>
      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-1">
        {emptySlots.map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {days.map((day) => (
          <button
            key={day}
            onClick={() => onDateSelect?.(new Date(year, month, day))}
            className={cn(
              "h-8 w-8 text-sm flex items-center justify-center rounded-md transition-all",
              isToday(day) && "bg-slate-100 text-black font-bold",
              isSelected(day) &&
                "bg-black text-white hover:bg-black/90 font-medium",
            )}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};

const NavButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="p-1 hover:bg-slate-100 rounded-md transition-colors"
  >
    {children}
  </button>
);
