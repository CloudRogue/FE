"use client";

import DropdownMenu, { DropdownMenuProps } from "@/src/shared/ui/dropdown-menu";
import { forwardRef } from "react";

const ClientDropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ children, ...rest }, ref) => {
    return (
      <DropdownMenu ref={ref} {...rest}>
        {children}
      </DropdownMenu>
    );
  },
);

ClientDropdownMenu.displayName = "ClientDropdownMenu";
export default ClientDropdownMenu;
