import AdminInboxesTable from "@/src/widgets/admin-inboxes/ui/admin-inboxes-table";
import { ADMIN_INBOXES_MOCK } from "@/src/widgets/admin-inboxes/constants/mock";

export default function AdminInboxesPage() {
  return (
    <main className="w-full p-6">
      <section className="rounded-lg  bg-white">
        <AdminInboxesTable items={ADMIN_INBOXES_MOCK} />
      </section>
    </main>
  );
}
