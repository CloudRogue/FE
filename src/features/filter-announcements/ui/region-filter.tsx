"use client";

import { useState, useEffect } from "react";
import cn from "@/src/shared/lib/cn";
import { useFilterStore } from "../model/use-filter-store";
import {
  getCities,
  getSigungu,
} from "@/src/features/filter-announcements/api/region";
import Button from "@/src/shared/ui/button";

export function RegionFilter() {
  const { tempFilters, setTempFilter } = useFilterStore();

  const [cities, setCities] = useState<
    { cityCode: string; cityName: string }[]
  >([]);
  const [sigungus, setSigungus] = useState<
    { sigunguCode: string; sigunguName: string }[]
  >([]);
  const [selectedCity, setSelectedCity] = useState<{
    code: string;
    name: string;
  } | null>(null);

  useEffect(() => {
    getCities().then((res) => setCities(res.data));
  }, []);

  const handleCityClick = async (cityCode: string, cityName: string) => {
    if (selectedCity?.code === cityCode) {
      setSelectedCity(null);
      setSigungus([]);
      setTempFilter("regionName", undefined);
      return;
    }
    setSelectedCity({ code: cityCode, name: cityName });
    const res = await getSigungu(cityCode);
    setSigungus(res.data);
  };

  const handleSigunguClick = (sigunguName: string) => {
    if (!selectedCity) return;
    const fullName = `${selectedCity.name} ${sigunguName}`;
    const isSelected = tempFilters.regionName === fullName;

    setTempFilter("regionName", isSelected ? undefined : fullName);
  };

  return (
    <div className="flex flex-col gap-6">
      <section>
        <p className="text-[12px] text-slate-400 font-bold mb-3 px-1">
          시/도 선택
        </p>
        <div className="grid grid-cols-5 gap-2">
          {cities.map((city) => {
            const isCitySelected = selectedCity?.code === city.cityCode;
            return (
              <Button
                key={city.cityCode}
                onClick={() => handleCityClick(city.cityCode, city.cityName)}
                className={cn(
                  "h-auto py-2.5 px-1 rounded-full text-[13px] border transition-all shadow-none",
                  isCitySelected
                    ? "bg-[#3B82F6] border-[#3B82F6] text-white font-bold"
                    : "bg-white border-[#E2E8F0] text-[#64748B] hover:bg-slate-50",
                )}
              >
                <span className="truncate w-full inline-block text-center">
                  {city.cityName}
                </span>
              </Button>
            );
          })}
        </div>
      </section>

      {selectedCity && (
        <section className="animate-in fade-in slide-in-from-top-1">
          <p className="text-[12px] text-slate-400 font-bold mb-3 px-1">
            시/군/구 선택
          </p>
          <div className="grid grid-cols-5 gap-2 max-h-[180px] overflow-y-auto no-scrollbar pb-2">
            {sigungus.map((sigungu) => {
              const fullName = `${selectedCity.name} ${sigungu.sigunguName}`;
              const isSelected = tempFilters.regionName === fullName;

              return (
                <Button
                  key={sigungu.sigunguCode}
                  onClick={() => handleSigunguClick(sigungu.sigunguName)}
                  className={cn(
                    "h-auto py-2.5 px-1 rounded-full text-[13px] border transition-all shadow-none",
                    isSelected
                      ? "bg-[#3B82F6] border-[#3B82F6] text-white font-bold"
                      : "bg-white border-[#E2E8F0] text-[#64748B] hover:bg-slate-50",
                  )}
                >
                  <span className="truncate w-full inline-block text-center">
                    {sigungu.sigunguName}
                  </span>
                </Button>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
