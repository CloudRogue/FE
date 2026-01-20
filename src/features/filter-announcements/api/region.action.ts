import { Api } from "@/src/shared/api/api";
import { z } from "zod";

export const CitySchema = z.object({
  cityCode: z.string(),
  cityName: z.string(),
});

export const SigunguSchema = z.object({
  sigunguCode: z.string(),
  sigunguName: z.string(),
});

export const getCities = () =>
  Api.get("/regions/cities", z.object({ data: z.array(CitySchema) }));

export const getSigungu = (cityCode: string) =>
  Api.get(
    `/regions/sigungu?cityCode=${cityCode}`,
    z.object({ data: z.array(SigunguSchema) }),
  );
