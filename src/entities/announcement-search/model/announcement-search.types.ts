import {
  AnnouncementSearchRequestSchema,
  AnnouncementSearchResponseSchema,
  AnnouncementSearchSchema,
} from "@/src/entities/announcement-search";
import z from "zod";

export type AnnouncementSearch = z.infer<typeof AnnouncementSearchSchema>;
export type AnnouncementSearchResponse = z.infer<
  typeof AnnouncementSearchResponseSchema
>;
export type AnnouncementSearchRequest = z.infer<
  typeof AnnouncementSearchRequestSchema
>;
