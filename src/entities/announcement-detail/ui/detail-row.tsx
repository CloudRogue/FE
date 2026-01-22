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
    <div className="flex justify-between items-center mb-4 text-[15px]">
      <span className="text-gray-700 text-h5">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-h4 font-semibold">{value}</span>
        {popover && (
          <Popover
            align="right"
            center={true}
            isOpen={popover.isOpen}
            onClose={popover.onClose}
            containerClassName="flex items-center"
            trigger={popover.trigger}
          >
            <div onClick={(e) => e.stopPropagation()}>{popover.children}</div>
          </Popover>
        )}
      </div>
    </div>
  );
}
