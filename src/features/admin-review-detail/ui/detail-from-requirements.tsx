import {
  ADD_QUALIFICATION_OPTIONS,
  DEFAULT_DATA_MAP,
  QualificationId,
  RequirementCard,
  RequirementItem,
  useAdminFormStore,
} from "@/src/features/admin-review-detail";
import cn from "@/src/shared/lib/cn";
import { Plus } from "lucide-react";

export function DetailFormrRquirements() {
  const { formData, addItem, removeItem, updateSection } = useAdminFormStore();
  const { requirements } = formData;

  const isAlreadyAdded = (id: QualificationId) =>
    requirements.some((req) => req.id === id);

  const handleAddRequirement = (
    option: (typeof ADD_QUALIFICATION_OPTIONS)[number],
  ) => {
    const qualificationId = option.id as QualificationId;

    if (isAlreadyAdded(qualificationId)) return;

    const defaultExtra = DEFAULT_DATA_MAP[qualificationId] || { isBlank: true };
    const newRequirement: RequirementItem = {
      id: qualificationId,
      label: option.label,
      ...defaultExtra,
    };

    addItem("requirements", newRequirement);
  };

  // 개별 값 업데이트
  const handleUpdate = (
    id: QualificationId,
    updates: Partial<RequirementItem>,
  ) => {
    const updated = requirements.map((req) =>
      req.id === id ? { ...req, ...updates } : req,
    );
    updateSection("requirements", updated);
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-8 space-y-8 mb-5">
      <h2 className="text-[18px] font-bold text-slate-800">
        필수 지원 자격 조건
      </h2>

      {/* 조건 리스트 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {requirements.map((req) => (
          <RequirementCard
            key={req.id}
            item={req}
            onUpdate={(updates) => handleUpdate(req.id, updates)}
            onRemove={() => removeItem("requirements", req.id)}
          />
        ))}
      </div>

      {/* 추가 버튼 섹션 */}
      <div className="pt-6 border-t border-slate-100">
        <p className="text-xs font-bold text-slate-500 mb-3">자격 조건 추가</p>
        <div className="flex flex-wrap gap-2">
          {ADD_QUALIFICATION_OPTIONS.map((option) => {
            const added = isAlreadyAdded(option.id);
            return (
              <button
                key={option.id}
                type="button"
                disabled={added}
                onClick={() => handleAddRequirement(option)}
                className={cn(
                  "flex items-center gap-1 px-3 py-2 rounded-lg border text-xs font-bold transition-all",
                  added
                    ? "bg-slate-50 border-slate-200 text-slate-300 cursor-not-allowed"
                    : "bg-white border-slate-200 text-slate-500 hover:border-blue-400 hover:text-blue-500",
                )}
              >
                <Plus
                  size={14}
                  className={added ? "text-slate-300" : "text-slate-400"}
                />
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
