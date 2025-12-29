// Client Component

"use client";

import React, { forwardRef } from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

const ButtonBase = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { type = "button", className, children, isLoading, disabled, ...rest },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={className}
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

ButtonBase.displayName = "ButtonBase";
export default ButtonBase;
