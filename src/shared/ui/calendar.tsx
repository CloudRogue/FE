"use client";

import cn from "@/src/shared/lib/cn";
import { createContext, useContext, useMemo, useState } from "react";

interface CalendarContextProps {
  viewDate: Date;
  setViewDate: (date: Date) => void;
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
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
}

export const CalendarRoot = ({
  children,
  className,
  selectedDate,
  onDateSelect,
}: CalendarRoot) => {
  const [viewDate, setViewDate] = useState(selectedDate || new Date());
  return (
    <CalendarContext
      value={{ viewDate, setViewDate, selectedDate, onDateSelect }}
    >
      <div
        className={cn(
          "p-3 w-70 border rounded-md bg-white shadow-sm",
          className,
        )}
      >
        {children}
      </div>
    </CalendarContext>
  );
};

// Header(년/월/네비게이션) =====================================================
interface NavButton {
  className?: string;
  onClick: () => void;
  children: React.ReactNode;
}

const NavButton = ({ className, onClick, children }: NavButton) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "p-1 hover:bg-slate-100 rounded-md transition-colors",
      className,
    )}
  >
    {children}
  </button>
);

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
      <NavButton className={btnClassName} onClick={() => handleMonth(-1)}>
        ⬅️
      </NavButton>
      <h2 className="text-sm font-semibold">
        {year}년 {month + 1}월
      </h2>
      <NavButton onClick={() => handleMonth(1)}>➡️</NavButton>
    </div>
  );
};

// 요일 헤더 및 날짜 그리드 컨테이너 ==========================================
interface CalendarGrid {
  children: React.ReactNode;
  className?: string;
}

export const CalendarGrid = ({ children, className }: CalendarGrid) => {
  const WEEK_DAYS = ["일", "월", "화", "수", "목", "금", "토"];
  return (
    <div className={className}>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEK_DAYS.map((day) => (
          <span
            key={day}
            className="text-[10px] text-center font-medium text-slate-500"
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

  const { days, emptySlots } = useMemo(() => {
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return {
      days: Array.from({ length: daysInMonth }, (_, i) => i + 1),
      emptySlots: Array.from({ length: firstDayOfMonth }),
    };
  }, [year, month]);

  const toDateString = (date: Date | undefined) => date?.toDateString() || "";

  return (
    <>
      {emptySlots.map((_, i) => (
        <div key={`empty-${i}`} aria-hidden="true" />
      ))}
      {days.map((day) => {
        const dateObj = new Date(year, month, day);
        const isSelected =
          toDateString(selectedDate) === dateObj.toDateString();
        const isToday = new Date().toDateString() === dateObj.toDateString();

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
          >
            {day}
          </button>
        );
      })}
    </>
  );
};
