"use client";

import React, { forwardRef, useCallback, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import cn from "@/src/shared/lib/cn";

export interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
  center?: boolean;
  trigger?: ReactNode;
  containerClassName?: string;
}

const Popup = forwardRef<HTMLDivElement, PopupProps>(
  (
    {
      isOpen,
      onClose,
      children,
      className,
      align = "center",
      center = true,
      trigger,
      containerClassName,
    },
    ref,
  ) => {
    const overlayRef = useRef<HTMLDivElement>(null);

    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      },
      [onClose],
    );

    useEffect(() => {
      if (isOpen) {
        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";
      }

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "unset";
      };
    }, [isOpen, handleKeyDown]);

    const positionClasses = center
      ? "items-center justify-center"
      : cn(
          "items-center",
          align === "left" && "justify-start",
          align === "right" && "justify-end",
          align === "center" && "justify-center",
        );

    return (
      <>
        {trigger && (
          <div className={cn("inline-block", containerClassName)}>
            {trigger}
          </div>
        )}

        {isOpen && (
          <div
            className={cn(
              "fixed inset-0 z-50 flex p-5 font-sans",
              positionClasses,
            )}
          >
            <div
              ref={overlayRef}
              className="fixed inset-0 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-300"
              onClick={onClose}
            />

            <div
              ref={ref}
              role="dialog"
              aria-modal="true"
              className={cn(
                "relative z-50 flex w-[340px] flex-col items-center bg-gray-white rounded-lg shadow-card-hover",
                "p-[32px_24px] gap-6 transition-all",
                "animate-in fade-in zoom-in-95 duration-200 ease-out",
                className,
              )}
            >
              {children}
            </div>
          </div>
        )}
      </>
    );
  },
);

Popup.displayName = "Popup";

export default Popup;
