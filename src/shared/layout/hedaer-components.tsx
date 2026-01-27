"use client";

import { ROUTES } from "@/src/shared/constants/routes";
import MainLogo from "@/src/shared/ui/icons/main-zipchak.svg";
import { Progress } from "@/src/shared/ui/progress";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

// LEFT 영역 ===================================
interface HeaderLeftProps {
  type?: string;
  title?: string;
  onBack: () => void;
}

export const HeaderLeft = ({ type, title, onBack }: HeaderLeftProps) => {
  const showBackButton = ["CENTER_TITLE", "SEARCH", "PROGRESS"].includes(
    type || "",
  );

  if (showBackButton) {
    return (
      <div role="button" onClick={onBack} className="p-1 -ml-1">
        <ChevronLeft size={24} className="text-slate-700" />
      </div>
    );
  }

  if (type === "LEFT_TITLE") {
    return <h1 className="text-h1 text-slate-900">{title}</h1>;
  }

  return (
    <Link href={ROUTES.HOME} aria-label="집착 홈 로고">
      <MainLogo width={60} className="text-primary-blue" />
    </Link>
  );
};

// CENTER 영역 ===================================
interface HeaderCenterProps {
  type?: string;
  title?: string;
}

export const HeaderCenter = ({ type, title }: HeaderCenterProps) => {
  if (type === "PROGRESS") {
    return <Progress value={10} />;
  }

  if (type === "CENTER_TITLE") {
    return (
      <div className="absolute left-1/2 -translate-x-1/2 font-bold text-[18px] text-slate-900 whitespace-nowrap">
        {title}
      </div>
    );
  }

  return null;
};
