import Button from "@/src/shared/ui/button";
import Input from "@/src/shared/ui/input";
import { X } from "lucide-react";
import { useRef } from "react";

interface RequirementCardOptionProps {
  options: string[];
  onUpdate: (options: string[]) => void;
  labelBadgeStyle: string;
}

export function RequirementCardOption({
  options,
  onUpdate,
  labelBadgeStyle,
}: RequirementCardOptionProps) {
  const optionInputRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    const val = optionInputRef.current?.value.trim();
    if (val && !options.includes(val)) {
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
            placeholder="옵션을 입력하세요"
            onKeyDown={(e) =>
              e.key === "Enter" && (e.preventDefault(), handleAdd())
            }
          />
          <Button
            onClick={handleAdd}
            className="px-4 bg-blue-600 text-white rounded-xl text-xs font-bold shrink-0"
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
          {(options.length || 0) < 2 && (
            <p className="text-[11px] text-red-400 font-medium">
              * 옵션은 2개 이상 작성해야 함
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
