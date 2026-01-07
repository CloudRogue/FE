import type {
  AnnouncementFilterParams,
  AnnouncementListResponse,
} from "../model/types";

export const announcementQueries = {
  open: (params: AnnouncementFilterParams) => ({
    queryKey: ["announcements", "open", params] as const,
    queryFn: async (): Promise<AnnouncementListResponse> => {
      const searchParams = new URLSearchParams();

      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          searchParams.append(key, String(value));
        }
      });

      const response = await fetch(
        `/api/announcements/open?${searchParams.toString()}`,
      );
      if (!response.ok) throw new Error("공고 데이터를 불러오지 못했습니다.");

      return response.json();
    },
  }),
};
