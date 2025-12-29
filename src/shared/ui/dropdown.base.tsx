"use client";

import React, { forwardRef } from "react";

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
}

export const DropdownBase = forwardRef<HTMLDivElement, DropdownProps>(
  ({ className, children, isOpen, ...rest }, ref) => {
    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        className={`absolute z-50 min-w-32 overflow-hidden rounded-md border bg-white p-1 shadow-md ${className}`}
        role="menu"
        aria-orientation="vertical"
        {...rest}
      >
        {children}
      </div>
    );
  },
);

export interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const DropdownItemBase = forwardRef<
  HTMLButtonElement,
  DropdownItemProps
>(({ className, children, ...rest }, ref) => {
  return (
    <button
      ref={ref}
      role="menuitem"
      className={`relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
});

DropdownBase.displayName = "DropdownBase";
DropdownItemBase.displayName = "DropdownItemBase";
