import cn from "@/src/shared/lib/cn";
import Button from "@/src/shared/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export const ManagementStepButton = ({
  label,
  href,
  disabled,
}: {
  label: string;
  href: string;
  disabled?: boolean;
}) => (
  <Link href={href} target="_blank">
    <Button
      disabled={disabled}
      className={cn(
        "w-full h-11 rounded-xl flex items-center justify-center gap-2 font-bold transition-colors",
        disabled
          ? "bg-slate-200 text-slate-500"
          : "bg-blue-500 text-white hover:bg-blue-600",
      )}
    >
      {label} <ExternalLink size={18} />
    </Button>
  </Link>
);
