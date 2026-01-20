import { Api } from "@/src/shared/api/api";

import {
  RegionCitiesResponseSchema,
  RegionSigunguResponseSchema,
} from "@/src/features/onboarding/model/required-onboarding.schema";
import type {
  RegionCity,
  RegionSigungu,
} from "@/src/features/onboarding/model/required-onboarding.types";

export async function getRegionCities(): Promise<RegionCity[]> {
  const res = await Api.get("/regions/cities", RegionCitiesResponseSchema);
  return res.data;
}

export async function getRegionSigungu(
  cityCode: string,
): Promise<RegionSigungu[]> {
  const res = await Api.get(
    `/regions/sigungu?cityCode=${encodeURIComponent(cityCode)}`,
    RegionSigunguResponseSchema,
  );
  return res.data;
}
