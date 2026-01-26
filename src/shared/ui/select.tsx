"use client";

import * as React from "react";
import cn from "@/src/shared/lib/cn";

import ArrowDownIcon from "@/src/shared/ui/icons/arroaw/down.svg";
import ArrowUpIcon from "@/src/shared/ui/icons/arroaw/up.svg";

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectProps = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "onChange"
> & {
  label?: string;
  options?: SelectOption[];
  placeholder?: string;
  onValueChange?: (value: string) => void;
  onChange?: React.SelectHTMLAttributes<HTMLSelectElement>["onChange"];
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
  onChange,
  onValueChange,
  ...rest
}: SelectProps) {
  const reactId = React.useId();
  const selectId = id ?? reactId;
  const hasChildren = React.Children.count(children) > 0;

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-2">
      {label ? (
        <label htmlFor={selectId} className="text-body2 text-gray-700">
          {label}
        </label>
      ) : null}

      <div className="relative">
        <select
          id={selectId}
          name={name}
          disabled={disabled}
          className={cn(
            "h-12 w-full",
            "px-4 pr-10",
            "rounded-sm",
            "border border-gray-200",
            "bg-gray-white text-gray-black",
            "text-body2",
            "focus:outline-none ",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "appearance-none",
            className,
          )}
          onMouseDown={() => {
            if (disabled) return;
            setIsOpen(true);
          }}
          onBlur={() => {
            setIsOpen(false);
          }}
          onChange={(e) => {
            onChange?.(e);
            onValueChange?.(e.target.value);
            setIsOpen(false);
          }}
          {...rest}
        >
          {placeholder ? (
            <option value="" disabled hidden>
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

        {isOpen ? (
          <ArrowUpIcon
            className={cn(
              "pointer-events-none absolute right-4 top-1/2 -translate-y-1/2",
              "h-5 w-5",
              disabled && "opacity-50",
            )}
          />
        ) : (
          <ArrowDownIcon
            className={cn(
              "pointer-events-none absolute right-4 top-1/2 -translate-y-1/2",
              "h-5 w-5",
              disabled && "opacity-50",
            )}
          />
        )}
      </div>
    </div>
  );
}
