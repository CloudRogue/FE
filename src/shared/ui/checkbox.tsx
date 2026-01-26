"use client";

import cn from "@/src/shared/lib/cn";
import { Check } from "lucide-react";
import React, { forwardRef } from "react";

export interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: string;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const generatedId = React.useId();
    const checkboxId = id || generatedId;

    return (
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2 group">
          <input
            type="checkbox"
            ref={ref}
            id={checkboxId}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              "h-6 w-6 rounded-full bg-gray-100 transition-all cursor-pointer",
              "flex items-center justify-center shrink-0",
              // 체크 상태
              "peer-checked:bg-primary-blue",
              "peer-disabled:cursor-not-allowed peer-disabled:bg-gray-100",

              className,
            )}
          >
            <Check
              size={14}
              strokeWidth={2}
              className={cn(
                "text-white transition-opacity",
                props.checked ? "opacity-100" : "opacity-0",
              )}
            />
          </div>
          {label && (
            <label
              htmlFor={checkboxId}
              className="cursor-pointer text-sm font-medium text-gray-700 select-none disabled:cursor-not-allowed disabled:text-gray-400"
            >
              {label}
            </label>
          )}
        </div>

        {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
