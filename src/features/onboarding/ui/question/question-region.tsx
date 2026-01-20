"use client";

import { useEffect, useState } from "react";
import cn from "@/src/shared/lib/cn";

import Button from "@/src/shared/ui/button";

import {
  getRegionCities,
  getRegionSigungu,
} from "@/src/features/onboarding/api/regions.action";

import type {
  RegionCity,
  RegionSigungu,
  RequiredOnboardingAnswerValue,
} from "@/src/features/onboarding/model/required-onboarding.types";

type Props = {
  value: RequiredOnboardingAnswerValue | undefined;
  onChange: (next: RequiredOnboardingAnswerValue | undefined) => void;
};

type Tab = "city" | "sigungu";

export default function QuestionRegion({ onChange }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("city");

  const [cities, setCities] = useState<RegionCity[]>([]);
  const [sigungus, setSigungus] = useState<RegionSigungu[]>([]);

  const [isCitiesLoading, setIsCitiesLoading] = useState(false);
  const [isSigungusLoading, setIsSigungusLoading] = useState(false);

  const [selectedCity, setSelectedCity] = useState<RegionCity | null>(null);
  const [selectedSigungu, setSelectedSigungu] = useState<RegionSigungu | null>(
    null,
  );

  const isSigunguTabDisabled = selectedCity === null;

  const tabBase =
    "h-12 flex-1 rounded-xl border text-sm font-semibold shadow-none";
  const tabSelected = "border-blue-600 bg-blue-50 text-blue-700";
  const tabNormal = "border-gray-200 bg-white text-gray-900";

  const listBoxClass =
    "mt-4 overflow-hidden rounded-2xl border border-gray-200 bg-white";
  const listItemClass =
    "flex h-12 w-full items-center justify-between px-4 text-sm shadow-none";
  const checkClass = "text-base";

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setIsCitiesLoading(true);
      try {
        const data = await getRegionCities();
        if (cancelled) return;
        setCities(data);
      } finally {
        if (!cancelled) setIsCitiesLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!selectedCity) {
      setSigungus([]);
      setSelectedSigungu(null);
      return;
    }

    const cityCode = selectedCity.cityCode;

    let cancelled = false;

    async function run() {
      setIsSigungusLoading(true);
      try {
        const data = await getRegionSigungu(cityCode);
        if (cancelled) return;
        setSigungus(data);
      } finally {
        if (!cancelled) setIsSigungusLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [selectedCity]);

  const handleSelectCity = (city: RegionCity) => {
    if (selectedCity?.cityCode === city.cityCode) {
      setActiveTab("sigungu");
      return;
    }

    setSelectedCity(city);
    setSelectedSigungu(null);
    setActiveTab("sigungu");
    onChange(undefined);
  };

  const handleSelectSigungu = (sigungu: RegionSigungu) => {
    if (!selectedCity) return;

    setSelectedSigungu(sigungu);

    const text = `${selectedCity.cityName} ${sigungu.sigunguName}`;
    onChange(text);
  };

  const selectedCityLabel = selectedCity ? selectedCity.cityName : "시";
  const selectedSigunguLabel = selectedSigungu
    ? selectedSigungu.sigunguName
    : "군/구";

  return (
    <section>
      <div className="flex gap-3">
        <Button
          type="button"
          onClick={() => setActiveTab("city")}
          className={cn(
            tabBase,
            activeTab === "city" ? tabSelected : tabNormal,
          )}
        >
          {selectedCityLabel}
        </Button>

        <Button
          type="button"
          onClick={() => {
            if (isSigunguTabDisabled) return;
            setActiveTab("sigungu");
          }}
          disabled={isSigunguTabDisabled}
          className={cn(
            tabBase,
            activeTab === "sigungu" ? tabSelected : tabNormal,
            isSigunguTabDisabled && "cursor-not-allowed opacity-40",
          )}
        >
          {selectedSigunguLabel}
        </Button>
      </div>

      <div className={listBoxClass}>
        {activeTab === "city" && (
          <div className="max-h-80 overflow-auto py-2">
            {isCitiesLoading && (
              <div className="px-4 py-3 text-sm text-gray-500">
                불러오는 중...
              </div>
            )}

            {!isCitiesLoading &&
              cities.map((city) => {
                const isSelected = selectedCity?.cityCode === city.cityCode;

                return (
                  <Button
                    key={city.cityCode}
                    type="button"
                    onClick={() => handleSelectCity(city)}
                    className={cn(
                      listItemClass,
                      "justify-between",
                      isSelected ? "text-blue-700" : "text-gray-900",
                    )}
                  >
                    <span>{city.cityName}</span>
                    <span
                      className={cn(
                        checkClass,
                        isSelected ? "opacity-100" : "opacity-20",
                      )}
                      aria-hidden
                    >
                      ✓
                    </span>
                  </Button>
                );
              })}
          </div>
        )}

        {activeTab === "sigungu" && (
          <div className="max-h-80 overflow-auto py-2">
            {isSigunguTabDisabled && (
              <div className="px-4 py-3 text-sm text-gray-500">
                먼저 시/도를 선택해주세요.
              </div>
            )}

            {!isSigunguTabDisabled && isSigungusLoading && (
              <div className="px-4 py-3 text-sm text-gray-500">
                불러오는 중...
              </div>
            )}

            {!isSigunguTabDisabled &&
              !isSigungusLoading &&
              sigungus.map((sigungu) => {
                const isSelected =
                  selectedSigungu?.sigunguCode === sigungu.sigunguCode;

                return (
                  <Button
                    key={sigungu.sigunguCode}
                    type="button"
                    onClick={() => handleSelectSigungu(sigungu)}
                    className={cn(
                      listItemClass,
                      "justify-between",
                      isSelected ? "text-blue-700" : "text-gray-900",
                    )}
                  >
                    <span>{sigungu.sigunguName}</span>
                    <span
                      className={cn(
                        checkClass,
                        isSelected ? "opacity-100" : "opacity-20",
                      )}
                      aria-hidden
                    >
                      ✓
                    </span>
                  </Button>
                );
              })}
          </div>
        )}
      </div>
    </section>
  );
}
