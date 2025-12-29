import React from "react";

export type FieldProps = React.HTMLAttributes<HTMLDivElement>;

export default function Field({ className, children, ...rest }: FieldProps) {
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
}

// TODO 디자인 도입 후 컬러, 사이즈 추가 예정
