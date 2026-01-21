"use client";

import cn from "@/src/shared/lib/cn";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface AccordionProps {
  title: React.ReactNode;
  subTitle?: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  defaultOpen?: boolean;
  children: React.ReactNode;
  className?: string;
  btnClassName?: string;
  useIcon?: boolean;
}

export function Accordion({
  title,
  subTitle,
  isOpen: externalOpen,
  onToggle,
  defaultOpen = false,
  children,
  className,
  btnClassName,
  useIcon = true,
}: AccordionProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isCurrentlyOpen =
    externalOpen !== undefined ? externalOpen : internalOpen;

  const handleToggle = () => {
    if (onToggle) onToggle();
    else setInternalOpen((prev) => !prev);
  };

  return (
    <div
      className={cn(
        "border border-gray-100 rounded-md overflow-hidden bg-white",
        className,
      )}
    >
      {useIcon ? (
        <button
          type="button"
          onClick={handleToggle}
          className={cn(
            "flex justify-between items-center w-full p-4 bg-white transition-colors",
            isCurrentlyOpen && "border-b border-gray-100",
            btnClassName,
          )}
        >
          <span className="text-h5 text-black text-left">{title}</span>
          <ChevronDown
            className={cn(
              "text-gray-700 transition-transform duration-200",
              isCurrentlyOpen ? "rotate-180" : "rotate-0",
            )}
            size={24}
          />
        </button>
      ) : (
        <div className="px-4 py-3 bg-white border-b border-gray-100 text-h5 text-black">
          {title}
        </div>
      )}

      {/* 애니메이션 핵심 영역 */}
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isCurrentlyOpen
            ? "grid-rows-[1fr] opacity-100 visible"
            : "grid-rows-[0fr] opacity-0 invisible",
        )}
      >
        <div className="overflow-hidden">
          <div className="bg-gray-white p-4">{children}</div>
        </div>
      </div>

      {!useIcon && (
        <button
          type="button"
          onClick={handleToggle}
          className="w-full flex items-center justify-center gap-1 p-2 bg-gray-bg"
        >
          <span className="text-gray-700 text-caption1 font-medium">
            {subTitle}
          </span>
          <ChevronDown
            className={cn(
              "text-gray-400 transition-transform duration-200",
              isCurrentlyOpen ? "rotate-180" : "rotate-0",
            )}
            size={16}
          />
        </button>
      )}
    </div>
  );
}
