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
  const { setTempFilter } = useFilterStore();
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
    setSelectedCity({ code: cityCode, name: cityName });
    const res = await getSigungu(cityCode);
    setSigungus(res.data);
  };

  const handleSigunguClick = (sigunguName: string) => {
    if (!selectedCity) return;
    const fullName = `${selectedCity.name} ${sigunguName}`;
    setTempFilter("regionName", fullName);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-2 border-b pb-4">
        {cities.map((city) => (
          <Button
            key={city.cityCode}
            variant="outline"
            size="sm"
            onClick={() => handleCityClick(city.cityCode, city.cityName)}
            className={cn(
              selectedCity?.code === city.cityCode &&
                "bg-blue-50 border-blue-500 text-blue-600",
            )}
          >
            {city.cityName}
          </Button>
        ))}
      </div>

      {selectedCity && (
        <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto">
          {sigungus.map((sigungu) => (
            <Button
              key={sigungu.sigunguCode}
              variant="ghost"
              onClick={() => handleSigunguClick(sigungu.sigunguName)}
              className="justify-start text-sm"
            >
              {sigungu.sigunguName}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
