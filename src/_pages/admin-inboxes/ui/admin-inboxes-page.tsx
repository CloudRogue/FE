import { AdminInboxesTable } from "@/src/widgets/admin-inboxes";
import { ADMIN_INBOXES_MOCK } from "@/src/widgets/admin-inboxes/constants/admin-inboxes-mock.constants";

export default function AdminInboxesPage() {
  return (
    <div className="w-full p-6">
      <section className="rounded-lg  bg-white">
        <AdminInboxesTable items={ADMIN_INBOXES_MOCK} />
      </section>
    </div>
  );
}
