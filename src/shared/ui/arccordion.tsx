"use client";

import cn from "@/src/shared/lib/cn";
import Button from "@/src/shared/ui/button";
import { ChevronDown } from "lucide-react";
import { ReactNode } from "react";

interface AccordionProps {
  title: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
  className?: string;
}

export function Accordion({
  title,
  isOpen,
  onToggle,
  children,
  className,
}: AccordionProps) {
  return (
    <div
      className={cn(
        "border-2 border-gray-100 rounded-2xl overflow-hidden transition-all",
        className,
      )}
    >
      <Button
        onClick={onToggle}
        className={cn(
          "flex justify-between items-center w-full p-4 bg-white",
          isOpen ? "border-b-2 border-gray-100" : "",
        )}
      >
        <span className="font-bold text-[#1E293B]">{title}</span>
        <ChevronDown
          className={cn(
            "text-gray-900 transition-transform duration-200",
            isOpen ? "rotate-180" : "rotate-0",
          )}
          size={24}
        />
      </Button>

      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-250 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="bg-gray-50">{children}</div>
      </div>
    </div>
  );
}
