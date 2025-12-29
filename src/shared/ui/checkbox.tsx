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
          <div className="relative flex items-center">
            <input
              type="checkbox"
              ref={ref}
              id={checkboxId}
              className={cn(
                "peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 bg-white transition-all",
                "checked:border-green-600 checked:bg-green-600",
                "focus:outline-none focus:ring-2 focus:ring-green-500/20",
                "disabled:cursor-not-allowed disabled:bg-gray-100",
                error && "border-red-500 focus:ring-red-500/20",
                className,
              )}
              {...props}
            />
            <svg
              className="pointer-events-none absolute h-3.5 w-3.5 left-0.5.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          {label && (
            <label
              htmlFor={checkboxId}
              className="cursor-pointer text-sm font-medium text-gray-700 select-none disabled:text-gray-400"
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
