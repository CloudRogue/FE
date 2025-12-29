"use client";

import DropdownMenu, { DropdownMenuItem } from "@/src/shared/ui/dropdown-menu";
import React, { useEffect, useRef, useState } from "react";

interface ClientDropdownProps {
  label: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const ClientDropdown = ({
  label,
  children,
  className,
}: ClientDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
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
    <div className="relative inline-block" ref={containerRef}>
      <button onClick={() => setIsOpen(!isOpen)}>{label}</button>

      <DropdownMenu isOpen={isOpen} className={className}>
        {/* 여기서 children은 DropdownMenuItem들이 됩니다 */}
        {children}
      </DropdownMenu>
    </div>
  );
};

export { DropdownMenuItem };
export default ClientDropdown;
