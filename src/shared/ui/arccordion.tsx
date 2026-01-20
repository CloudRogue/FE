"use client";

import cn from "@/src/shared/lib/cn";
import Button from "@/src/shared/ui/button";
import { ChevronDown } from "lucide-react";
import { ReactNode, useState } from "react";

interface AccordionProps {
  title: ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  defaultOpen?: boolean;
  children: ReactNode;
  className?: string;
  btnClassName?: string;
}

export function Accordion({
  title,
  isOpen: externalOpen,
  onToggle,
  defaultOpen = false,
  children,
  className,
  btnClassName,
}: AccordionProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isCurrentlyOpen =
    externalOpen !== undefined ? externalOpen : internalOpen;
  const handleToggle = onToggle || (() => setInternalOpen(!internalOpen));
  return (
    <div
      className={cn(
        "border border-gray-200 rounded-2xl overflow-hidden transition-all",
        className,
      )}
    >
      <Button
        onClick={handleToggle}
        className={cn(
          "flex justify-between items-center w-full p-4 bg-white",
          isCurrentlyOpen ? "border-b-2 border-gray-100" : "",
          btnClassName,
        )}
      >
        <span className="font-bold text-[#1E293B]">{title}</span>
        <ChevronDown
          className={cn(
            "text-gray-900 transition-transform duration-200",
            isCurrentlyOpen ? "rotate-180" : "rotate-0",
          )}
          size={24}
        />
      </Button>

      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isCurrentlyOpen ? "max-h-250 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="bg-gray-50">{children}</div>
      </div>
    </div>
  );
}
