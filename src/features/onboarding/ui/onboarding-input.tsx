"use client";

import * as React from "react";
import cn from "@/src/shared/lib/cn";

export type OnboardingInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  wrapperClassName?: string;
};

const OnboardingInput = React.forwardRef<
  HTMLInputElement,
  OnboardingInputProps
>(({ className, wrapperClassName, type = "text", ...rest }, ref) => {
  return (
    <div
      className={cn(
        "flex w-full items-center",
        "h-14 px-4",
        "rounded-md border border-gray-100 bg-gray-white",
        "shadow-button",
        wrapperClassName,
      )}
    >
      <input
        ref={ref}
        type={type}
        autoComplete="off"
        className={cn(
          "h-full w-full",
          "border-0 bg-transparent p-0 outline-none",
          "text-body1 text-gray-black placeholder:text-gray-200",
          className,
        )}
        {...rest}
      />
    </div>
  );
});

OnboardingInput.displayName = "OnboardingInput";
export default OnboardingInput;
