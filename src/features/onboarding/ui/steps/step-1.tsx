"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { OnboardingDraft } from "@/src/features/onboarding/model/onboarding.types";
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const nameFromQuery = searchParams.get("name") ?? "";

  const [nameValue, setNameValue] = useState(nameFromQuery);
  const isComposingRef = useRef(false);

  useEffect(() => {
    if (isComposingRef.current) return;
    setNameValue(nameFromQuery);
  }, [nameFromQuery]);

  const gender = useMemo<Gender | null>(() => {
    const value = searchParams.get("gender");
    if (!value) return null;
    return value in GENDER_MAP ? (value as Gender) : null;
  }, [searchParams]);

  const replaceQuery = (key: string, value: string | null) => {
    const next = new URLSearchParams(searchParams.toString());

    if (!value) {
      next.delete(key);
    } else {
      next.set(key, value);
    }

    router.replace(`${pathname}?${next.toString()}`);
  };

  const commitNameToQuery = (value: string) => {
    replaceQuery("name", value.trim() ? value : null);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    setNameValue(next);

    if (isComposingRef.current) return;
    commitNameToQuery(next);
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
    commitNameToQuery(next);
  };

  const handleNameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (isComposingRef.current) return;
    commitNameToQuery(e.currentTarget.value);
  };

  const handleGenderSelect = (nextGender: Gender) => {
    replaceQuery("gender", nextGender);
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
