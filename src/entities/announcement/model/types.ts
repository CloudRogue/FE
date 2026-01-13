import type { z } from "zod";
import type {
  AnnouncementSchema,
  AnnouncementFilterParamsSchema,
  AnnouncementListResponseSchema,
} from "./schemas";

export type Announcement = z.infer<typeof AnnouncementSchema>;

export type AnnouncementFilterParams = z.infer<
  typeof AnnouncementFilterParamsSchema
>;

export type AnnouncementListResponse = z.infer<
  typeof AnnouncementListResponseSchema
>;
