import {
  MANAGEMENT_STATUS,
  ManagementStatus,
  ManagementSummary,
} from "@/src/entities/management";

interface StatusItemProps {
  type: ManagementStatus;
  count: number;
}

function StatusItem({ type, count }: StatusItemProps) {
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

interface ManagementStatusCardProps {
  summary?: ManagementSummary;
}

export function ManagementStatusCard({ summary }: ManagementStatusCardProps) {
  return (
    <section className="flex gap-4 w-full max-w-7xl mx-auto px-4 py-6 bg-white">
      <StatusItem type="APPLYING" count={summary?.applyingCount ?? 0} />
      <StatusItem
        type="DOCUMENT_PENDING"
        count={summary?.documentWaitingCount ?? 0}
      />
      <StatusItem
        type="FINAL_PENDING"
        count={summary?.finalWaitingCount ?? 0}
      />
    </section>
  );
}
