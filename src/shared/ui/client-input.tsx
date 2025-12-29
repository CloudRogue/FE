import Input, { type InputProps } from "@/src/shared/ui/input";
import * as React from "react";

export type ClientInputProps = React.InputHTMLAttributes<HTMLInputElement> &
  Omit<InputProps, keyof React.DOMAttributes<HTMLInputElement>>;

export default function ClientInput(props: ClientInputProps) {
  return <Input {...props} />;
}
