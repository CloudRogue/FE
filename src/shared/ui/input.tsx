"use client";

import cn from "@/src/shared/lib/cn";
import * as React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...rest }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        autoComplete="one-time-code"
        className={cn(className)}
        {...rest}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;

// TODO 디자인 도입 후 컬러, 사이즈 추가 예정
