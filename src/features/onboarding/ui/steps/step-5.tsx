"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Input from "@/src/shared/ui/input";

const onlyDigits = (value: string) => value.replace(/\D/g, "");

// 임시 분위 계산 함수
function calculateIncomeDecile(monthlyIncome: number): number {
  if (monthlyIncome <= 0) return 0;

  if (monthlyIncome < 200) return 1;
  if (monthlyIncome < 300) return 2;
  if (monthlyIncome < 400) return 3;
  if (monthlyIncome < 500) return 4;
  if (monthlyIncome < 600) return 5;
  if (monthlyIncome < 700) return 6;
  if (monthlyIncome < 800) return 7;
  if (monthlyIncome < 900) return 8;
  if (monthlyIncome < 1000) return 9;
  return 10;
}

export default function Step5() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const householdSize = searchParams.get("householdSize") ?? "";

  const monthlyIncome = searchParams.get("monthlyIncome") ?? "";

  const rawIncomeDecile = searchParams.get("incomeDecile");
  const parsedIncomeDecile = rawIncomeDecile ? Number(rawIncomeDecile) : NaN;
  const incomeDecile = Number.isFinite(parsedIncomeDecile)
    ? parsedIncomeDecile
    : 0;

  const replaceParams = (next: URLSearchParams) => {
    router.replace(`${pathname}?${next.toString()}`);
  };

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    if (raw === "") {
      const next = new URLSearchParams(searchParams.toString());
      next.delete("monthlyIncome");
      next.delete("incomeDecile");
      replaceParams(next);
      return;
    }

    const cleaned = onlyDigits(raw);
    if (cleaned === "") {
      const next = new URLSearchParams(searchParams.toString());
      next.delete("monthlyIncome");
      next.delete("incomeDecile");
      replaceParams(next);
      return;
    }

    const nextIncome = Number(cleaned);
    if (Number.isNaN(nextIncome)) return;

    const nextDecile = calculateIncomeDecile(nextIncome);

    const next = new URLSearchParams(searchParams.toString());
    next.set("monthlyIncome", String(nextIncome));
    next.set("incomeDecile", String(nextDecile));
    replaceParams(next);
  };

  const computedDecileForView = useMemo(() => {
    const n = Number(monthlyIncome);
    if (!monthlyIncome || Number.isNaN(n)) return 0;
    return calculateIncomeDecile(n);
  }, [monthlyIncome]);

  const decileForView = incomeDecile || computedDecileForView;

  return (
    <section className="px-0 pb-28 pt-2">
      <header className="space-y-2">
        <h2 className="text-xl font-semibold text-black">
          월 평균 수입을 알려주세요
        </h2>
        <p className="text-sm text-slate-400">
          수입을 바탕으로 소득분위를 계산해 드릴게요
        </p>
      </header>

      <div className="mt-10 flex items-center justify-center gap-4">
        <Input
          id="monthly-income"
          inputMode="numeric"
          value={monthlyIncome}
          onChange={handleIncomeChange}
          placeholder="0"
          className="h-12 w-25 rounded-2xl border border-slate-200 bg-white px-3 text-center text-xl text-slate-700 placeholder:text-slate-400"
        />
        <span className="text-slate-400">만원</span>
      </div>

      <div className="mt-10 flex items-center justify-center gap-2 text-slate-400">
        <span>가구원 수</span>
        <span className="rounded-xl bg-slate-100 px-3 py-1 text-slate-700">
          {householdSize}
        </span>
        <span>명 기준, 소득분위</span>
        <span className="rounded-xl bg-slate-100 px-3 py-1 text-slate-700">
          {decileForView}
        </span>
        <span>분위에 해당해요</span>
      </div>

      <div className="mt-10 rounded-2xl bg-slate-100 p-6">
        <div className="text-base font-medium text-slate-500">안내 사항</div>
        <ul className="mt-1 space-y-2 text-sm text-slate-700">
          <li>수입 입력 시 세전 금액 기준으로 입력해 주세요</li>
          <li>상여금이나 기타 소득이 포함된 월 평균 금액일수록 정확해요</li>
        </ul>
      </div>
    </section>
  );
}
