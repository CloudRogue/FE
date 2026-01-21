"use client";

import cn from "@/src/shared/lib/cn";
import React, { forwardRef } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary_blue"
  | "tertiary_black"
  | "tertiary_gray";
export type ButtonSize = "lg" | "md" | "sm";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary: cn(
    "px-3  bg-primary-blue !text-white font-semibold shadow-button",
    "border border-border-primary",
    "hover:opacity-90 hover:shadow-button-hover",
    "disabled:bg-gray-100 disabled:text-gray-200 disabled:border-none disabled:shadow-none",
  ),
  secondary: cn(
    "px-3 bg-gray-50 text-gray-700 font-semibold shadow-button",
    "border border-border-secondary",
    "hover:bg-gray-100 hover:shadow-button-hover",
    "disabled:bg-gray-bg disabled:text-gray-100 disabled:border-gray-100",
  ),
  tertiary_blue: "text-primary-blue bg-transparent p-0 h-auto underline", // 링크형
  tertiary_black: "text-gray-black bg-transparent p-0 h-auto underline", // 링크형
  tertiary_gray: "text-gray-400 bg-transparent p-0 h-auto underline", // 링크형
};

const sizes: Record<ButtonSize, string> = {
  lg: "h-[52px] text-center text-h3 rounded-md", // h: 52
  md: "h-[44px] text-center text-body1 rounded-sm", // h: 44
  sm: "h-[36px] text-center text-h5 rounded-sm", // h: 36
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = "button",
      className,
      children,
      isLoading,
      disabled,
      variant = "primary",
      size = "md",
      leftIcon,
      rightIcon,
      ...rest
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
          variants[variant as ButtonVariant],
          sizes[size],
          className,
        )}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        aria-live={isLoading ? "polite" : "off"}
        {...rest}
      >
        {isLoading ? (
          <span className="animate-spin text-current">...</span>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
export default Button;
