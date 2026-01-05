"use client";

import cn from "@/src/shared/lib/cn";
import React, {
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  MouseEvent,
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const DropdownContext = createContext<{
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
} | null>(null);

export const Dropdown = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: globalThis.MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <DropdownContext value={{ isOpen, setIsOpen }}>
      <div className="relative inline-block" ref={containerRef}>
        {children}
      </div>
    </DropdownContext>
  );
};

export const DropdownTrigger = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const context = useContext(DropdownContext);
  if (!context) return null;

  if (!isValidElement(children)) return <>{children}</>;

  const child = children as ReactElement<{ onClick?: (e: MouseEvent) => void }>;

  return cloneElement(child, {
    onClick: (e: MouseEvent) => {
      child.props.onClick?.(e);
      context.setIsOpen(!context.isOpen);
    },
  });
};

export const DropdownContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const context = useContext(DropdownContext);
  if (!context?.isOpen) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "absolute right-0 z-50 mt-2 min-w-32 overflow-hidden rounded-md border bg-white p-1 shadow-md",
        "animate-in fade-in zoom-in-95 duration-100",
        className,
      )}
      role="menu"
      {...props}
    >
      {children}
    </div>
  );
});

export const DropdownItem = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, onClick, ...props }, ref) => {
  const context = useContext(DropdownContext);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    context?.setIsOpen(false);
  };

  return (
    <button
      ref={ref}
      role="menuitem"
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100 disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
});

DropdownContent.displayName = "DropdownContent";
DropdownItem.displayName = "DropdownItem";
