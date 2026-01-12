import cn from "@/src/shared/lib/cn";
import { useFilterStore } from "../model/use-filter-store";
import { MOCK_PUBLISHERS } from "../model/constants";

export function PublisherFilter() {
  const { tempFilters, setTempFilter } = useFilterStore();

  return (
    <div className="grid grid-cols-5 gap-2">
      {MOCK_PUBLISHERS.map((publisher) => {
        const isSelected = tempFilters.publisher === publisher;
        return (
          <button
            key={publisher}
            onClick={() =>
              setTempFilter("publisher", isSelected ? undefined : publisher)
            }
            className={cn(
              "py-2.5 px-1 rounded-full text-[13px] border transition-all truncate",
              isSelected
                ? "bg-[#3B82F6] border-[#3B82F6] text-white font-bold"
                : "bg-white border-[#E2E8F0] text-[#64748B]",
            )}
          >
            {publisher}
          </button>
        );
      })}
    </div>
  );
}
