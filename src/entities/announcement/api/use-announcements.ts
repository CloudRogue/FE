import { useInfiniteQuery } from "@tanstack/react-query";
import type { InfiniteData } from "@tanstack/react-query";
import { announcementQueries } from "@/src/entities/announcement/api/queries";
import type {
  AnnouncementFilterParams,
  AnnouncementListResponse,
} from "@/src/entities/announcement/model/types";

/**
 * 공고 목록을 조회하는 통합 인피니트 쿼리 훅
 * @param type - 조회 유형 ('personalized' | 'open' | 'upcoming' | 'closed' | 'region' | 'publisher' | 'housing-type')
 * @param filters - 검색 필터 파라미터
 */
export function useAnnouncements(
  type:
    | "personalized"
    | "open"
    | "upcoming"
    | "closed"
    | "region"
    | "publisher"
    | "housing-type",
  filters: AnnouncementFilterParams,
) {
  const getQueryConfig = () => {
    if (type === "personalized") {
      return announcementQueries.personalized(filters);
    }

    if (["open", "upcoming", "closed"].includes(type)) {
      return announcementQueries.byStatus(type as any, filters);
    }

    return announcementQueries.search(type as any, filters);
  };

  const queryConfig = getQueryConfig();

  return useInfiniteQuery<
    AnnouncementListResponse,
    Error,
    InfiniteData<AnnouncementListResponse>,
    ReturnType<typeof getQueryConfig>["queryKey"],
    string | null
  >({
    ...queryConfig,
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNext ? lastPage.meta.nextCursor : undefined,
  });
}
