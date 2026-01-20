import { useInfiniteQuery } from "@tanstack/react-query";
import { Api } from "@/src/shared/api/api";
import { RecentViewedResponseSchema } from "@/src/entities/announcement/model/announcement.schemas";

export function useRecentViewedAnnouncements(limit = 20) {
  return useInfiniteQuery({
    queryKey: ["announcements", "recent-viewed"],
    queryFn: ({ pageParam }) =>
      Api.get(
        `/mypage/outbounds?limit=${limit}${pageParam ? `&cursor=${pageParam}` : ""}`,
        RecentViewedResponseSchema,
      ),
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
  });
}
