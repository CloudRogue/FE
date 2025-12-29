import {
  type DropdownMenuItemProps,
  type DropdownMenuProps,
  DropdownMenuBase,
  DropdownMenuItemBase,
} from "@/src/shared/ui/dropdown-menu.base";
import { forwardRef } from "react";

export type { DropdownMenuItemProps, DropdownMenuProps };

const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  (props, ref) => {
    return <DropdownMenuBase ref={ref} {...props} />;
  },
);

export const DropdownMenuItem = DropdownMenuItemBase;

DropdownMenu.displayName = "DropdownMenu";
export default DropdownMenu;
