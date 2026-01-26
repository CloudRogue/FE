// detail 기본 필드 및 인풋 필드

import cn from "@/src/shared/lib/cn";
import Field from "@/src/shared/ui/field";
import Input from "@/src/shared/ui/input";
import Label from "@/src/shared/ui/label";
import { InputHTMLAttributes } from "react";

interface DetailFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  disabled?: boolean;
  children?: React.ReactNode;
  containerClassName?: string;
  className?: string;
}

export function DetailField({
  label,
  disabled,
  children,
  containerClassName,
  className,
  ...props
}: DetailFieldProps) {
  return (
    <Field className={cn("flex flex-col gap-2", containerClassName)}>
      <Label htmlFor={label} className="text-sm font-bold text-slate-600">
        {label}
        {props.required && (
          <span className="ml-1 text-red-500" aria-label="필수 입력 항목">
            *
          </span>
        )}
      </Label>
      {children ? (
        <span className="w-full rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-[15px]">
          {children}
        </span>
      ) : (
        <Input
          {...props}
          disabled={disabled}
          className={cn(
            "w-full p-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-[15px]",
            disabled && "bg-slate-100 text-slate-400 cursor-not-allowed",
            className,
          )}
        />
      )}
    </Field>
  );
}
