"use client";

import Input from "@/src/shared/ui/input";

type InputStepProps = {
  value?: string | number;
  inputType: "text" | "number" | "date";
  placeholder?: string;
  onChange: (value: string | number) => void;
};

export default function InputStep({
  value,
  inputType,
  placeholder,
  onChange,
}: InputStepProps) {
  return (
    <Input
      type={inputType}
      value={value ?? ""}
      placeholder={placeholder}
      className="h-12 w-full rounded-xl border border-slate-200 bg-transparent px-4 text-black placeholder:text-slate-500"
      onChange={(e) => {
        if (inputType !== "number") return onChange(e.target.value);
        return onChange(e.target.value === "" ? "" : Number(e.target.value));
      }}
    />
  );
}
