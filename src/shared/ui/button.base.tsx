// Client Component

"use client";

import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export default function ButtonBase({
  type = "button",
  className,
  ...rest
}: ButtonProps) {
  return <button type={type} className={className} {...rest} />;
}
