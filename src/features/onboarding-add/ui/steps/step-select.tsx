"use client";

import Button from "@/src/shared/ui/button";
import cn from "@/src/shared/lib/cn";

type SelectOption = {
  label: string;
  value: string;
};

type SelectStepProps = {
  value?: string;
  options: SelectOption[];
  onChange: (value: string) => void;
};

export default function SelectStep({
  value,
  options,
  onChange,
}: SelectStepProps) {
  return (
    <div className="flex flex-col gap-4">
      {options.map((option) => {
        const isSelected = option.value === value;

        return (
          <Button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={isSelected}
            className={cn(
              "h-12 w-full rounded-xl border px-4 text-left text-md",
              isSelected
                ? "border-slate-900 bg-white text-slate-900"
                : "border-slate-200 bg-slate-50 text-slate-500",
            )}
          >
            {option.label}
          </Button>
        );
      })}
    </div>
  );
}
