// model
export {
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

export {
  type AnyManagedAnnouncement,
  type BaseManage,
  type ManagementResponse,
} from "@/src/entities/management/model/management.types";

// api
export {
  getManageApplied,
  getManageClosed,
  getManageDocumentWaiting,
  getManageFinalWaiting,
} from "@/src/entities/management/api/management.action";
export { managementQueries } from "@/src/entities/management/api/management.quries";

// constants
export {
  MANAGEMENT_STATUS,
  MANAGEMENT_STATUS_TYPE,
  MANAGEMENT_TABS,
  type ManagementStatus,
} from "@/src/entities/management/constants/management.constants";

// ui
export { ManagementListCard } from "@/src/entities/management/ui/management-list-card";
export { ManagementStatusBadge } from "@/src/entities/management/ui/management-status-badge";
