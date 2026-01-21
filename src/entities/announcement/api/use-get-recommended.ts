import { useQuery } from "@tanstack/react-query";
import { Api } from "@/src/shared/api/api";
import { z } from "zod";

const recommendedResponseSchema = z.object({
  data: z.array(
    z.object({
      announcementId: z.number().int(),
      title: z.string(),
      startDate: z.string(),
      endDate: z.string(),
      publisher: z.string(),
      publishedAt: z.string(),
      status: z.enum(["OPEN", "DUE_SOON", "UPCOMING", "CLOSED"]),
      housingType: z.string().optional(),
    }),
  ),
});

export const useGetRecommendedAnnouncements = (limit: number = 2) => {
  return useQuery({
    queryKey: ["announcements", "recommended", limit],
    queryFn: () =>
      Api.get(
        `/announcements/search/personalized?limit=${limit}`,
        recommendedResponseSchema,
      ),
  });
};
