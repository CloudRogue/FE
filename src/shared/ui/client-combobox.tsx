"use client";

import { useId, useMemo } from "react";
import cn from "@/src/shared/lib/cn";
import { useCombobox } from "@/src/shared/hooks/use-combobox";
import type { ComboboxOption } from "@/src/shared/lib/combobox.utils";
import Input from "@/src/shared/ui/input";

export type ComboboxProps = {
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (nextValue: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  className?: string;
};

export default function ClientCombobox({
  options,
  value,
  onValueChange,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  disabled,
  className,
}: ComboboxProps) {
  const reactId = useId();
  const listboxId = `combobox-listbox-${reactId}`;
  const optionId = (index: number) => `${listboxId}-option-${index}`;

  const {
    refs: { rootElementRef, triggerButtonRef, searchInputRef },
    state: { isOpen, searchQuery, focusedOptionIndex, filteredOptions },
    actions: {
      setSearchQuery,
      setFocusedOptionIndex,
      openCombobox,
      closeCombobox,
      selectOption,
      handleTriggerKeyDown,
      handleSearchInputKeyDown,
    },
  } = useCombobox({ options, value, onValueChange, disabled, listboxId });

  const selectedLabel = useMemo(() => {
    if (!value) return undefined;
    return options.find((option) => option.value === value)?.label;
  }, [options, value]);

  return (
    <div ref={rootElementRef} className={cn("relative w-full", className)}>
      {/* Trigger */}
      <button
        ref={triggerButtonRef}
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-haspopup="listbox"
        disabled={disabled}
        onClick={() => {
          if (isOpen) closeCombobox();
          else openCombobox();
        }}
        onKeyDown={handleTriggerKeyDown}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border px-3 text-sm",
          "border-neutral-700 bg-neutral-900 text-neutral-100",
          "outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-neutral-900",
          disabled && "cursor-not-allowed opacity-50",
        )}
      >
        <span className={cn("truncate", !selectedLabel && "text-neutral-400")}>
          {selectedLabel ?? placeholder}
        </span>
        <span aria-hidden="true" className="text-neutral-400">
          ▾
        </span>
      </button>

      {isOpen ? (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-md border border-neutral-700 bg-neutral-900 shadow-lg">
          <div className="border-b border-neutral-700 p-2">
            <Input
              ref={searchInputRef}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              onKeyDown={handleSearchInputKeyDown}
              placeholder={searchPlaceholder}
              className={cn(
                "h-9 w-full rounded-md border px-3 text-sm outline-none",
                "border-neutral-700 bg-neutral-950 text-neutral-100",
                "placeholder:text-neutral-500",
                "focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-neutral-900",
              )}
              aria-controls={listboxId}
            />
          </div>

          <ul
            id={listboxId}
            role="listbox"
            className="max-h-60 list-none overflow-auto p-1"
          >
            {filteredOptions.length === 0 ? (
              <li className="px-3 py-2 text-sm text-neutral-500">No results</li>
            ) : (
              filteredOptions.map((option, index) => {
                const isSelected = option.value === value;
                const isFocused = index === focusedOptionIndex;

                return (
                  <li
                    id={optionId(index)}
                    key={option.value}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={option.disabled}
                    onMouseEnter={() => setFocusedOptionIndex(index)}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => selectOption(option)}
                    className={cn(
                      "flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm",
                      "text-neutral-100",
                      "hover:bg-neutral-800",
                      isFocused && "bg-neutral-800",
                      option.disabled && "pointer-events-none opacity-40",
                    )}
                  >
                    <span className="truncate">{option.label}</span>
                    {isSelected ? (
                      <span aria-hidden="true" className="text-neutral-300">
                        ✓
                      </span>
                    ) : null}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

// TODO 디자인 도입 시 변경 예정
