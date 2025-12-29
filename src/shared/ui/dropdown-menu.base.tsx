"use client";

import React, { forwardRef } from "react";

export interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
}

const DropdownMenuBase = forwardRef<HTMLDivElement, DropdownMenuProps>(
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

DropdownMenuBase.displayName = "DropdownMenuBase";
export default DropdownMenuBase;
