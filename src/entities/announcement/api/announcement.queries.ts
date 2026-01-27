import { Api } from "@/src/shared/api/api";
import { AnnouncementListResponseSchema } from "@/src/entities/announcement/model/announcement.schemas";
import type { AnnouncementFilterParams } from "@/src/entities/announcement/model/announcement.types";

export const announcementQueries = {
  /**
   * 맞춤 공고 목록 (온보딩 완료 사용자 전용)
   * 명세: sort 파라미터로 RELEVANCE, LATEST, DEADLINE 허용
   */
  personalized: (params: AnnouncementFilterParams) => ({
    queryKey: [
      "announcements",
      "personalized",
      params.sort ?? "RELEVANCE",
    ] as const,
    queryFn: async ({ pageParam }: { pageParam?: string | null }) => {
      const searchParams = new URLSearchParams();

      // 필수 파라미터: limit (서버 에러 방지를 위해 명시적 전송)
      searchParams.append("limit", String(params.limit ?? 20));

      if (pageParam) searchParams.append("cursor", pageParam);

      // personalized는 RELEVANCE가 기본값이며 허용됨
      if (params.sort) searchParams.append("sort", params.sort);

      return Api.get(
        `/announcements/search/personalized?${searchParams.toString()}`,
        AnnouncementListResponseSchema,
      );
    },
  }),

  /**
   * 일반 상태별 공고 목록 (접수 중, 접수 전, 마감 등)
   * 명세: open, upcoming은 LATEST, DEADLINE만 허용 (RELEVANCE 불가)
   * 명세: closed, announcement-pending은 sort 파라미터 없음
   */
  byStatus: (
    status: "open" | "upcoming" | "closed" | "announcement-pending",
    params: AnnouncementFilterParams,
  ) => {
    // closed나 pending 상태는 명세상 sort 파라미터를 받지 않음
    const hasSort = status === "open" || status === "upcoming";
    const currentSort = hasSort
      ? params.sort === "RELEVANCE"
        ? "DEADLINE"
        : params.sort
      : undefined;

    return {
      queryKey: ["announcements", status, currentSort ?? "DEFAULT"] as const,
      queryFn: async ({ pageParam }: { pageParam?: string | null }) => {
        const searchParams = new URLSearchParams();

        searchParams.append("limit", String(params.limit ?? 20)); // 필수

        if (pageParam) searchParams.append("cursor", pageParam);

        // 명세에 정의된 경우에만 sort 추가 (RELEVANCE 방어 로직 포함)
        if (hasSort && currentSort) {
          searchParams.append("sort", currentSort);
        }

        return Api.get(
          `/announcements/search/${status}?${searchParams.toString()}`,
          AnnouncementListResponseSchema,
        );
      },
    };
  },

  /**
   * 카테고리별 상세 검색 (지역명, 발행처, 주택유형)
   * 명세: 필수 검색어(regionName 등)가 누락되면 안 됨
   * 명세: sort는 LATEST, DEADLINE만 허용
   */
  search: (
    type: "region" | "publisher" | "housing-type",
    params: AnnouncementFilterParams,
  ) => {
    // 검색 API도 RELEVANCE를 허용하지 않으므로 DEADLINE으로 치환
    const currentSort = params.sort === "RELEVANCE" ? "DEADLINE" : params.sort;

    return {
      queryKey: ["announcements", "search", type, params] as const,
      queryFn: async ({ pageParam }: { pageParam?: string | null }) => {
        const searchParams = new URLSearchParams();

        // 1. 유형별 필수 쿼리 파라미터 처리
        if (type === "region" && params.regionName)
          searchParams.append("regionName", params.regionName);
        if (type === "publisher" && params.publisher)
          searchParams.append("publisher", params.publisher);
        if (type === "housing-type" && params.housingType)
          searchParams.append("housingType", params.housingType);

        // 2. 공통 파라미터 (limit은 필수)
        searchParams.append("limit", String(params.limit ?? 20));

        if (pageParam) searchParams.append("cursor", pageParam);
        if (currentSort) searchParams.append("sort", currentSort);

        return Api.get(
          `/announcements/search/${type}?${searchParams.toString()}`,
          AnnouncementListResponseSchema,
        );
      },
    };
  },
};
