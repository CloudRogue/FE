import cn from "@/src/shared/lib/cn";
import Button from "@/src/shared/ui/button";
import { ExternalLink } from "lucide-react";

export const ManagementStepButton = ({
  label,
  disabled,
  onClick,
}: {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}) => (
  <Button
    disabled={disabled}
    onClick={onClick}
    className={cn(
      "w-full h-12 rounded-xl flex items-center justify-center gap-2 font-bold transition-colors",
      disabled
        ? "bg-slate-200 text-slate-300"
        : "bg-blue-500 text-white hover:bg-blue-600",
    )}
  >
    {label} <ExternalLink size={18} />
  </Button>
);
