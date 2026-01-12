import cn from "@/src/shared/lib/cn";
import { useFilterStore } from "@/src/features/filter-announcements";
import { ChevronDown, ChevronUp } from "lucide-react";

// Mock Data (실제 구현 시 API 또는 상수로 관리)
const REGIONS = [
  "강남구",
  "강동구",
  "강북구",
  "강서구",
  "관악구",
  "광진구",
  "구로구",
  "금천구",
  "노원구",
  "도봉구",
  "동대문구",
  "동작구",
  "마포구",
  "서대문구",
  "서초구",
  "성동구",
  "성북구",
  "송파구",
  "양천구",
  "영등포구",
  "용산구",
  "은평구",
  "종로구",
  "중구",
  "중랑구",
];
const PUBLISHERS = [
  "주체A",
  "주체B",
  "주체C",
  "주체D",
  "주체E",
  "주체F",
  "기타",
];
const HOUSING_TYPES = [
  "유형A",
  "유형B",
  "유형C",
  "유형D",
  "유형E",
  "유형F",
  "유형G",
];

export function AnnouncementFilter() {
  const {
    activeTab,
    setActiveTab,
    tempFilters,
    setTempFilter,
    applyFilters,
    resetFilters,
  } = useFilterStore();

  const currentOptions = {
    region: { list: REGIONS, key: "regionCode" as const },
    publisher: { list: PUBLISHERS, key: "publisher" as const },
    housingType: { list: HOUSING_TYPES, key: "housingType" as const },
  }[activeTab];

  return (
    <div className="w-full bg-white shadow-md border-t rounded-t-[20px]">
      {/* Tab Header */}
      <div className="flex border-b">
        <TabButton label="희망 지역" tab="region" />
        <TabButton label="공급 주체" tab="publisher" />
        <TabButton label="주택 유형" tab="housingType" />
      </div>

      {/* Chip Grid Content */}
      <div className="p-5 h-[240px] overflow-y-auto grid grid-cols-5 gap-3">
        {currentOptions.list.map((option) => {
          const isSelected = tempFilters[currentOptions.key] === option;
          return (
            <button
              key={option}
              onClick={() =>
                setTempFilter(
                  currentOptions.key,
                  isSelected ? undefined : option,
                )
              }
              className={cn(
                "py-2.5 px-1 rounded-full text-[14px] border transition-all text-center truncate",
                isSelected
                  ? "bg-[#3B82F6] border-[#3B82F6] text-white font-bold"
                  : "bg-white border-slate-200 text-slate-600",
              )}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Footer Actions */}
      <div className="p-4 flex justify-end gap-3 border-t bg-white">
        <button
          onClick={resetFilters}
          className="px-6 py-3 bg-[#E2E8F0] text-[#64748B] rounded-[10px] font-bold text-[16px]"
        >
          초기화
        </button>
        <button
          onClick={applyFilters}
          className="px-8 py-3 bg-[#3B82F6] text-white rounded-[10px] font-bold text-[16px]"
        >
          결과 적용
        </button>
      </div>
    </div>
  );
}

function TabButton({
  label,
  tab,
}: {
  label: string;
  tab: "region" | "publisher" | "housingType";
}) {
  const { activeTab, setActiveTab } = useFilterStore();
  const isActive = activeTab === tab;

  return (
    <button
      onClick={() => setActiveTab(tab)}
      className={cn(
        "flex-1 py-4 flex items-center justify-center gap-1 text-[15px] font-bold",
        isActive ? "text-[#1E293B]" : "text-[#94A3B8]",
      )}
    >
      {label}
      {isActive ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
    </button>
  );
}
