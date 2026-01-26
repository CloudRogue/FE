"use client";

import cn from "@/src/shared/lib/cn";
import React, { useState } from "react";

interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  active?: boolean;
  defaultActive?: boolean;
  onActiveChange?: (active: boolean) => void;
}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      label,
      active: externalActive,
      defaultActive = false,
      onActiveChange,
      className,
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
      <div className={cn("flex items-center gap-1.5", className)}>
        <button
          type="button"
          ref={ref}
          role="switch"
          aria-checked={currentPressed}
          data-state={currentPressed ? "on" : "off"}
          onClick={handleToggle}
          className={cn(
            "relative inline-flex h-4 w-8.25 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue/20 disabled:cursor-not-allowed disabled:opacity-50",
            currentPressed ? "bg-primary-blue" : "bg-gray-100",
          )}
          {...props}
        >
          <span
            className={cn(
              "pointer-events-none block h-3.5 w-3.5 rounded-full bg-white transition-transform duration-200",
              currentPressed ? "translate-x-4.5" : "translate-x-0.5",
            )}
          />
        </button>

        {label && (
          <span
            className={cn(
              "text-body2  select-none transition-colors",
              currentPressed ? "text-primary-blue" : "text-gray-400",
            )}
          >
            {label}
          </span>
        )}
      </div>
    );
  },
);

Toggle.displayName = "Toggle";
