import { z } from "zod";
import { PageMetaSchema } from "@/src/shared/api/base-schemas";

export const AnnouncementSchema = z.object({
  announcementId: z.number().int(),
  title: z.string(),
  housingType: z.string().nullable(),
  startDate: z.string(),
  endDate: z.string(),
  publishedAt: z.string(),
  publisher: z.string(),
  status: z.enum(["OPEN", "DUE_SOON", "UPCOMING", "CLOSED"]),
});

export const AnnouncementFilterParamsSchema = z.object({
  regionCode: z.string().optional(),
  publisher: z.string().optional(),
  housingType: z.string().optional(),
  page: z.number().int().optional(),
  size: z.number().int().optional(),
  sort: z.enum(["LATEST", "DEADLINE"]).optional(),
});

export const AnnouncementListResponseSchema = z.object({
  data: z.array(AnnouncementSchema),
  meta: PageMetaSchema,
});

export type Announcement = z.infer<typeof AnnouncementSchema>;
export type AnnouncementFilterParams = z.infer<
  typeof AnnouncementFilterParamsSchema
>;
export type AnnouncementListResponse = z.infer<
  typeof AnnouncementListResponseSchema
>;
