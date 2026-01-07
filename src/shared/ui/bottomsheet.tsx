"use client";

import { createPortal } from "react-dom";
import type { MouseEvent } from "react";
import { useBottomSheetA11y } from "@/src/shared/hooks/use-bottomsheet";

type Option = {
  label: string;
  value: string;
};

type Props = {
  isOpen: boolean;
  options: Option[];
  selectedValue?: string;
  title?: string;
  onSelect: (value: string) => void;
  onClose: () => void;
};

export default function BottomSheet({
  isOpen,
  options,
  selectedValue,
  title,
  onSelect,
  onClose,
}: Props) {
  const { sheetRef, handleKeyDown } = useBottomSheetA11y(isOpen, onClose);

  if (typeof window === "undefined") return null;

  const stopPropagation = (e: MouseEvent) => e.stopPropagation();

  return createPortal(
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-200 ${
        isOpen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!isOpen}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        onKeyDown={handleKeyDown}
        onClick={stopPropagation}
        className={`
          absolute bottom-0 left-0 right-0
          bg-white
          rounded-t-[24px]
          transform transition-transform duration-250 ease-out
          ${isOpen ? "translate-y-0" : "translate-y-full"}
        `}
      >
        {title && (
          <div className="px-6 pt-5 pb-3 text-[13px] font-medium text-neutral-500">
            {title}
          </div>
        )}

        <ul className="flex flex-col">
          {options.map((option, index) => {
            const isSelected = option.value === selectedValue;
            const isLast = index === options.length - 1;

            return (
              <li
                key={option.value}
                className={`
                  px-6
                  ${!isLast ? "border-b border-neutral-200" : ""}
                `}
              >
                <button
                  type="button"
                  className="
                    flex w-full items-center justify-between
                    py-[18px]
                    text-left
                    transition-colors
                    hover:bg-neutral-50
                    active:bg-neutral-100
                    focus:outline-none
                  "
                  onClick={() => {
                    onSelect(option.value);
                    onClose();
                  }}
                >
                  <span
                    className={`
                      text-[16px] font-medium
                      ${isSelected ? "text-neutral-900" : "text-neutral-800"}
                    `}
                  >
                    {option.label}
                  </span>

                  {isSelected && (
                    <span className="text-neutral-400 text-[18px] leading-none">
                      ✓
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="h-6" />
      </div>
    </div>,
    document.body,
  );
}
