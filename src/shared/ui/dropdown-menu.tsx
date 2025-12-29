import DropdownMenuBase, {
  type DropdownMenuProps,
} from "@/src/shared/ui/dropdown-menu.base";
import { forwardRef } from "react";

export type { DropdownMenuProps };

const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  (props, ref) => {
    return <DropdownMenuBase ref={ref} {...props} />;
  },
);

DropdownMenu.displayName = "DropdownMenu";
export default DropdownMenu;
