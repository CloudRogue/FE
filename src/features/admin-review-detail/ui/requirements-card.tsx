import {
  RequirementFieldSelector,
  RequirementItem,
} from "@/src/features/admin-review-detail";
import { Trash2 } from "lucide-react";

// 개별 자격 조건 카드 컴포넌트
interface RequirementCardProps {
  item: RequirementItem;
  onUpdate: (updates: Partial<RequirementItem>) => void;
  onRemove: () => void;
}

export function RequirementCard({
  item,
  onUpdate,
  onRemove,
}: RequirementCardProps) {
  return (
    <div className="p-4 bg-white border border-slate-100 rounded-2xl relative shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm font-bold text-slate-600">{item.label}</span>
        <button
          onClick={onRemove}
          className="text-slate-300 hover:text-red-500 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="min-h-10 flex items-center">
        <RequirementFieldSelector item={item} onUpdate={onUpdate} />
      </div>
    </div>
  );
}
