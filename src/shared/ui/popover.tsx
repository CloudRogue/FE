"use client";

import cn from "@/src/shared/lib/cn";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type TriggerProps = {
  onClick?: React.MouseEventHandler;
  className?: string;
  "aria-haspopup"?:
    | boolean
    | "false"
    | "true"
    | "menu"
    | "listbox"
    | "tree"
    | "grid"
    | "dialog";
  "aria-expanded"?: boolean;
};

export interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  containerClassName?: string;
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
      containerClassName,
      className,
      align = "center",
      isOpen: controlledIsOpen,
      onClose,
      center = false,
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [internalIsOpen, setInternalIsOpen] = useState(false);

    const isOpen =
      controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

    const setIsOpen = useCallback(
      (value: React.SetStateAction<boolean>) => {
        const newValue = typeof value === "function" ? value(isOpen) : value;
        if (onClose && !newValue) onClose();
        setInternalIsOpen(newValue);
      },
      [isOpen, onClose],
    );

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
    }, [isOpen, setIsOpen]);

    const renderTrigger = () => {
      if (React.isValidElement<TriggerProps>(trigger)) {
        const triggerElement = trigger;

        return React.cloneElement(triggerElement, {
          onClick: (e: React.MouseEvent) => {
            triggerElement.props.onClick?.(e);
            setIsOpen((prev) => !prev);
          },
          "aria-haspopup": "true",
          "aria-expanded": isOpen,
          className: cn(triggerElement.props.className, "cursor-pointer"),
        });
      }
      return trigger;
    };

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
      <div
        className={cn("relative inline-block", containerClassName)}
        ref={containerRef}
      >
        {renderTrigger()}

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
