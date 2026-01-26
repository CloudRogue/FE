import {
  BaseManageSchema,
  GetManageAppliedSchema,
  GetManageClosedSchema,
  GetManageDocumentWaitingSchema,
  GetManageFinalWaitingSchema,
  ManageAppliedSchema,
  ManageClosedSchema,
  ManageDocumentWaitingSchema,
  ManageFinalWaitingSchema,
} from "@/src/entities/management/model/management.schema";
import { z } from "zod";

// 기본 정보 타입
export type BaseManage = z.infer<typeof BaseManageSchema>;

export type ManagementResponse =
  | z.infer<typeof GetManageAppliedSchema>
  | z.infer<typeof GetManageDocumentWaitingSchema>
  | z.infer<typeof GetManageFinalWaitingSchema>
  | z.infer<typeof GetManageClosedSchema>;

export type AnyManagedAnnouncement =
  | z.infer<typeof ManageAppliedSchema>
  | z.infer<typeof ManageDocumentWaitingSchema>
  | z.infer<typeof ManageFinalWaitingSchema>
  | z.infer<typeof ManageClosedSchema>;
