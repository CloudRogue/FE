import Popover from "@/src/shared/ui/popover";

interface SummaryRowProps {
  label: string;
  value: React.ReactNode;
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

export function OverviewRow({
  label,
  value,
  children,
  isOpen,
  onClose,
}: SummaryRowProps) {
  return (
    <div className="flex justify-between items-center py-2 text-[15px]">
      <span className="text-gray-400 font-medium">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-gray-900 font-semibold">{value}</span>
        {children && (
          <Popover
            align="right"
            center={true}
            isOpen={isOpen}
            onClose={onClose}
            className="w-[calc(100%-40px)] max-w-100 p-6 rounded-2xl border-none shadow-[0_10px_40px_rgba(0,0,0,0.15)]"
            trigger={
              <span className="px-2 py-1 text-[11px] font-bold text-white bg-[#437CFF] rounded-md cursor-pointer">
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
