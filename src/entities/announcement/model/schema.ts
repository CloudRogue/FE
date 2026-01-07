import { z } from "zod";
import { PageMetaSchema } from "@/src/shared/api/base-schemas";

export const AnnouncementSchema = z.object({
  announcementId: z.number().int(),
  title: z.string(),
  housingType: z.string().nullable(),
  startDate: z.string(),
  endDate: z.string(),
  pulbishedAt: z.string(),
  publisher: z.string(),
  status: z.enum(["OPEN", "DUE_SOON", "UPCOMING", "CLOSED"]),
});


export const AnnouncementListResponseSchema= z.object({
    data:z.array(AnnouncementSchema),
    meta:PageMetaSchema,
});

export type Announcemet = z.infer<typeof AnnouncementSchema>;
export type AnnouncementListResponse = z.infer<typeof AnnouncementListResponseSchema>;
