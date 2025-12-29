import * as React from "react";
import cn from "@/src/shared/lib/cn";

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options?: SelectOption[];
  placeholder?: string;
};

export default function Select({
  label,
  id,
  name,
  options,
  children,
  placeholder,
  disabled,
  className,
  ...rest
}: SelectProps) {
  const selectId = id ?? name;
  const hasChildren = React.Children.count(children) > 0;

  return (
    <div className="flex flex-col gap-2">
      {label && selectId ? (
        <label htmlFor={selectId} className="text-sm">
          {label}
        </label>
      ) : null}

      <select
        id={selectId}
        name={name}
        disabled={disabled}
        className={cn(
          "h-10 w-full rounded-md border px-3 text-sm",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
        {...rest}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}

        {hasChildren
          ? children
          : options?.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
      </select>
    </div>
  );
}

// TODO 디자인 도입 시 변경 예정
