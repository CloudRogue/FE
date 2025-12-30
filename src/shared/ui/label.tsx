import * as React from "react";
import cn from "@/src/shared/lib/cn";

export type LabelProps = {
  htmlFor: string;
  children: React.ReactNode;
  hidden?: boolean;
  className?: string;
};

export default function Label({
  htmlFor,
  children,
  hidden = false,
  className,
}: LabelProps) {
  return (
    <label htmlFor={htmlFor} className={cn(hidden && "sr-only", className)}>
      {children}
    </label>
  );
}

// TODO 디자인 도입 후 컬러, 사이즈 추가 예정
