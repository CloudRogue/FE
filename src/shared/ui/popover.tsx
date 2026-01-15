"use client";

import cn from "@/src/shared/lib/cn";
import React, { forwardRef, useEffect, useRef, useState } from "react";

export interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  align?: "left" | "right" | "center";
  isOpen?: boolean;
  onClose?: () => void;
  center?: boolean;
}

const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      trigger,
      children,
      className,
      align = "center",
      isOpen: controlledIsOpen,
      onClose,
      center = false,
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerButtonRef = useRef<HTMLButtonElement>(null);
    const [internalIsOpen, setInternalIsOpen] = useState(false);

    const isOpen =
      controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

    const setIsOpen = (value: boolean | ((prev: boolean) => boolean)) => {
      const newValue = typeof value === "function" ? value(isOpen) : value;
      if (onClose && !newValue) onClose();
      setInternalIsOpen(newValue);
    };

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
    }, [isOpen]);
    useEffect(() => {
      if (!isOpen) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setIsOpen(false);
          triggerButtonRef.current?.focus();
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);

    const alignClass = {
      left: "left-0",
      right: "right-0",
      center: "left-1/2 -translate-x-1/2",
    };

    const popoverClass = cn(
      "z-50 overflow-hidden bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100",
      "animate-in fade-in zoom-in-95 duration-200 ease-out",
      center
        ? "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[24px] p-6 w-[calc(100%-40px)] max-w-[400px]"
        : cn("absolute mt-2 rounded-2xl p-2", alignClass[align]),
      className,
    );

    return (
      <div className="relative inline-block" ref={containerRef}>
        <button
          ref={triggerButtonRef}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded-lg"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          {trigger}
        </button>

        {isOpen && (
          <>
            {center && (
              <div
                className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-300"
                onClick={() => setIsOpen(false)}
              />
            )}
            <div
              ref={ref}
              role={center ? "dialog" : "menu"}
              className={popoverClass}
            >
              {children}
            </div>
          </>
        )}
      </div>
    );
  },
);

Popover.displayName = "Popover";
export default Popover;
