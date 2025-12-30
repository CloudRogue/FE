"use client";

import React, { useState, useRef, useEffect, forwardRef } from "react";
import cn from "@/src/shared/lib/cn";

export interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  align?: "left" | "right" | "center";
}

const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  ({ trigger, children, className, align = "center" }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerButtonRef = useRef<HTMLButtonElement>(null);
    
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
      if (!isOpen) {
        return;
      }

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setIsOpen(false);
          triggerButtonRef.current?.focus();
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [isOpen]);

    const alignClass = {
      left: "left-0",
      right: "right-0",
      center: "left-1/2 -translate-x-1/2",
    };

    return (
      <div className="relative inline-block" ref={containerRef}>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="cursor-pointer"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          {trigger}
        </button>

        {isOpen && (
          <div
            ref={ref}
            role="dialog"
            className={cn(
              "absolute z-50 mt-2 min-2-[150px] overflow-hidden rounded-lg border border-gray-200 bg-white p-3 shadow-lg animate-in fade-in zoom-in duration-150",
              alignClass[align],
              className,
            )}
          >
            {children}
          </div>
        )}
      </div>
    );
  },
);

Popover.displayName = "Popover";

export default Popover;
