"use client";

import { useOnboardingStore } from "@/src/features/onboarding";
import Input from "@/src/shared/ui/input";
import Label from "@/src/shared/ui/label";

const onlyDigits = (value: string) => value.replace(/\D/g, "");
const clamp = (value: string, maxLength: number) => value.slice(0, maxLength);

export default function Step2() {
  const { draft, updateDraft } = useOnboardingStore();

  const birthYear = draft.birthYear ?? "";
  const birthMonth = draft.birthMonth ?? "";
  const birthDay = draft.birthDay ?? "";

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = clamp(onlyDigits(e.target.value), 4);
    updateDraft({ birthYear: next || undefined });
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = clamp(onlyDigits(e.target.value), 2);
    updateDraft({ birthMonth: next || undefined });
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = clamp(onlyDigits(e.target.value), 2);
    updateDraft({ birthDay: next || undefined });
  };

  return (
    <section className="px-0 pb-28 pt-2">
      <header className="space-y-2">
        <h2 className="text-xl font-semibold text-black">
          생년월일을 알려주세요
        </h2>
        <p className="text-sm text-slate-400">
          특정 나이 대에만 지원할 수 있는 공고가 있어요
        </p>
      </header>

      <div className="mt-10 flex items-center gap-6">
        <div className="flex items-center gap-3">
          <Label htmlFor="birth-year" hidden>
            출생 연도
          </Label>
          <Input
            id="birth-year"
            inputMode="numeric"
            placeholder="YYYY"
            value={birthYear}
            onChange={handleYearChange}
            className="h-12 w-[88px] rounded-xl border border-slate-200 bg-transparent px-3 text-center text-black placeholder:text-slate-400"
          />
          <span className="text-slate-400 text-xl">년</span>
        </div>

        <div className="flex items-center gap-3">
          <Label htmlFor="birth-month" hidden>
            출생 월
          </Label>
          <Input
            id="birth-month"
            inputMode="numeric"
            placeholder="MM"
            value={birthMonth}
            onChange={handleMonthChange}
            className="h-12 w-[64px] rounded-xl border border-slate-200 bg-transparent px-3 text-center text-black placeholder:text-slate-400"
          />
          <span className="text-slate-400 text-xl">월</span>
        </div>

        <div className="flex items-center gap-3">
          <Label htmlFor="birth-day" hidden>
            출생 일
          </Label>
          <Input
            id="birth-day"
            inputMode="numeric"
            placeholder="DD"
            value={birthDay}
            onChange={handleDayChange}
            className="h-12 w-[64px] rounded-xl border border-slate-200 bg-transparent px-3 text-center text-black placeholder:text-slate-400"
          />
          <span className="text-slate-400 text-xl">일</span>
        </div>
      </div>
    </section>
  );
}
