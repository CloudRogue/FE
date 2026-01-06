"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Button from "@/src/shared/ui/button";
import Input from "@/src/shared/ui/input";
import cn from "@/src/shared/lib/cn";

const onlyDigits = (value: string) => value.replace(/\D/g, "");

type Role = "householder" | "member";

export default function Step4() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [role, setRole] = useState<Role>(() => {
    const value = searchParams.get("householdRole");
    if (value === "householder" || value === "member") return value;
    return "householder";
  });

  const householdSize = useMemo(() => {
    return searchParams.get("householdSize") ?? "";
  }, [searchParams]);

  const replaceParams = (next: URLSearchParams) => {
    router.replace(`${pathname}?${next.toString()}`);
  };

  const setQuery = (key: string, value?: string) => {
    const next = new URLSearchParams(searchParams.toString());
    if (!value) next.delete(key);
    else next.set(key, value);
    replaceParams(next);
  };

  useEffect(() => {
    const current = searchParams.get("householdRole");
    if (current === "householder" || current === "member") return;
    setQuery("householdRole", "householder");
  }, []);

  const handleHouseholdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    if (raw === "") {
      setQuery("householdSize");
      return;
    }

    const next = onlyDigits(raw);
    setQuery("householdSize", next);
  };

  const handleRoleSelect = (nextRole: Role) => {
    setRole(nextRole);
    setQuery("householdRole", nextRole);
  };

  const isHouseholderSelected = role === "householder";
  const isMemberSelected = role === "member";

  return (
    <section className="px-0 pb-28 pt-2">
      <header className="space-y-2">
        <h2 className="text-xl font-semibold text-black">
          가구원 수를 알려주세요
        </h2>
        <p className="text-sm text-slate-400">
          가구 구성원 수에 따라 신청 조건이 달라져요
        </p>
      </header>

      <div className="mt-12 flex items-center">
        <div className="w-[108px] shrink-0 text-slate-400">나는</div>

        <div className="flex flex-1 gap-4">
          <Button
            type="button"
            onClick={() => handleRoleSelect("householder")}
            className={cn(
              "h-12 flex-1 rounded-xl border bg-slate-50 text-lg",
              isHouseholderSelected
                ? "border-slate-200 text-slate-700"
                : "border-slate-200 text-slate-400 opacity-90",
            )}
            aria-pressed={isHouseholderSelected}
          >
            세대주
          </Button>

          <Button
            type="button"
            onClick={() => handleRoleSelect("member")}
            className={cn(
              "h-12 flex-1 rounded-xl border bg-slate-50 text-lg",
              isMemberSelected
                ? "border-slate-200 text-slate-700"
                : "border-slate-200 text-slate-400 opacity-90",
            )}
            aria-pressed={isMemberSelected}
          >
            세대원
          </Button>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-center gap-6">
        <Input
          id="household-size"
          inputMode="numeric"
          value={householdSize}
          onChange={handleHouseholdChange}
          placeholder="0"
          className="h-12 w-30 rounded-2xl border border-slate-200 bg-white px-3 text-center text-xl text-slate-700 placeholder:text-slate-300"
        />
        <span className="text-xl text-slate-400">명</span>
      </div>

      <div className="mt-10 rounded-2xl bg-slate-100 px-6 py-5">
        <div className="text-base font-semibold text-slate-500">안내 사항</div>
        <div className="mt-1 space-y-2 text-sm text-slate-700">
          <p>형제 · 자매 · 친척 · 동거인은 포함하면 안 돼요!</p>
          <p>임신 중이라면, 가구원 1명을 더 추가해주세요</p>
        </div>
      </div>
    </section>
  );
}
