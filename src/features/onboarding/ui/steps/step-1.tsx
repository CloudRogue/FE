"use client";

import { useMemo, useRef, useState } from "react";

import type { OnboardingDraft } from "@/src/features/onboarding";
import { useOnboardingStore } from "@/src/features/onboarding";
import Button from "@/src/shared/ui/button";
import Input from "@/src/shared/ui/input";
import Label from "@/src/shared/ui/label";
import cn from "@/src/shared/lib/cn";

type Gender = NonNullable<OnboardingDraft["gender"]>;

const GENDER_MAP = {
  male: "male",
  female: "female",
} as const satisfies Record<Gender, Gender>;

export default function Step1() {
  const { draft, updateDraft } = useOnboardingStore();

  const [nameValue, setNameValue] = useState(() => draft.name ?? "");
  const isComposingRef = useRef(false);

  const gender = useMemo<Gender | null>(() => {
    const value = draft.gender;
    if (!value) return null;
    return value in GENDER_MAP ? (value as Gender) : null;
  }, [draft.gender]);

  const commitName = (value: string) => {
    const next = value.trim() ? value : undefined;
    updateDraft({ name: next });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    setNameValue(next);

    if (isComposingRef.current) return;
    commitName(next);
  };

  const handleNameCompositionStart = () => {
    isComposingRef.current = true;
  };

  const handleNameCompositionEnd = (
    e: React.CompositionEvent<HTMLInputElement>,
  ) => {
    isComposingRef.current = false;

    const next = e.currentTarget.value;
    setNameValue(next);
    commitName(next);
  };

  const handleNameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (isComposingRef.current) return;
    commitName(e.currentTarget.value);
  };

  const handleGenderSelect = (nextGender: Gender) => {
    updateDraft({ gender: nextGender });
  };

  return (
    <section className="px-0 pb-28 pt-2">
      <header className="space-y-2">
        <h2 className="text-xl font-semibold text-black">
          당신에 대해서 알려주세요
        </h2>
        <p className="text-sm text-slate-400">
          특정 성별만 지원할 수 있는 공고가 있어요
        </p>
      </header>

      <div className="mt-12 flex flex-col gap-[30px]">
        <div className="flex items-center gap-6">
          <Label
            htmlFor="onboarding-name"
            className="w-[88px] shrink-0 text-slate-400"
          >
            내 이름은
          </Label>

          <Input
            id="onboarding-name"
            value={nameValue}
            onChange={handleNameChange}
            onCompositionStart={handleNameCompositionStart}
            onCompositionEnd={handleNameCompositionEnd}
            onBlur={handleNameBlur}
            placeholder="홍길동"
            className="h-12 w-full rounded-xl border border-slate-200 bg-transparent px-4 text-black placeholder:text-slate-500"
          />
        </div>

        <div className="flex items-center gap-6">
          <div className="w-[88px] shrink-0 text-slate-400">내 성별은</div>
          <div className="flex w-full gap-4">
            <Button
              type="button"
              onClick={() => handleGenderSelect("male")}
              className={cn(
                "h-12 flex-1 rounded-xl border text-md",
                gender === "male"
                  ? "border-slate-900 bg-white text-slate-900"
                  : "border-slate-200 bg-slate-50 text-slate-500",
              )}
              aria-pressed={gender === "male"}
            >
              남성
            </Button>

            <Button
              type="button"
              onClick={() => handleGenderSelect("female")}
              className={cn(
                "h-12 flex-1 rounded-xl border text-md",
                gender === "female"
                  ? "border-slate-900 bg-white text-slate-900"
                  : "border-slate-200 bg-slate-50 text-slate-500",
              )}
              aria-pressed={gender === "female"}
            >
              여성
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
