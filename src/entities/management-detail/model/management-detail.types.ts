import {
  AnnouncementDetailManagementSchema,
  AnnouncementDocumentSchema,
} from "@/src/entities/management-detail";
import z from "zod";

export type AnnouncementDocument = z.infer<typeof AnnouncementDocumentSchema>;
export type AnnouncementDetailManagement = z.infer<
  typeof AnnouncementDetailManagementSchema
>;
