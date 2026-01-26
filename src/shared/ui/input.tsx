"use client";

import cn from "@/src/shared/lib/cn";
import * as React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  useUnit?: string;
  className?: string;
  wrapperClassName?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ useUnit, className, wrapperClassName, type = "text", ...rest }, ref) => {
    return (
      <div
        className={cn("relative flex items-center w-full", wrapperClassName)}
      >
        <input
          ref={ref}
          type={type}
          autoComplete="off"
          className={cn(
            "w-full p-4 pr-12 text-body1 outline-none transition-all",
            "bg-white border border-gray-100 rounded-md shadow-card",
            "focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/20",
            "placeholder:text-gray-200",
            className,
            useUnit ? "pr-12" : "pr-4",
          )}
          {...rest}
        />

        {/* 단위 노출 영역 */}
        {useUnit && (
          <span className="absolute right-4 text-body1 font-semibold text-gray-700 pointer-events-none">
            {useUnit}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
