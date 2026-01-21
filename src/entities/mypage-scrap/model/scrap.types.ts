import { z } from "zod";

export const AnnouncementStatusSchema = z.enum([
  "OPEN",
  "DUE_SOON",
  "UPCOMING",
  "CLOSED",
]);

export const AnnouncementItemSchema = z.object({
  announcementId: z.number().int(),
  title: z.string(),
  housingType: z.string(), 
  startDate: z.string(),
  endDate: z.string(),
  publishedAt: z.string(),
  publisher: z.string(),
  status: AnnouncementStatusSchema,
});


export const AnnouncementListResponseSchema = z.object({
  items: z.array(AnnouncementItemSchema),
  nextCursor: z.number().int().nullable(), 
  hasNext: z.boolean(),
});

export type AnnouncementItem = z.infer<typeof AnnouncementItemSchema>;
export type AnnouncementListResponse = z.infer<
  typeof AnnouncementListResponseSchema
>;

export const AnnouncementListParamsSchema = z.object({
  cursor: z.number().int().optional(),
  limit: z.number().int().min(1).max(100).default(20),
});

export type AnnouncementListParams = z.input<
  typeof AnnouncementListParamsSchema
>;
