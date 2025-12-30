"use client";

import cn from "@/src/shared/lib/cn";
import { createContext, useContext, useMemo, useState } from "react";

const WEEK_DAYS = ["일", "월", "화", "수", "목", "금", "토"];

interface CalendarContextProps {
  viewDate: Date;
  setViewDate: (date: Date) => void;
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  label?: string;
}

const CalendarContext = createContext<CalendarContextProps | undefined>(
  undefined,
);

const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context)
    throw new Error("캘린더 구성 요소는 CalendarRoot 내에서 사용해야 합니다.");
  return context;
};

// CalendarRoot ===============================================================
interface CalendarRoot {
  children: React.ReactNode;
  className?: string;
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  label?: string;
}

export const CalendarRoot = ({
  children,
  className,
  selectedDate,
  onDateSelect,
  label = "날짜 선택기",
}: CalendarRoot) => {
  const [viewDate, setViewDate] = useState(selectedDate || new Date());
  return (
    <CalendarContext
      value={{ viewDate, setViewDate, selectedDate, onDateSelect }}
    >
      <section
        className={cn(
          "p-3 w-70 border rounded-md bg-white shadow-sm",
          className,
        )}
        aria-label={label}
      >
        {children}
      </section>
    </CalendarContext>
  );
};

// Header(년/월/네비게이션) =====================================================

interface CalendarHeader {
  className?: string;
  btnClassName?: string;
}

export const CalendarHeader = ({ className, btnClassName }: CalendarHeader) => {
  const { viewDate, setViewDate } = useCalendar();
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const handleMonth = (offset: number) =>
    setViewDate(new Date(year, month + offset, 1));
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-1 mb-4 px-1",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => handleMonth(-1)}
        className={cn(
          "p-1 hover:bg-slate-100 rounded-md transition-colors",
          btnClassName,
        )}
        aria-label="이전 달로 이동"
      >
        ⬅️
      </button>
      <h2 className="text-sm font-semibold">
        {year}년 {month + 1}월
      </h2>
      <button
        type="button"
        onClick={() => handleMonth(1)}
        className={cn(
          "p-1 hover:bg-slate-100 rounded-md transition-colors",
          btnClassName,
        )}
        aria-label="다음 달로 이동"
      >
        ➡️
      </button>
    </div>
  );
};

// 요일 헤더 및 날짜 그리드 컨테이너 ==========================================
interface CalendarGrid {
  children: React.ReactNode;
  className?: string;
}

export const CalendarGrid = ({ children, className }: CalendarGrid) => {
  return (
    <div className={className}>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEK_DAYS.map((day, i) => (
          <span
            key={day}
            className="text-[10px] text-center font-medium text-slate-500"
            aria-label={WEEK_DAYS[i]}
          >
            {day}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">{children}</div>
    </div>
  );
};

// day 컴포넌트 =============================================================
export const CalendarDays = () => {
  const { viewDate, selectedDate, onDateSelect } = useCalendar();
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const todayTime = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  }, []);

  const selectedTime = useMemo(() => {
    if (!selectedDate) return null;
    return new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      selectedDate.getTime(),
    ).getTime();
  }, [selectedDate]);

  const { days, emptySlots } = useMemo(() => {
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return {
      days: Array.from({ length: daysInMonth }, (_, i) => i + 1),
      emptySlots: Array.from({ length: firstDayOfMonth }),
    };
  }, [year, month]);

  return (
    <>
      {emptySlots.map((_, i) => (
        <div key={`empty-${i}`} aria-hidden="true" />
      ))}
      {days.map((day) => {
        const dateObj = new Date(year, month, day);
        const currentTime = new Date(year, month, day).getTime();
        const isSelected = selectedTime !== 0 && currentTime === selectedTime;
        const isToday = currentTime === todayTime;
        const dataLabel = `${year}년 ${month + 1}월 ${day}일 ${WEEK_DAYS[dateObj.getDay()]}`;

        return (
          <button
            key={day}
            type="button"
            onClick={() => onDateSelect?.(dateObj)}
            className={cn(
              "h-8 w-8 text-sm flex items-center justify-center rounded-md transition-all hover:bg-slate-100",
              isToday && "bg-slate-100 text-black font-bold",
              isSelected && "bg-black text-white hover:bg-black/90 font-medium",
            )}
            aria-label={`${dataLabel} ${isToday ? "오늘" : ""}`}
          >
            <span aria-hidden="true">{day}</span>
          </button>
        );
      })}
    </>
  );
};
