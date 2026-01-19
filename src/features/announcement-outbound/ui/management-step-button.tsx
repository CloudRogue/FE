"use client";

import { postOutboundLog } from "@/src/features/announcement-outbound";
import cn from "@/src/shared/lib/cn";
import Button from "@/src/shared/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

interface ManagementStepButtonProps {
  label: string;
  href: string;
  disabled?: boolean;
  announcementId: number;
}

export const ManagementStepButton = ({
  label,
  href,
  disabled,
  announcementId,
}: ManagementStepButtonProps) => {
  const handleLogClick = () => {
    if (disabled) return;
    postOutboundLog(announcementId).catch((err) =>
      console.error("Failed to post outbound log:", err),
    );
  };
  return (
    <Link
      href={disabled ? "#" : href}
      target={disabled ? undefined : "_blank"}
      onClick={handleLogClick}
    >
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
};
