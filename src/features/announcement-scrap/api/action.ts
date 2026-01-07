"use server";

import { Api } from "@/src/shared/api/api";
import { z } from "zod";

const ScrapResponseSchema = z.any();

export async function patchScrap(announcementId: number) {
  return await Api.patch(
    `/announcements/${announcementId}/scrap`,
    ScrapResponseSchema,
    {},
  );
}

export async function deleteScrap(announcementId: number) {
  return await Api.delete(
    `/announcements/${announcementId}/scrap`,
    ScrapResponseSchema,
  );
}
