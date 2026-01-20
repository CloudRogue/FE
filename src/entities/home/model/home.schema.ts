import { z } from "zod";

export const bannerResponseSchema = z
  .object({
    announcementId: z.number().int(),
    title: z.string(),
    reasonTag: z.string(),
  })
  .nullable();
