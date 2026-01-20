import {
  AnnouncementListResponseSchema,
  type AnnouncementListParams,
  type AnnouncementListResponse,
} from "@/src/entities/mypage-scrap";
import { Api } from "@/src/shared/api/api";

// 내가 찜한 공고 리스트 조회
export async function getScrappedAnnouncements(params: AnnouncementListParams) {
  const searchParams = new URLSearchParams({
    page: (params.page ?? 0).toString(),
    size: (params.size ?? 20).toString(),
  });

  return await Api.get<AnnouncementListResponse>(
    `/mypage/scraps?${searchParams.toString()}`,
    AnnouncementListResponseSchema,
  );
}
