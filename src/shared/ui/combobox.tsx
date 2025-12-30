import ClientCombobox, { type ComboboxProps } from "./client-combobox";

export type { ComboboxProps };

export default function Combobox(props: ComboboxProps) {
  return <ClientCombobox {...props} />;
}
