"use client";

import cn from "@/src/shared/lib/cn";
import React, { forwardRef } from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

const variants = {
  default: "",
  outline: "",
  ghost: "",
};

const sizes = {
  default: "h-10 px-4 py-2",
  sm: "h-9 px-3",
  lg: "h-11 px-8",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = "button",
      className,
      children,
      isLoading,
      disabled,
      variant = "default",
      size = "default",
      ...rest
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className,
        )}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        aria-live={isLoading ? "polite" : "off"}
        {...rest}
      >
        {isLoading ? <span className="sr-only">로딩 중...</span> : children}
      </button>
    );
  },
);

Button.displayName = "Button";
export default Button;
