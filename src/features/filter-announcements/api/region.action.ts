import { Api } from "@/src/shared/api/api";
import { z } from "zod";

export const SigunguSchema = z.object({
  sigunguCode: z.string(),
  sigunguName: z.string(),
});


export const getSeoulSigungu = () =>
  Api.get(
    "/regions/sigungu?cityCode=11",
    z.object({ data: z.array(SigunguSchema) }),
  );
