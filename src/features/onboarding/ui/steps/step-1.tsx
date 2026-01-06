"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Button from "@/src/shared/ui/button";
import Input from "@/src/shared/ui/input";
import Label from "@/src/shared/ui/label";
import cn from "@/src/shared/lib/cn";

type Gender = "male" | "female";

export default function Step1() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const name = useMemo(() => searchParams.get("name") ?? "", [searchParams]);

  const gender = useMemo(() => {
    const value = searchParams.get("gender");
    if (value === "male" || value === "female") return value;
    return null;
  }, [searchParams]);

  const isMaleSelected = gender === "male";
  const isFemaleSelected = gender === "female";

  const replaceQuery = (key: string, value: string | null) => {
    const next = new URLSearchParams(searchParams.toString());

    if (value === null || value === "") {
      next.delete(key);
    } else {
      next.set(key, value);
    }

    router.replace(`${pathname}?${next.toString()}`);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    replaceQuery("name", e.target.value);
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
            value={name}
            onChange={handleNameChange}
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
                isMaleSelected
                  ? "border-slate-900 bg-white text-slate-900"
                  : "border-slate-200 bg-slate-50 text-slate-500",
              )}
              aria-pressed={isMaleSelected}
            >
              남성
            </Button>

            <Button
              type="button"
              onClick={() => handleGenderSelect("female")}
              className={cn(
                "h-12 flex-1 rounded-xl border text-md",
                isFemaleSelected
                  ? "border-slate-900 bg-white text-slate-900"
                  : "border-slate-200 bg-slate-50 text-slate-500",
              )}
              aria-pressed={isFemaleSelected}
            >
              여성
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
