// 자격 조건 select 전용 option 컴포넌트
"use clinet";

import Button from "@/src/shared/ui/button";
import Input from "@/src/shared/ui/input";
import { X } from "lucide-react";
import { useRef } from "react";

interface RequirementCardOptionProps {
  type: "SELECT_SINGLE" | "SELECT_MULTI";
  options: string[];
  onUpdate: (options: string[]) => void;
  labelBadgeStyle: string;
}

export function RequirementCardOption({
  type,
  options,
  onUpdate,
  labelBadgeStyle,
}: RequirementCardOptionProps) {
  const optionInputRef = useRef<HTMLInputElement>(null);

  const isSingle = type === "SELECT_SINGLE";
  const canAdd = isSingle ? options.length < 1 : true;

  const handleAdd = () => {
    const val = optionInputRef.current?.value.trim();
    if (!val) return;
    if (isSingle && options.length >= 1) {
      alert("단일 선택 타입은 옵션을 1개만 등록할 수 있습니다.");
      return;
    }
    if (!options.includes(val)) {
      onUpdate([...options, val]);
      if (optionInputRef.current) optionInputRef.current.value = "";
    }
  };

  const handleRemove = (index: number) => {
    onUpdate(options.filter((_, i) => i !== index));
  };

  return (
    <div className="flex items-start gap-4 pt-1">
      <div className={`${labelBadgeStyle} mt-2`}>option</div>
      <div className="flex-1 space-y-3">
        <div className="flex gap-2">
          <Input
            ref={optionInputRef}
            className="p-2 border border-slate-200 rounded-xl focus:ring-2 flex-1 bg-white h-10"
            placeholder={
              isSingle && options.length >= 1
                ? "이미 옵션이 등록되었습니다"
                : "옵션을 입력하세요"
            }
            disabled={isSingle && options.length >= 1}
            onKeyDown={(e) =>
              e.key === "Enter" && (e.preventDefault(), handleAdd())
            }
          />
          <Button
            onClick={handleAdd}
            disabled={isSingle && options.length >= 1}
            className={`px-4 text-white rounded-xl text-xs font-bold shrink-0 ${
              isSingle && options.length >= 1 ? "bg-slate-300" : "bg-blue-600"
            }`}
          >
            추가
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {options.map((opt, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 px-3 py-1 bg-white border border-blue-200 text-blue-600 rounded-lg text-xs font-bold"
            >
              {opt}
              <Button onClick={() => handleRemove(i)} className="p-1 h-5">
                <X size={12} />
              </Button>
            </div>
          ))}

          {isSingle
            ? options.length === 0 && (
                <p className="text-[11px] text-red-400 font-medium">
                  * 단일 선택을 위한 옵션을 1개 등록해주세요.
                </p>
              )
            : options.length < 2 && (
                <p className="text-[11px] text-red-400 font-medium">
                  * 다중 선택 옵션은 2개 이상 작성해야 함
                </p>
              )}
        </div>
      </div>
    </div>
  );
}
