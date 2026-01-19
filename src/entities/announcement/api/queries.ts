import { Api } from "@/src/shared/api/api";
import { AnnouncementListResponseSchema } from "@/src/entities/announcement/model/schemas";
import type { AnnouncementFilterParams } from "@/src/entities/announcement/model/types";

export const announcementQueries = {
  /**
   * 맞춤 공고 목록 (온보딩 완료 사용자 전용)
   */
  personalized: (params: AnnouncementFilterParams) => ({
    queryKey: [
      "announcements",
      "personalized",
      params.sort ?? "RELEVANCE",
    ] as const,
    queryFn: async ({ pageParam }: { pageParam?: string | null }) => {
      const searchParams = new URLSearchParams();
      if (pageParam) searchParams.append("cursor", pageParam);
      if (params.limit) searchParams.append("limit", String(params.limit));
      if (params.sort) searchParams.append("sort", params.sort);

      return Api.get(
        `/announcements/search/personalized?${searchParams.toString()}`,
        AnnouncementListResponseSchema,
      );
    },
  }),

  /**
   * 일반 상태별 공고 목록 (접수 중, 접수 전, 마감 등)
   */
  byStatus: (
    status: "open" | "upcoming" | "closed" | "announcement-pending",
    params: AnnouncementFilterParams,
  ) => ({
    queryKey: ["announcements", status, params.sort ?? "DEADLINE"] as const,
    queryFn: async ({ pageParam }: { pageParam?: string | null }) => {
      const searchParams = new URLSearchParams();
      if (pageParam) searchParams.append("cursor", pageParam);
      if (params.limit) searchParams.append("limit", String(params.limit));
      if (params.sort) searchParams.append("sort", params.sort);

      return Api.get(
        `/api/announcements/search/${status}?${searchParams.toString()}`,
        AnnouncementListResponseSchema,
      );
    },
  }),

  /**
   * 카테고리별 상세 검색 (지역명, 발행처, 주택유형)
   */
  search: (
    type: "region" | "publisher" | "housing-type",
    params: AnnouncementFilterParams,
  ) => ({
    queryKey: ["announcements", "search", type, params] as const,
    queryFn: async ({ pageParam }: { pageParam?: string | null }) => {
      const searchParams = new URLSearchParams();

      // 검색 유형에 따른 필수 파라미터 매핑
      if (type === "region" && params.regionName)
        searchParams.append("regionName", params.regionName);
      if (type === "publisher" && params.publisher)
        searchParams.append("publisher", params.publisher);
      if (type === "housing-type" && params.housingType)
        searchParams.append("housingType", params.housingType);

      if (pageParam) searchParams.append("cursor", pageParam);
      if (params.limit) searchParams.append("limit", String(params.limit));
      if (params.sort) searchParams.append("sort", params.sort);

      return Api.get(
        `/announcements/search/${type}?${searchParams.toString()}`,
        AnnouncementListResponseSchema,
      );
    },
  }),
};
