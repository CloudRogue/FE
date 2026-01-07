"use server";

import { Api } from "@/src/shared/api/api";
import z from "zod";

export async function postOutboundLog(announcementId: number) {
  return await Api.post(
    `/announcements/${announcementId}/outbound`,
    z.unknown(),
    {},
  );
}
