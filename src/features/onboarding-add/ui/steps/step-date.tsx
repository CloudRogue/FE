"use client";

import { useMemo } from "react";

import Input from "@/src/shared/ui/input";
import Label from "@/src/shared/ui/label";

type DateStepProps = {
  value?: string; // "YYYY-MM-DD"
  onChange: (value: string) => void;
};

const onlyDigits = (v: string) => v.replace(/\D/g, "");
const clamp = (v: string, max: number) => v.slice(0, max);

function splitDate(value?: string) {
  if (!value) return { y: "", m: "", d: "" };
  const [y = "", m = "", d = ""] = value.split("-");
  return { y, m, d };
}

export default function DateStep({ value, onChange }: DateStepProps) {
  const parts = useMemo(() => splitDate(value), [value]);

  const commit = (y: string, m: string, d: string) => {
    const next = [y, m, d].filter((x) => x.length > 0).join("-");
    onChange(next);
  };

  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-3">
        <Label htmlFor="add-date-year" hidden>
          연
        </Label>
        <Input
          id="add-date-year"
          inputMode="numeric"
          placeholder="YYYY"
          value={parts.y}
          onChange={(e) => {
            const y = clamp(onlyDigits(e.target.value), 4);
            commit(y, parts.m, parts.d);
          }}
          className="h-12 w-[88px] rounded-xl border border-slate-200 bg-transparent px-3 text-center text-black placeholder:text-slate-400"
        />
        <span className="text-slate-400 text-xl">년</span>
      </div>

      <div className="flex items-center gap-3">
        <Label htmlFor="add-date-month" hidden>
          월
        </Label>
        <Input
          id="add-date-month"
          inputMode="numeric"
          placeholder="MM"
          value={parts.m}
          onChange={(e) => {
            const m = clamp(onlyDigits(e.target.value), 2);
            commit(parts.y, m, parts.d);
          }}
          className="h-12 w-[64px] rounded-xl border border-slate-200 bg-transparent px-3 text-center text-black placeholder:text-slate-400"
        />
        <span className="text-slate-400 text-xl">월</span>
      </div>

      <div className="flex items-center gap-3">
        <Label htmlFor="add-date-day" hidden>
          일
        </Label>
        <Input
          id="add-date-day"
          inputMode="numeric"
          placeholder="DD"
          value={parts.d}
          onChange={(e) => {
            const d = clamp(onlyDigits(e.target.value), 2);
            commit(parts.y, parts.m, d);
          }}
          className="h-12 w-[64px] rounded-xl border border-slate-200 bg-transparent px-3 text-center text-black placeholder:text-slate-400"
        />
        <span className="text-slate-400 text-xl">일</span>
      </div>
    </div>
  );
}
