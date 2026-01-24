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
    <div className="flex justify-between items-center mb-4">
      <span className="text-gray-700 text-body1">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-h4 font-semibold">{value}</span>
        {popover && (
          <Popover
            align="right"
            center={true}
            isOpen={popover.isOpen}
            onClose={popover.onClose}
            trigger={popover.trigger}
          >
            {popover.children}
          </Popover>
        )}
      </div>
    </div>
  );
}
