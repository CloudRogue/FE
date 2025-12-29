import * as React from "react";
import cn from "@/src/shared/lib/cn";

type NoEventAttrs = Omit<
  React.ComponentProps<"input">,
  keyof React.DOMAttributes<HTMLInputElement>
>;

export type InputProps = NoEventAttrs & {
  className?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...rest }, ref) => {
    return <input ref={ref} className={cn(className)} {...rest} />;
  },
);

Input.displayName = "Input";

export default Input;

// TODO 디자인 도입 후 컬러, 사이즈 추가 예정
