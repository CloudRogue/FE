import Popover from "@/src/shared/ui/popover";

interface DetailRowProps {
  label: string;
  value: React.ReactNode;
  popover?: {
    isOpen: boolean;
    onClose: () => void;
    trigger: React.ReactNode;
    children: React.ReactNode;
  };
}

export function DetailRow({ label, value, popover }: DetailRowProps) {
  return (
    <div className="flex justify-between items-center py-2 text-[15px]">
      <span className="text-gray-400 font-medium">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-gray-900 font-semibold">{value}</span>
        {popover && (
          <Popover
            align="right"
            center={true}
            isOpen={popover.isOpen}
            onClose={popover.onClose}
            containerClassName="flex items-center"
            className="w-[calc(100%-40px)] max-w-100 p-6 rounded-2xl border-none shadow-[0_10px_40px_rgba(0,0,0,0.15)]"
            trigger={popover.trigger}
          >
            <div onClick={(e) => e.stopPropagation()}>{popover.children}</div>
          </Popover>
        )}
      </div>
    </div>
  );
}
