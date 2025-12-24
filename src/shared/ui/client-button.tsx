// Client Component

"use client";

import Button, { ButtonProps } from "@/src/shared/ui/button";
import React from "react";

export interface ClientButtonProps extends ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function ClientButton({ onClick, ...rest }: ClientButtonProps) {
  return <Button {...rest} />;
}
