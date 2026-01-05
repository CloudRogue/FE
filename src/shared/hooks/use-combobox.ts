"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  getInitialFocusIndex,
  getNextEnabledIndex,
  type ComboboxOption,
} from "@/src/shared/lib/combobox.utils";

export type UseComboboxParams = {
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (nextValue: string) => void;
  disabled?: boolean;
  listboxId: string;
};

export function useCombobox({
  options,
  value,
  onValueChange,
  disabled,
  listboxId,
}: UseComboboxParams) {
  const rootElementRef = useRef<HTMLDivElement | null>(null);
  const triggerButtonRef = useRef<HTMLButtonElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number>(-1);

  // 검색어가 있으면 필터 없으면 전체 옵션 그대로.
  const filteredOptions = useMemo(() => {
    const normalizedSearchQuery = searchQuery.trim().toLowerCase();
    if (!normalizedSearchQuery) return options;

    return options.filter((option) =>
      option.label.toLowerCase().includes(normalizedSearchQuery),
    );
  }, [options, searchQuery]);

  // 닫기, 검색어 초기화, 포커스 인덱스 리셋, trigger로 포커스 복귀
  const closeCombobox = useCallback(() => {
    setIsOpen(false);
    setSearchQuery("");
    setFocusedOptionIndex(-1);
    triggerButtonRef.current?.focus();
  }, []);

  // 열기, disabled면 무시
  // 열릴 때 초기 포커스는 여기서 세팅 (effect에서 setState 금지 룰 대응)
  const openCombobox = useCallback(() => {
    if (disabled) return;

    const initialIndex = getInitialFocusIndex(filteredOptions, value);
    setFocusedOptionIndex(initialIndex);
    setIsOpen(true);
  }, [disabled, filteredOptions, value]);

  // 옵션 선택 외부에 값 전달, 닫기
  const selectOption = useCallback(
    (option: ComboboxOption) => {
      if (option.disabled) return;
      onValueChange?.(option.value);
      closeCombobox();
    },
    [closeCombobox, onValueChange],
  );

  // 키보드 포커스 이동
  const moveFocusedOption = useCallback(
    (direction: 1 | -1) => {
      setFocusedOptionIndex((prev) =>
        getNextEnabledIndex(filteredOptions, prev, direction),
      );
    },
    [filteredOptions],
  );

  // 키보드 이벤트 핸들러
  const handleTriggerKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return;

      if (
        event.key === "Enter" ||
        event.key === " " ||
        event.key === "ArrowDown"
      ) {
        event.preventDefault();
        openCombobox();
      }
    },
    [disabled, openCombobox],
  );

  const handleSearchInputKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeCombobox();
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        moveFocusedOption(1);
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        moveFocusedOption(-1);
        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();
        const option = filteredOptions[focusedOptionIndex];
        if (option) selectOption(option);
      }
    },
    [
      closeCombobox,
      filteredOptions,
      focusedOptionIndex,
      moveFocusedOption,
      selectOption,
    ],
  );

  // 바깥 클릭 닫기.
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const rootElement = rootElementRef.current;
      if (!rootElement) return;

      if (event.target instanceof Node && !rootElement.contains(event.target)) {
        closeCombobox();
      }
    };

    const captureOptions = { capture: true } as const;

    window.addEventListener("pointerdown", handlePointerDown, captureOptions);

    return () => {
      window.removeEventListener(
        "pointerdown",
        handlePointerDown,
        captureOptions,
      );
    };
  }, [isOpen, closeCombobox]);

  // 열릴 때 검색 input 포커스.
  useEffect(() => {
    if (!isOpen) return;
    searchInputRef.current?.focus();
  }, [isOpen]);

  // 포커스 스크롤 따라가기.
  useEffect(() => {
    if (!isOpen) return;
    if (focusedOptionIndex < 0) return;

    const optionElementId = `${listboxId}-option-${focusedOptionIndex}`;
    const element = document.getElementById(optionElementId);
    if (!element) return;

    element.scrollIntoView({ block: "nearest" });
  }, [isOpen, focusedOptionIndex, listboxId]);

  return {
    refs: { rootElementRef, triggerButtonRef, searchInputRef },
    state: {
      isOpen,
      searchQuery,
      focusedOptionIndex,
      filteredOptions,
    },
    actions: {
      setSearchQuery,
      setFocusedOptionIndex,
      openCombobox,
      closeCombobox,
      selectOption,
      handleTriggerKeyDown,
      handleSearchInputKeyDown,
    },
  };
}
