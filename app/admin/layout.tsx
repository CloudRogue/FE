import { AdminSidebar } from "@/src/widgets/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#F8F9FB]">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto p-4">
        <div className="max-w-300 mx-auto">{children}</div>
      </main>
    </div>
  );
}
