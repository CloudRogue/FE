// Client Component

"use client";

import Button, { ButtonProps } from "@/src/shared/ui/button";
import { forwardRef } from "react";

const ClientButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ onClick, children, ...rest }, ref) => {
    return (
      <Button ref={ref} onClick={onClick} {...rest}>
        {children}
      </Button>
    );
  },
);

ClientButton.displayName = "ClientButton";
export default ClientButton;
