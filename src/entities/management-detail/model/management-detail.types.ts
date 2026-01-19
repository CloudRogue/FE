import { AnnouncementDetailManagementSchema } from "@/src/entities/management-detail";
import z from "zod";

export type AnnouncementDetailManagement = z.infer<
  typeof AnnouncementDetailManagementSchema
>;
