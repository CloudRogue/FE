import { z } from "zod";

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

export const CursorMetaSchema = z.object({
  limit: z.number().int(),
  hasNext: z.boolean(),
  nextCursor: z.string().nullable(),
});

export const AnnouncementFilterParamsSchema = z.object({
  regionCode: z.string().optional(),
  publisher: z.string().optional(),
  housingType: z.string().optional(),
  sort: z.enum(["LATEST", "DEADLINE"]).optional(),

  // cursor pagination
  cursor: z.string().nullable().optional(),
  limit: z.number().int().min(1).max(100).optional(),
});

export const AnnouncementListResponseSchema = z.object({
  data: z.array(AnnouncementSchema),
  meta: CursorMetaSchema,
});
