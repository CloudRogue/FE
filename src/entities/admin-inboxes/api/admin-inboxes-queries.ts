import { AdminInboxesResponseSchema } from "@/src/entities/admin-inboxes/model/admin-inboxes-type";
import { Api } from "@/src/shared/api/api";

export function getAdminInboxes() {
  return Api.get("/admin/inboxes", AdminInboxesResponseSchema);
}
