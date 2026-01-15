// detail 기본 필드 및 인풋 필드

import cn from "@/src/shared/lib/cn";
import Field from "@/src/shared/ui/field";
import Input from "@/src/shared/ui/input";
import Label from "@/src/shared/ui/label";
import { InputHTMLAttributes } from "react";

interface DetailFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  children?: React.ReactNode;
  containerClassName?: string;
  className?: string;
}

export function DetailField({
  label,
  children,
  containerClassName,
  className,
  ...props
}: DetailFieldProps) {
  return (
    <Field className={cn("flex flex-col gap-2", containerClassName)}>
      <Label htmlFor={label} className="text-sm font-bold text-slate-600">
        {label}
      </Label>
      {children ? (
        <span className="w-full p-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-[15px]">
          {children}
        </span>
      ) : (
        <Input
          {...props}
          className={cn(
            "w-full p-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-[15px]",
            className,
          )}
        />
      )}
    </Field>
  );
}
