"use client";

import { useEffect, useState } from "react";
import cn from "@/src/shared/lib/cn";

import Button from "@/src/shared/ui/button";

import {
  getRegionCities,
  getRegionSigungu,
} from "@/src/features/onboarding/api/regions-action";

import type {
  RegionCity,
  RegionSigungu,
  RequiredOnboardingAnswerValue,
} from "@/src/features/onboarding/model/required-onboarding-types";

import CheckIcon from "@/src/shared/ui/icons/arroaw/check.svg";

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

  const tabBase = cn(
    "h-12 flex-1",
    "inline-flex items-center justify-center",
    "rounded-md border border-gray-100 bg-gray-white",
    "text-body2 font-semibold text-gray-700",
    "shadow-button transition-all",
  );

  const tabSelected = "border-primary-blue text-gray-black";

  const tabDisabled = cn(
    "disabled:bg-gray-white",
    "disabled:text-gray-700",
    "disabled:border-gray-100",
    "disabled:opacity-100",
  );

  const listBoxClass = cn(
    "mt-4 overflow-hidden",
    "rounded-md border border-gray-100 bg-gray-white",
    "shadow-button",
  );

  const listItemClass = cn(
    "flex h-12 w-full items-center justify-between px-4",
    "text-body2 text-gray-700",
    "transition-colors",
  );

  const checkClass = "shrink-0";

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
          variant="secondary"
          size="md"
          onClick={() => setActiveTab("city")}
          className={cn(
            tabBase,
            activeTab === "city" && tabSelected,
            "hover:bg-gray-white hover:shadow-button-hover hover:opacity-100",
          )}
        >
          {selectedCityLabel}
        </Button>

        <Button
          type="button"
          variant="secondary"
          size="md"
          onClick={() => {
            if (isSigunguTabDisabled) return;
            setActiveTab("sigungu");
          }}
          disabled={isSigunguTabDisabled}
          className={cn(
            tabBase,
            activeTab === "sigungu" && tabSelected,
            isSigunguTabDisabled && tabDisabled,

            "hover:bg-gray-white hover:shadow-button-hover hover:opacity-100",
          )}
        >
          {selectedSigunguLabel}
        </Button>
      </div>

      <div className={listBoxClass}>
        {activeTab === "city" && (
          <div className="max-h-80 overflow-auto py-2">
            {isCitiesLoading && (
              <div className="px-4 py-3 text-body2 text-gray-400">
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
                    variant="tertiary_black"
                    size="md"
                    onClick={() => handleSelectCity(city)}
                    className={cn(
                      listItemClass,
                      "no-underline p-0 h-12 w-full justify-between px-4 rounded-none",
                      "hover:bg-transparent hover:shadow-none hover:opacity-100",
                      isSelected && "text-gray-black font-semibold",
                    )}
                  >
                    <span>{city.cityName}</span>

                    {isSelected && (
                      <span className={checkClass} aria-hidden>
                        <CheckIcon className="h-4 w-4 text-gray-400" />
                      </span>
                    )}
                  </Button>
                );
              })}
          </div>
        )}

        {activeTab === "sigungu" && (
          <div className="max-h-80 overflow-auto py-2">
            {isSigunguTabDisabled && (
              <div className="px-4 py-3 text-body2 text-gray-400">
                먼저 시/도를 선택해주세요.
              </div>
            )}

            {!isSigunguTabDisabled && isSigungusLoading && (
              <div className="px-4 py-3 text-body2 text-gray-400">
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
                    variant="tertiary_black"
                    size="md"
                    onClick={() => handleSelectSigungu(sigungu)}
                    className={cn(
                      listItemClass,
                      "no-underline p-0 h-12 w-full justify-between px-4 rounded-none",
                      "hover:bg-transparent hover:shadow-none hover:opacity-100",
                      isSelected && "text-gray-black font-semibold",
                    )}
                  >
                    <span>{sigungu.sigunguName}</span>

                    {isSelected && (
                      <span className={checkClass} aria-hidden>
                        <CheckIcon className="h-4 w-4 text-gray-400" />
                      </span>
                    )}
                  </Button>
                );
              })}
          </div>
        )}
      </div>
    </section>
  );
}
