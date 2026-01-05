"use server";

import { ApiErrorSchema } from "@/src/entities/announcement-detail/model/announcement.types";

export async function postOutboundLog(announcementId: number) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/announcements/${announcementId}/outbound`,
      {
        method: "POST",
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      const validatedError = ApiErrorSchema.safeParse(errorData);

      if (validatedError.success) {
        throw new Error(validatedError.data.message);
      }
      throw new Error("신청 기록 중 오류가 발생했습니다.");
    }

    return { success: true };
  } catch (error) {
    console.error("Outbound API Error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "알 수 없는 에러",
    };
  }
}
