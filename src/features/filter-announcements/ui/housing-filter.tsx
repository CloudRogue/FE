import cn from "@/src/shared/lib/cn";
import { useFilterStore } from "../model/use-filter-store";
import { MOCK_HOUSING_TYPES } from "../model/constants";

export function HousingTypeFilter() {
  const { tempFilters, setTempFilter } = useFilterStore();

  return (
    <div className="grid grid-cols-5 gap-2">
      {MOCK_HOUSING_TYPES.map((type) => {
        const isSelected = tempFilters.housingType === type;
        return (
          <button
            key={type}
            onClick={() =>
              setTempFilter("housingType", isSelected ? undefined : type)
            }
            className={cn(
              "py-2.5 px-1 rounded-full text-[13px] border transition-all text-center truncate",
              isSelected
                ? "bg-[#3B82F6] border-[#3B82F6] text-white font-bold"
                : "bg-white border-[#E2E8F0] text-[#64748B] hover:bg-slate-50",
            )}
          >
            {type}
          </button>
        );
      })}
    </div>
  );
}
