// 개별 자격 조건 카드 컴포넌트

import {
  DetailInputRow,
  RequirementItem,
  type RequirementType,
} from "@/src/features/admin-review-detail";
import Button from "@/src/shared/ui/button";
import Input from "@/src/shared/ui/input";
import Select from "@/src/shared/ui/select";
import { Trash2, X } from "lucide-react";
import { useRef } from "react";

interface RequirementCardProps {
  item: RequirementItem;
  onUpdate: (u: Partial<RequirementItem>) => void;
  onRemove: () => void;
}

export function RequirementCard({
  item,
  onUpdate,
  onRemove,
}: RequirementCardProps) {
  const isSelectType =
    item.type === "select_single" || item.type === "select_multi";

  const optionInputRef = useRef<HTMLInputElement>(null);

  const handleAddOption = () => {
    if (!optionInputRef.current) return;

    const val = optionInputRef.current.value.trim();
    if (val) {
      onUpdate({ options: [...(item.options || []), val] });
      optionInputRef.current.value = "";
      optionInputRef.current.focus();
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-2xl space-y-3 relative border border-transparent hover:border-slate-200 transition-all">
      <Button
        onClick={onRemove}
        className="absolute top-6 right-6 text-slate-300 hover:text-red-500 transition-colors"
      >
        <Trash2 size={18} />
      </Button>

      <div className="space-y-3 pr-8">
        <DetailInputRow
          label="title"
          value={item.title}
          onChange={(v) => onUpdate({ title: v })}
          placeholder="내용을 입력해주세요"
          disabled={!item.isNew}
        />
        <DetailInputRow
          label="question"
          value={item.question}
          onChange={(v) => onUpdate({ question: v })}
          placeholder="내용을 입력해주세요"
          disabled={!item.isNew}
        />
        <DetailInputRow
          label="description"
          value={item.description}
          onChange={(v) => onUpdate({ description: v })}
          placeholder="내용을 입력해주세요"
          disabled={!item.isNew}
        />
        <DetailInputRow
          label="value"
          value={item.value}
          onChange={(v) => onUpdate({ value: v })}
          placeholder="내용을 입력해주세요"
          isBold
        />

        {/* Type 선택 영역 */}
        <div className="flex items-center gap-4">
          <div className="w-20 text-center py-1.5 bg-slate-200 text-slate-500 text-[11px] font-bold rounded-md uppercase shrink-0">
            type
          </div>
          <Select
            className="border-slate-200 font-bold text-slate-700 rounded-xl"
            value={item.type}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              onUpdate({ type: e.target.value as RequirementType })
            }
            disabled={!item.isNew}
            options={[
              { value: "boolean", label: "boolean" },
              { value: "text_input", label: "text_input" },
              { value: "number_input", label: "number_input" },
              { value: "select_single", label: "select_single" },
              { value: "select_multi", label: "select_multi" },
            ]}
          />
        </div>

        {/* Select 타입 옵션 관리 */}
        {isSelectType && (
          <div className="flex items-start gap-4 pt-1">
            <div className="w-20 text-center py-1.5 bg-slate-200 text-slate-500 text-[11px] font-bold rounded-md uppercase shrink-0 mt-2">
              option
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex gap-2">
                <Input
                  ref={optionInputRef}
                  className="p-2 border border-slate-200 rounded-xl focus:ring-2 flex-1 bg-white h-10"
                  placeholder="옵션을 입력하세요"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddOption();
                    }
                  }}
                />
                <Button
                  onClick={handleAddOption}
                  className="px-4 bg-blue-600 text-white rounded-xl text-xs font-bold shrink-0"
                >
                  추가
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {item.options?.map((opt, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 px-3 py-1 bg-white border border-blue-200 text-blue-600 rounded-lg text-xs font-bold"
                  >
                    {opt}
                    <Button
                      onClick={() =>
                        onUpdate({
                          options: item.options?.filter((_, idx) => idx !== i),
                        })
                      }
                      className="p-1 h-5"
                    >
                      <X size={12} />
                    </Button>
                  </div>
                ))}
                {(item.options?.length || 0) < 2 && (
                  <p className="text-[11px] text-red-400 font-medium">
                    * 옵션은 2개 이상 작성해야 함
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
