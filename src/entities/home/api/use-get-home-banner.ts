import { useQuery } from "@tanstack/react-query";
import { Api } from "@/src/shared/api/api";
import { z } from "zod";

const homeBannerSchema = z
  .object({
    announcementId: z.number().int(),
    title: z.string(),
    reasonTag: z.string(),
  })
  .nullable();

export type HomeBannerData = z.infer<typeof homeBannerSchema>;

export const useGetHomeBanner = () => {
  return useQuery({
    queryKey: ["home-banner"],
    queryFn: () => Api.get("/announcements/banner", homeBannerSchema),
  });
};
