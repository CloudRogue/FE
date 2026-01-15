import {
  RequirementCard,
  RequirementItem,
  useAdminFormStore,
} from "@/src/features/admin-review-detail";
import Button from "@/src/shared/ui/button";
import { Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const mockPool: RequirementItem[] = [
  {
    id: "90001",
    title: "생년월일",
    question: "생년월일을 알려주세요",
    description: "특정 나이 대에만 지원할 수 있는 공고가 있어요",
    value: "",
    type: "number_input",
    isRequired: true,
  },
  {
    id: "90002",
    title: "차량 소유",
    question: "차량 소유 여부를 알려주세요",
    description: "차량 무소유 시에만 지원 가능한 공고가 있어요",
    value: "",
    type: "select_single",
    options: ["무소유", "유소유"],
    isRequired: false,
  },
];

export function DetailFormrRquirements() {
  const { formData, addItem, removeItem, updateSection } = useAdminFormStore();
  const { requirements } = formData;
  const [qualificationPool, setQualificationPool] = useState<RequirementItem[]>(
    [],
  );

  useEffect(() => {
    setQualificationPool(mockPool);

    // 필수 항목(isRequired) 자동 추가
    mockPool.forEach((item) => {
      if (item.isRequired && !requirements.some((r) => r.id === item.id)) {
        addItem("requirements", item);
      }
    });
  }, []);

  const handleSelectPoolItem = (item: RequirementItem) => {
    if (requirements.some((r) => r.id === item.id)) return;
    addItem("requirements", { ...item });
  };

  const handleUpdate = useCallback(
    (id: string, updates: Partial<RequirementItem>) => {
      updateSection(
        "requirements",
        requirements.map((r) => (r.id === id ? { ...r, ...updates } : r)),
      );
    },
    [requirements, updateSection],
  );

  const handleAddNew = () => {
    const newId = `custom-${Date.now()}`;
    addItem("requirements", {
      id: newId,
      title: "",
      question: "",
      description: "",
      value: "",
      type: "text_input",
      isNew: true,
    });
  };

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-8 space-y-8 shadow-sm">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold text-slate-800">자격 조건</h2>
        <p>필수 조건의 경우에는 value만 입력 가능합니다</p>
      </div>

      {/* 입력 폼 리스트 */}
      <div className="space-y-6">
        {requirements.map((req) => (
          <RequirementCard
            key={req.id}
            item={req}
            onUpdate={(updates) => handleUpdate(req.id, updates)}
            onRemove={() => removeItem("requirements", req.id)}
          />
        ))}
      </div>

      {/* 하단 풀 리스트 */}
      <div className="pt-6 border-t border-slate-100">
        <p className="text-xs font-bold text-slate-400 mb-4">
          자격 조건 리스트
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={handleAddNew}
            className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all"
          >
            <Plus size={16} /> 신규 조건
          </Button>
          {qualificationPool.map((item) => (
            <Button
              key={item.id}
              disabled={requirements.some((r) => r.id === item.id)}
              onClick={() => handleSelectPoolItem(item)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 disabled:bg-slate-100 disabled:text-slate-400 hover:border-blue-400 hover:text-blue-600 transition-all"
            >
              {item.title}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
