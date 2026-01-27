// 개별 자격 조건 카드 컴포넌트
"use clinet";

import {
  RequirementCardOption,
  RequirementItem,
  RequirementsInputRow,
  TYPE_OPTION,
  type RequirementType,
} from "@/src/features/admin-review-detail";
import { Accordion } from "@/src/shared/ui/arccordion";
import Select from "@/src/shared/ui/select";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface RequirementCardProps {
  item: RequirementItem;
  onUpdate: (u: Partial<RequirementItem>) => void;
  onRemove: () => void;
}

const LABEL_BADGE_STYLE =
  "w-22 text-center py-1.5 bg-slate-200 text-slate-500 text-[11px] font-bold rounded-md uppercase shrink-0";

export function RequirementCard({
  item,
  onUpdate,
  onRemove,
}: RequirementCardProps) {
  const [isOpen, setIsOpen] = useState(!!item.isNew);
  const { isNew, type, title, value, question, description, options } = item;
  const isSelectType = type === "SELECT_SINGLE" || type === "SELECT_MULTI";

  return (
    <div className="p-6 bg-gray-50 rounded-xl space-y-3 relative border border-transparent hover:border-slate-200 transition-all">
      <div>
        {isNew && (
          <span className="px-4 py-2 bg-gray-600 rounded-sm text-white font-semibold">
            신규 조건 입력하기
          </span>
        )}
        <div
          role="button"
          onClick={onRemove}
          className="absolute top-6 right-3 text-slate-300 hover:text-red-500 transition-colors"
        >
          <Trash2 size={18} />
        </div>
      </div>

      <div className="space-y-3 pr-8">
        <RequirementsInputRow
          label="title"
          value={title}
          onChange={(v) => onUpdate({ title: v })}
          placeholder="내용을 입력해주세요"
          disabled={!isNew}
        />
        <RequirementsInputRow
          label="value"
          value={value}
          onChange={(v) => onUpdate({ value: v })}
          placeholder="내용을 입력해주세요"
          isBold
          required={isSelectType}
        />

        <Accordion
          title="추가 온보딩 질문 작성"
          isOpen={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
          className="border-0 bg-gray-50!"
          btnClassName="p-0 border-0 py-2 bg-gray-50!"
          childrenClassName="bg-gray-50 p-0"
        >
          <div className="space-y-3">
            <RequirementsInputRow
              label="question"
              value={question}
              onChange={(v) => onUpdate({ question: v })}
              placeholder="내용을 입력해주세요"
              disabled={!isNew}
            />
            <RequirementsInputRow
              label="description"
              value={description}
              onChange={(v) => onUpdate({ description: v })}
              placeholder="내용을 입력해주세요"
              disabled={!isNew}
            />
            {/* Type 선택 영역 */}
            <div className="flex items-center gap-4">
              <div className={LABEL_BADGE_STYLE}>type</div>
              <Select
                className="border-slate-200 font-bold text-slate-700 rounded-xl"
                value={type}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  onUpdate({ type: e.target.value as RequirementType })
                }
                disabled={!isNew}
                options={TYPE_OPTION}
              />
            </div>

            {/* Select 타입 옵션 관리 */}
            {isSelectType && (
              <RequirementCardOption
                type={type}
                options={options || []}
                onUpdate={(options) => onUpdate({ options })}
                labelBadgeStyle={LABEL_BADGE_STYLE}
              />
            )}
          </div>
        </Accordion>
      </div>
    </div>
  );
}
