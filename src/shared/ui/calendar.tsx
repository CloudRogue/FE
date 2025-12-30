"use client";

export const Calendar = () => {
  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="p-3 w-70 border rounded-md bg-white shadow-sm">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-sm font-semibold">2024년 3월</h2>
        <div className="flex gap-1">
          <button className="p-1 hover:bg-slate-100 rounded-md">⬅️</button>
          <button className="p-1 hover:bg-slate-100 rounded-md">➡️</button>
        </div>
      </div>
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <span
            key={day}
            className="text-[10px] text-slate-500 text-center font-medium"
          >
            {day}
          </span>
        ))}
      </div>
      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 31 }).map((_, i) => (
          <div
            key={i}
            className="h-8 w-8 text-sm flex items-center justify-center"
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};
