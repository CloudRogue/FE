export type ComboboxOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

// 현재 포커스 인덱스에서 위/아래로 이동할 때, disabled가 아닌 다음 인덱스를 찾음 (키보드 이동 규칙).
export function getNextEnabledIndex(
  options: ComboboxOption[],
  currentIndex: number,
  direction: 1 | -1,
) {
  if (options.length === 0) return -1;

  let nextIndex = currentIndex;

  for (let step = 0; step < options.length; step += 1) {
    nextIndex = (nextIndex + direction + options.length) % options.length;

    if (!options[nextIndex]?.disabled) {
      return nextIndex;
    }
  }

  return currentIndex;
}

// 콤보 박스가 열릴 때, 처음 포커스를 어디 둘지 결정.
export function getInitialFocusIndex(
  options: ComboboxOption[],
  selectedValue?: string,
) {
  if (options.length === 0) return -1;

  const selectedIndex =
    selectedValue == null
      ? -1
      : options.findIndex((o) => o.value === selectedValue);

  if (selectedIndex >= 0 && !options[selectedIndex]?.disabled) {
    return selectedIndex;
  }

  return options.findIndex((o) => !o.disabled);
}
