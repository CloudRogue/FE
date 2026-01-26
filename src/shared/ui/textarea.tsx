import Field from "@/src/shared/ui/field";
import Label from "@/src/shared/ui/label";
import React, { useId } from "react";

interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  containerClassName?: string;
  helperText?: string;
}

export function TextArea({
  label,
  containerClassName,
  helperText,
  maxLength,
  value = "",
  onChange,
  required,
  ...props
}: TextAreaFieldProps) {
  const generatedId = useId();
  const id = props.id || generatedId;
  const descriptionId = `${id}-description`;

  const currentLength = String(value).length;
  const isMaxedOut = maxLength ? currentLength >= maxLength : false;

  return (
    <Field className={`flex flex-col gap-2 ${containerClassName || ""}`}>
      <Label
        htmlFor={id}
        className="text-sm font-bold text-slate-600 flex items-center gap-1"
      >
        {label}
        {required && (
          <span className="text-red-500" aria-label="필수 입력 항목">
            *
          </span>
        )}
      </Label>

      <div className="relative group">
        <textarea
          {...props}
          id={id}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          required={required}
          aria-describedby={maxLength ? descriptionId : undefined}
          className={`
            w-full h-40 p-4 border border-slate-200 rounded-xl text-[14px] leading-relaxed 
            focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all
            ${isMaxedOut ? "border-amber-400" : "hover:border-slate-300"}
          `}
        />

        {/* 글자 수 표시 섹션 */}
        {maxLength && (
          <div
            id={descriptionId}
            className="absolute bottom-4 right-4 text-xs text-slate-400 pointer-events-none"
            aria-live="polite"
          >
            <b className={isMaxedOut ? "text-red-500" : "text-slate-600"}>
              {currentLength}
            </b>
            <span aria-hidden="true">/{maxLength}자</span>
            <span className="sr-only">
              최대 글자 수 {maxLength}자 중 현재 {currentLength}자 입력됨
            </span>
          </div>
        )}
      </div>

      {helperText && (
        <p className="text-xs text-slate-500 ml-1">{helperText}</p>
      )}
    </Field>
  );
}
