import Popover from "@/src/shared/ui/popover";

interface SummaryRowProps {
  label: string;
  value: string;
  children?: React.ReactNode;
}

export function OverviewRow({ label, value, children }: SummaryRowProps) {
  return (
    <div className="flex justify-between py-2 text-[15px] ">
      <span className="text-gray-500">{label}</span>
      <div>
        <span className="text-black text-right">{value}</span>
        {children && (
          <Popover
            align="right"
            className="w-75 p-6 rounded-3xl border-none shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
            trigger={
              <span className="px-2 py-1 text-[11px] font-bold text-white bg-[#437CFF] rounded-sm cursor-pointer hover:bg-blue-600 transition-colors">
                전체보기
              </span>
            }
          >
            {children}
          </Popover>
        )}
      </div>
    </div>
  );
}
