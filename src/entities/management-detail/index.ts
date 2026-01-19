// model
export {
  AnnouncementDetailManagementSchema,
  AnnouncementDocumentSchema,
  DocumentScopeSchema,
} from "@/src/entities/management-detail/model/management-detail.schema";
export { type AnnouncementDetailManagement } from "@/src/entities/management-detail/model/management-detail.types";

// api
export { getAnnouncementApplicationDetail } from "@/src/entities/management-detail/api/management-detail.action";
export { managementDetailQueries } from "@/src/entities/management-detail/api/management-detail.queries";

// ui
export { ManagementDocumentItem } from "@/src/entities/management-detail/ui/management-document-item";
export { ManagementStepButton } from "@/src/entities/management-detail/ui/management-step-button";
export { ManagementStepSection } from "@/src/entities/management-detail/ui/management-step-section";
