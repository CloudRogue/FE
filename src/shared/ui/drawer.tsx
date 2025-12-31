"use client";

import cn from "@/src/shared/lib/cn";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  className?: string;
  children: React.ReactNode;
}

export const Drawer = ({
  isOpen,
  onClose,
  title,
  className,
  children,
}: DrawerProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />

      <div className={cn("relative z-50 w-full bg-white p-6", className)}>
        {title && <h2 className="text-lg font-semibold">{title}</h2>}
        {children}
      </div>
    </div>,
    document.body,
  );
};
