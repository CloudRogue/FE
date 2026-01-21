import {
  AnnouncementListResponseSchema,
  type AnnouncementListParams,
  type AnnouncementListResponse,
} from "@/src/entities/mypage-scrap/model/scrap.types";
import { Api } from "@/src/shared/api/api";

export async function getScrappedAnnouncements(params: AnnouncementListParams) {
  const searchParams = new URLSearchParams();
  if (params.cursor) searchParams.append("cursor", params.cursor.toString());
  searchParams.append("limit", (params.limit ?? 20).toString());

  return await Api.get<AnnouncementListResponse>(
    `/mypage/scraps?${searchParams.toString()}`,
    AnnouncementListResponseSchema,
  );
}
