import { MANAGEMENT_STATUS, ManagementStatus } from "@/src/entities/management";

function StatusItem({
  type,
  count,
}: {
  type: ManagementStatus;
  count: number;
}) {
  const { label, colors } = MANAGEMENT_STATUS[type];

  return (
    <div
      style={{ backgroundColor: colors.bg }}
      className="flex flex-col gap-4 p-5 rounded-xl w-full h-auto"
    >
      <span className="text-[15px] text-slate-700">{label}</span>
      <span
        style={{ color: colors.text }}
        className="text-2xl font-bold leading-none"
      >
        {count.toString().padStart(2, "0")}
      </span>
    </div>
  );
}

export function ManagementStatusCard() {
  return (
    <section className="flex gap-4 w-full max-w-7xl mx-auto px-4 py-6">
      <StatusItem type="applying" count={99} />
      <StatusItem type="pending" count={99} />
      <StatusItem type="final" count={99} />
    </section>
  );
}
