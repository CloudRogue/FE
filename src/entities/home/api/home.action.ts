import { Api } from "@/src/shared/api/api";
import { bannerResponseSchema } from "@/src/entities/home/model/home.schema";
import type { BannerData } from "@/src/entities/home/model/home.types";

export const getHomeBanner = async (): Promise<BannerData> => {
  return await Api.get("/announcements/banner", bannerResponseSchema);
};
