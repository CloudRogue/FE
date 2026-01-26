"use client";

import * as React from "react";
import cn from "@/src/shared/lib/cn";
import Button from "@/src/shared/ui/button";

type OnboardingButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean;
};

export default function OnboardingButton({
  selected = false,
  className,
  type = "button",
  children,
  ...rest
}: OnboardingButtonProps) {
  return (
    <Button
      type={type}
      variant="secondary"
      size="md"
      className={cn(
        "flex-1",
        "flex items-center justify-center",
        "px-4 py-12",
        "rounded-lg",

        "border border-gray-100",
        "bg-gray-white",
        "shadow-button",

        "text-h4 font-semibold text-gray-700",

        selected && [
          "bg-primary-blue",
          "border-primary-blue",
          "text-gray-white",

          "hover:bg-primary-blue",
          "hover:border-primary-blue",
          "hover:text-gray-white",
        ],

        className,
      )}
      {...rest}
    >
      {children}
    </Button>
  );
}
