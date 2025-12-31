"use client";

import cn from "@/src/shared/lib/cn";
import React, { useState } from "react";

const variants = {
  default: "bg-transparent",
  outline:
    "border border-slate-200 bg-transparent hover:bg-slate-100 hover:text-slate-900",
};

const sizes = {
  default: "h-10 px-3",
  sm: "h-9 px-2.5",
  lg: "h-11 px-5",
};

interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  toggleName: string;
  active?: boolean;
  defaultActive?: boolean;
  onActiveChange?: (active: boolean) => void;
  className?: string;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      toggleName,
      active: externalActive,
      defaultActive = false,
      onActiveChange,
      className,
      variant = "default",
      size = "default",
      ...props
    },
    ref,
  ) => {
    const [active, setActive] = useState(defaultActive);
    const currentPressed =
      externalActive !== undefined ? externalActive : active;

    const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
      props.onClick?.(e);
      const nextPressed = !currentPressed;
      setActive(nextPressed);
      onActiveChange?.(nextPressed);
    };

    return (
      <button
        type="button"
        ref={ref}
        aria-label={toggleName}
        aria-pressed={currentPressed}
        data-state={currentPressed ? "on" : "off"}
        onClick={handleToggle}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
          "hover:bg-slate-100 hover:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:pointer-events-none disabled:opacity-50",
          // active
          "data-[state=on]:bg-slate-200 data-[state=on]:text-slate-900",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Toggle.displayName = "Toggle";
