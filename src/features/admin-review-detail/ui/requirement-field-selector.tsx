import {
  QualificationId,
  RequirementItem,
} from "@/src/features/admin-review-detail";
import cn from "@/src/shared/lib/cn";
import Input from "@/src/shared/ui/input";
import Select from "@/src/shared/ui/select";

// 아이템 타입에 따른 입력 필드 렌더용
interface RequirementFieldSelectorProps {
  item: RequirementItem;
  onUpdate: (updates: Partial<RequirementItem>) => void;
}

export function RequirementFieldSelector({
  item,
  onUpdate,
}: RequirementFieldSelectorProps) {
  switch (item.id) {
    case "age":
      return (
        <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-slate-200">
          <Input
            type="number"
            className="w-16 h-8 border-none focus:ring-0 text-center"
            value={item.min}
            onChange={(e) => onUpdate({ min: e.target.value })}
          />
          <span className="text-slate-300">~</span>
          <Input
            type="number"
            className="w-16 h-8 border-none focus:ring-0 text-center"
            value={item.max}
            onChange={(e) => onUpdate({ max: e.target.value })}
          />
          <span className="px-3 text-xs font-bold text-slate-400 border-l border-slate-100">
            세
          </span>
        </div>
      );

    case "income":
    case "parentIncome":
    case "assets":
    case "parentAssets":
    case "carValue":
      return (
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white rounded-lg border border-slate-200 p-1">
            <Input
              type="number"
              className="w-24 h-8 border-none focus:ring-0 text-center font-bold"
              value={item.value as string}
              onChange={(e) => onUpdate({ value: e.target.value })}
            />
            <span className="px-3 text-xs font-bold text-slate-400 border-l border-slate-100">
              {item.unit}
            </span>
          </div>
          <Select
            className="w-24 h-10"
            value={item.condition}
            onChange={(e) => onUpdate({ condition: e.target.value })}
            options={[
              { value: "이하", label: "이하" },
              { value: "이상", label: "이상" },
            ]}
          />
        </div>
      );

    default: // 토글 버튼형
      const options = getToggleOptions(item.id);
      return (
        <div className="flex bg-white border border-blue-600 rounded-lg overflow-hidden shrink-0">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              className={cn(
                "px-8 py-2 text-xs font-bold transition-all min-w-25",
                item.value === opt
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600 hover:bg-blue-50",
              )}
              onClick={() => onUpdate({ value: opt })}
            >
              {opt}
            </button>
          ))}
        </div>
      );
  }
}

function getToggleOptions(id: QualificationId) {
  if (id === "nationality") return ["내국인", "외국인"];
  if (id === "marriage") return ["미혼", "기혼"];
  if (id === "householdHead") return ["세대주", "세대원"];
  if (id === "housing") return ["무주택", "유주택"];
  if (id === "carOwnership") return ["미소유", "소유"];
  return ["해당", "비해당"];
}
