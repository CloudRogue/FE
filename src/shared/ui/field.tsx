import React from "react";
import cn from "@/src/shared/lib/cn";

export type FieldProps = React.HTMLAttributes<HTMLDivElement>;

export default function Field({ className, children, ...rest }: FieldProps) {
  return (
    <div className={cn(className)} {...rest}>
      {children}
    </div>
  );
}

// TODO 디자인 도입 후 컬러, 사이즈 추가 예정
