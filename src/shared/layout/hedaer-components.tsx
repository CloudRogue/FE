"use client";

import { ROUTES } from "@/src/shared/constants/routes";
import MainLogo from "@/src/shared/ui/icons/main-zipchak.svg";
import Search from "@/src/shared/ui/icons/policy/search.svg";
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
    <Link href={ROUTES.HOME}>
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
  if (type === "SEARCH") {
    return (
      <div className="relative w-full ml-2">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />
        <input
          className="w-full bg-slate-100 rounded-lg py-2 pl-10 pr-4 text-sm outline-none focus:bg-slate-200 transition-colors"
          placeholder="검색어를 입력해주세요"
        />
      </div>
    );
  }

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
