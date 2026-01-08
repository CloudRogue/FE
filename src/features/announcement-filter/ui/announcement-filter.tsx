"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/src/shared/ui/tabs";
import { Check } from "lucide-react";
import Button from "@/src/shared/ui/button";

const HOUSING_TYPES = ["행복주택", "안심주택", "장기전세", "국민임대"];

export function AnnouncementFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [tempHousingType, setTempHousingType] = useState(
    searchParams.get("housingType") || "",
  );

  const handleApply = async () => {
    setIsSubmitting(true);
    const params = new URLSearchParams(searchParams.toString());

    if (tempHousingType) params.set("housingType", tempHousingType);
    else params.delete("housingType");

    router.push(`?${params.toString()}`, { scroll: false });

    setTimeout(() => setIsSubmitting(false), 300);
  };

  return (
    <div className="flex flex-col bg-white border-b border-gray-100">
      <TabsRoot defaultValue="housing-type" searchParamKey="filter-category">
        <header className="px-4">
          <TabsList className="w-full flex border-b border-gray-50">
            <TabsTrigger value="region" className="flex-1 py-4 text-sm">
              희망 지역
            </TabsTrigger>
            <TabsTrigger value="publisher" className="flex-1 py-4 text-sm">
              공급 주체
            </TabsTrigger>
            <TabsTrigger value="housing-type" className="flex-1 py-4 text-sm">
              주택 유형
            </TabsTrigger>
          </TabsList>
        </header>

        <main className="p-4 min-h-[200px]">
          <TabsContent value="housing-type">
            <div className="grid grid-cols-2 gap-2">
              {HOUSING_TYPES.map((type) => {
                const isSelected = tempHousingType === type;
                return (
                  <button
                    key={type}
                    onClick={() => setTempHousingType(type)}
                    className={`flex items-center justify-between p-3 rounded-lg border text-sm transition-all ${
                      isSelected
                        ? "border-black bg-black text-white"
                        : "border-gray-200 bg-white text-gray-500"
                    }`}
                  >
                    <span>{type}</span>
                    {isSelected && <Check className="w-4 h-4" />}
                  </button>
                );
              })}
            </div>
          </TabsContent>
        </main>
      </TabsRoot>

      <div className="p-4 pt-0">
        <Button
          className="w-full"
          size="lg"
          isLoading={isSubmitting}
          onClick={handleApply}
        >
          필터 적용하기
        </Button>
      </div>
    </div>
  );
}
