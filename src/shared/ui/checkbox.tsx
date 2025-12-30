"use client";

import React, { forwardRef } from "react";
import cn from "@/src/shared/lib/cn";

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
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            ref={ref}
            id={checkboxId}
            className={cn(
              "h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-red-500 focus:ring-red-500",
              className,
            )}
            {...props}
          />

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
