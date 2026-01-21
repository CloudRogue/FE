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
  const handleToggle = onToggle || (() => setInternalOpen(!internalOpen));
  return (
    <div
      className={cn(
        "border border-gray-100 rounded-md overflow-hidden transition-all",
        className,
      )}
    >
      {useIcon ? (
        <button
          type="button"
          onClick={handleToggle}
          className={cn(
            "flex justify-between items-center w-full p-4 bg-white",
            isCurrentlyOpen ? "border-b-2 border-gray-100" : "",
            btnClassName,
          )}
        >
          <span className="text-h5 text-black">{title}</span>
          <ChevronDown
            className={cn(
              "text-gray-700 transition-transform duration-200",
              isCurrentlyOpen ? "rotate-180" : "rotate-0",
            )}
            size={24}
          />
        </button>
      ) : (
        <div
          className={cn(
            "w-full bg-white",
            isCurrentlyOpen ? "border-b-2 border-gray-100" : "",
            btnClassName,
          )}
        >
          <div className="p-4 text-h5 text-black border-b-2 border-gray-100">
            {title}
          </div>
          <button
            type="button"
            onClick={handleToggle}
            className="w-full flex item-center justify-center gap-1 p-2 bg-gray-50 "
          >
            <span className="text-gray-700 text-caption1 font-medium">
              {subTitle}
            </span>
            <ChevronDown
              className={cn(
                "mt-px text-gray-400 transition-transform duration-200",
                isCurrentlyOpen ? "rotate-180" : "rotate-0",
              )}
              size={16}
            />
          </button>
        </div>
      )}

      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isCurrentlyOpen ? "min-h-1 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="bg-gray-50">{children}</div>
      </div>
    </div>
  );
}
