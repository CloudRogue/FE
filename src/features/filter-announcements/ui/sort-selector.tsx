"use client";

import { useState, useEffect, useRef } from "react";
import { useFilterStore } from "@/src/features/filter-announcements/model/use-filter-store";
import { ChevronDown } from "lucide-react";
import cn from "@/src/shared/lib/cn";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/src/shared/ui/dropdown";
import Button from "@/src/shared/ui/button";

const SORT_OPTIONS = [
  { label: "마감임박순", value: "DEADLINE" },
  { label: "최신순", value: "LATEST" },
  { label: "인기순", value: "RELEVANCE" },
] as const;

export function SortSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { appliedFilters, setSort } = useFilterStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const currentSort =
    SORT_OPTIONS.find((opt) => opt.value === appliedFilters.sort) ||
    SORT_OPTIONS[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  const handleSelect = (value: (typeof SORT_OPTIONS)[number]["value"]) => {
    setSort(value);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef}>
      <Dropdown>
        <DropdownTrigger>
          <Button
            onClick={() => setIsOpen(!isOpen)}
            variant="ghost"
            className={cn(
              "h-auto p-0 flex items-center gap-1 text-[13px] font-medium text-slate-600 bg-transparent hover:bg-transparent shadow-none border-none",
              "active:opacity-70 transition-opacity",
            )}
          >
            {currentSort.label}
            <ChevronDown
              size={14}
              className={cn(
                "transition-transform duration-200",
                isOpen && "rotate-180",
              )}
            />
          </Button>
        </DropdownTrigger>

        <DropdownContent className="w-32 border border-slate-100/50">
          {SORT_OPTIONS.map((option) => (
            <DropdownItem
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={cn(
                "px-4 py-2.5 text-[14px]",
                appliedFilters.sort === option.value
                  ? " bg-blue-50 "
                  : "text-slate-600",
              )}
            >
              {option.label}
            </DropdownItem>
          ))}
        </DropdownContent>
      </Dropdown>
    </div>
  );
}
