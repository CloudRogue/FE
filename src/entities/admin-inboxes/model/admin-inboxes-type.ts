import { z } from "zod";

export const AdminInboxPublisherSchema = z.enum(["LH", "SH"]);

export const AdminInboxItemSchema = z.object({
  announcementId: z.number(),
  publisher: AdminInboxPublisherSchema,
  createdAt: z.string(), // ISO-8601
  title: z.string(),
});

export const AdminInboxesResponseSchema = z.object({
  data: z.array(AdminInboxItemSchema),
});

export type AdminInboxItem = z.infer<typeof AdminInboxItemSchema>;
export type AdminInboxesResponse = z.infer<typeof AdminInboxesResponseSchema>;
