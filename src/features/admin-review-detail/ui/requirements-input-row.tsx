// 개별 자격 조건 인풋 행

import cn from "@/src/shared/lib/cn";
import Input from "@/src/shared/ui/input";
import { memo } from "react";

interface RequirementsInputRowProps {
  label: "title" | "question" | "description" | "value";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isBold?: boolean;
  disabled?: boolean;
}

export const RequirementsInputRow = memo(
  ({
    label,
    value,
    onChange,
    placeholder,
    isBold,
    disabled,
  }: RequirementsInputRowProps) => {
    return (
      <div className="flex items-center gap-4">
        <div className="w-22 text-center py-1.5 bg-slate-200 text-slate-500 text-[11px] font-bold rounded-md uppercase shrink-0">
          {label}
        </div>
        <Input
          className={cn(
            " p-2 border border-slate-200 rounded-xl focus:ring-2 flex-1 bg-white h-10",
            isBold && "font-bold text-slate-800",
            disabled && "bg-slate-50 text-slate-400 cursor-not-allowed",
          )}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>
    );
  },
);

RequirementsInputRow.displayName = "RequirementsInputRow";
