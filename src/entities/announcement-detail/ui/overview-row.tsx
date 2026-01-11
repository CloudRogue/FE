interface SummaryRowProps {
  label: string;
  value: string;
}

export function OverviewRow({ label, value }: SummaryRowProps) {
  return (
    <div className="flex justify-between py-2 text-[15px] ">
      <span className="text-gray-500">{label}</span>
      <span className="text-black text-right">{value}</span>
    </div>
  );
}
