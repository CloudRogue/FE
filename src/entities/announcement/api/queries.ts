import { Api } from "@/src/shared/api/api";
import { AnnouncementListResponseSchema } from "../model/schemas";
import type { AnnouncementFilterParams } from "../model/types";

export const announcementQueries = {
  open: (params: AnnouncementFilterParams) => ({
    queryKey: [
      "announcements",
      "open",
      params.sort ?? "DEADLINE",
      params.limit ?? 20,
    ] as const,

    queryFn: async ({ pageParam }: { pageParam?: string | null }) => {
      const searchParams = new URLSearchParams();

      if (pageParam) searchParams.append("cursor", pageParam);
      if (params.limit) searchParams.append("limit", String(params.limit));
      if (params.sort) searchParams.append("sort", params.sort);

      return Api.get(
        `/api/announcements/open?${searchParams.toString()}`,
        AnnouncementListResponseSchema,
      );
    },
  }),
};
