"use client";

import Select, { type SelectProps } from "./select";

type ClientSelectProps = SelectProps & {
  onValueChange?: (value: string) => void;
};

export default function ClientSelect({
  onValueChange,
  ...props
}: ClientSelectProps) {
  return (
    <Select
      {...props}
      onChange={(e) => {
        onValueChange?.(e.target.value);
      }}
    />
  );
}
