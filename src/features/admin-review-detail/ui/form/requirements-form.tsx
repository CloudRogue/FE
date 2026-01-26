// 자격 정보 섹션
"use client";

import {
  RequirementCard,
  RequirementItem,
  useAdminFormStore,
} from "@/src/features/admin-review-detail";
import Button from "@/src/shared/ui/button";
import { Plus } from "lucide-react";
import { useCallback } from "react";

export function RquirementsForm() {
  const { formData, addItem, removeItem, updateSection, qualificationPool } =
    useAdminFormStore();
  const { requirements } = formData;

  const handleUpdate = useCallback(
    (index: number, updates: Partial<RequirementItem>) => {
      const updated = [...requirements];
      updated[index] = { ...updated[index], ...updates };
      updateSection("requirements", updated);
    },
    [requirements, updateSection],
  );

  const handleSelectPoolItem = (item: RequirementItem) => {
    if (
      requirements.some(
        (r) => r.additionalOnboardingId === item.additionalOnboardingId,
      )
    )
      return;
    addItem("requirements", { ...item });
  };

  const handleAddNew = () => {
    addItem("requirements", {
      additionalOnboardingId: "",
      title: "",
      question: "",
      description: "",
      value: "",
      type: "TEXT_INPUT",
      isNew: true,
    });
  };

  return (
    <section className="bg-white border border-slate-100 rounded-2xl p-8 space-y-8">
      <div className="flex flex-col">
        <h2 className="text-[18px] font-bold text-slate-800">자격 조건</h2>
        <p>필수 조건의 경우에는 value만 입력 가능합니다</p>
      </div>

      {/* 입력 폼 리스트 */}
      <div className="space-y-6">
        {requirements.length === 0 ? (
          <div className="py-10 text-center border-2 border-dashed border-slate-100 rounded-2xl text-slate-300">
            등록된 자격 조건이 없습니다. 아래 리스트에서 선택하거나 신규 조건을
            추가하세요.
          </div>
        ) : (
          requirements.map((req, idx) => (
            <RequirementCard
              key={req.additionalOnboardingId || `new-item-${idx}`}
              item={req}
              onUpdate={(updates) => handleUpdate(idx, updates)}
              onRemove={() =>
                removeItem("requirements", req.additionalOnboardingId)
              }
            />
          ))
        )}
      </div>

      {/* 하단 풀 리스트 */}
      <div className="pt-6 border-t border-slate-100">
        <p className="text-sm font-bold text-slate-400 mb-4">
          자격 조건 리스트
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={handleAddNew}
            className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all"
          >
            <Plus size={16} /> 신규 조건
          </Button>

          {qualificationPool?.map((item, idx) => {
            const isSelected = requirements.some(
              (r) => r.additionalOnboardingId === item.additionalOnboardingId,
            );
            return (
              <Button
                key={`${item.additionalOnboardingId}-${idx}`}
                disabled={isSelected}
                onClick={() => handleSelectPoolItem(item)}
                variant="secondary"
              >
                {item.title}
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
