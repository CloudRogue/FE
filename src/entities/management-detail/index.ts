// model
export {
  AnnouncementDetailManagementSchema,
  AnnouncementDocumentSchema,
  DocumentScopeSchema,
} from "@/src/entities/management-detail/model/management-detail.schema";
export {
  type AnnouncementDetailManagement,
  type AnnouncementDocument,
} from "@/src/entities/management-detail/model/management-detail.types";

// api
export { getAnnouncementApplicationDetail } from "@/src/entities/management-detail/api/management-detail.action";
export { managementDetailQueries } from "@/src/entities/management-detail/api/management-detail.queries";

// ui
export { ManagementDetailHeader } from "@/src/entities/management-detail/ui/management-detail-header";
export { ManagementDocumentList } from "@/src/entities/management-detail/ui/management-detail-list";
export { ManagementStepSection } from "@/src/entities/management-detail/ui/management-step-section";
