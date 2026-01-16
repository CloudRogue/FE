import { Api } from "@/src/shared/api/api";
import { AdminInboxesResponseSchema } from "@/src/entities/admin-inboxes/model/admin-inboxes-type";

export function getAdminInboxes() {
  return Api.get("/api/admin/inboxes", AdminInboxesResponseSchema);
}
