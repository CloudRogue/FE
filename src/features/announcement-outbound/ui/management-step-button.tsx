"use client";

import { postOutboundLog } from "@/src/features/announcement-outbound";
import { ROUTES } from "@/src/shared/constants/routes";
import Button from "@/src/shared/ui/button";
import Popover from "@/src/shared/ui/popover";
import { Check, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface ManagementStepButtonProps {
  href: string;
  disabled?: boolean;
  announcementId: number;
}

export const ManagementStepButton = ({
  href,
  disabled,
  announcementId,
}: ManagementStepButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleLinkClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    postOutboundLog(announcementId).catch((err) =>
      console.error("Failed to post outbound log:", err),
    );
    setIsOpen(true);
  };

  return (
    <Popover
      center
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      trigger={
        <Link
          href={disabled ? "" : href}
          target={disabled ? undefined : "_blank"}
          onClick={handleLinkClick}
        >
          <Button disabled={disabled} className="w-full">
            공고 지원하기 <ExternalLink size={18} />
          </Button>
        </Link>
      }
    >
      <div className="w-full flex flex-col items-center text-center gap-6">
        <div className="p-4 bg-primary-50 rounded-full flex items-center justify-center">
          <Check width={32} height={32} className="text-primary-blue" />
        </div>
        <div>
          <h3 className="text-h1 mb-3">지원을 무사히 마쳤어요!</h3>
          <p className="text-body1 text-gray-500">
            다음 단계도 놓치지 않게
            <br />
            '집착'이 꼼꼼히 알려드릴게요.
          </p>
        </div>
        <div className="w-full flex flex-col gap-3">
          <Link href={ROUTES.MANAGEMENT}>
            <Button className="w-full">내 지원 현황 보기</Button>
          </Link>
          <Link href={ROUTES.HOME}>
            <Button className="w-full" variant="secondary">
              홈으로 가기
            </Button>
          </Link>
        </div>
      </div>
    </Popover>
  );
};
