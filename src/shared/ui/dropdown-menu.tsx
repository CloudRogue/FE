import {
  type DropdownItemProps,
  type DropdownProps,
  DropdownBase,
  DropdownItemBase,
} from "@/src/shared/ui/dropdown.base";
import { forwardRef } from "react";

export type { DropdownItemProps, DropdownProps };

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>((props, ref) => {
  return <DropdownBase ref={ref} {...props} />;
});

export const DropdownItem = DropdownItemBase;

Dropdown.displayName = "Dropdown";
export default Dropdown;
