"use client";

import { useMemo, useState } from "react";

import Button from "@/src/shared/ui/button";
import cn from "@/src/shared/lib/cn";
import { useOnboardingStore } from "@/src/features/onboarding";

type Tab = "city" | "district";

export default function Step3() {
  const { draft, updateDraft } = useOnboardingStore();

  const regionCity = draft.regionCity ?? undefined;
  const regionDistrict = draft.regionDistrict ?? undefined;

  const [tab, setTab] = useState<Tab>(() => (regionCity ? "district" : "city"));

  const cities = useMemo(
    () => [
      "서울",
      "경기",
      "인천",
      "대전",
      "대구",
      "광주",
      "부산",
      "울산",
      "제주",
    ],
    [],
  );

  const districtsByCity = useMemo<Record<string, string[]>>(
    () => ({
      서울: [
        "강남구",
        "강동구",
        "강북구",
        "강서구",
        "서초구",
        "송파구",
        "중구",
        "마포구",
      ],
      경기: ["수원시", "성남시", "고양시", "용인시"],
      인천: ["남동구", "부평구", "연수구"],
      대전: ["서구", "유성구"],
      대구: ["중구", "수성구", "북구", "남구"],
      광주: ["서구", "북구"],
      부산: ["해운대구", "수영구"],
      울산: ["남구", "동구"],
      제주: ["제주시", "서귀포시"],
    }),
    [],
  );

  const districts = regionCity ? (districtsByCity[regionCity] ?? []) : [];
  const canSelectDistrict = Boolean(regionCity);

  const handleSelectCity = (city: string) => {
    updateDraft({ regionCity: city, regionDistrict: undefined });
    setTab("district");
  };

  const handleSelectDistrict = (district: string) => {
    if (!canSelectDistrict) return;
    updateDraft({ regionDistrict: district });
  };

  return (
    <section className="px-0 pb-28 pt-2">
      <header className="space-y-2">
        <h2 className="text-xl font-semibold text-black">
          거주지를 알려주세요
        </h2>
        <p className="text-sm text-slate-400">
          거주지에 따라 신청할 수 있는 공고가 달라져요
        </p>
      </header>

      <div className="mt-10 flex items-center">
        <div className="w-[108px] shrink-0 text-slate-400 text-lg">
          내 거주지는
        </div>

        <div className="flex flex-1 gap-4">
          <Button
            type="button"
            onClick={() => setTab("city")}
            className={cn(
              "h-12 flex-1 rounded-xl border bg-white text-lg",
              tab === "city"
                ? "border-blue-500 text-slate-700"
                : "border-slate-200 text-slate-400",
            )}
            aria-pressed={tab === "city"}
          >
            {regionCity ?? "시"}
          </Button>

          <Button
            type="button"
            onClick={() => setTab("district")}
            disabled={!canSelectDistrict}
            className={cn(
              "h-12 flex-1 rounded-xl border bg-white text-lg",
              tab === "district"
                ? "border-blue-500 text-slate-700"
                : "border-slate-200 text-slate-400",
              !canSelectDistrict && "opacity-50",
            )}
            aria-pressed={tab === "district"}
          >
            {regionDistrict ?? "군/구"}
          </Button>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-slate-100 px-6 py-4">
        {tab === "city" && (
          <ul className="space-y-6">
            {cities.map((city) => {
              const selected = regionCity === city;

              return (
                <li key={city}>
                  <button
                    type="button"
                    onClick={() => handleSelectCity(city)}
                    className="flex w-full items-center justify-between text-left"
                  >
                    <span className="text-lg text-slate-900">{city}</span>
                    <span
                      className={cn(
                        "text-2xl text-slate-400",
                        selected ? "opacity-100" : "opacity-40",
                      )}
                      aria-hidden={!selected}
                    >
                      ✓
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {tab === "district" && canSelectDistrict && (
          <ul className="space-y-6">
            {districts.map((district) => {
              const selected = regionDistrict === district;

              return (
                <li key={district}>
                  <button
                    type="button"
                    onClick={() => handleSelectDistrict(district)}
                    className="flex w-full items-center justify-between text-left"
                  >
                    <span className="text-lg text-slate-900">{district}</span>
                    <span
                      className={cn(
                        "text-2xl text-slate-400",
                        selected ? "opacity-100" : "opacity-40",
                      )}
                      aria-hidden={!selected}
                    >
                      ✓
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
