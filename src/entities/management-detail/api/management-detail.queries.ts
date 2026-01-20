import { getAnnouncementApplicationDetail } from "@/src/entities/management-detail";
import { queryOptions } from "@tanstack/react-query";

export const managementDetailQueries = {
  all: ["management", "detail"] as const,
  detail: (id: string) =>
    queryOptions({
      queryKey: [...managementDetailQueries.all, id],
      queryFn: () => getAnnouncementApplicationDetail(id),
      staleTime: 1000 * 60 * 5,
    }),
};
