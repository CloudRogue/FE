// Server Component

import ButtonBase, { ButtonProps } from "@/src/shared/ui/button.base";

export type { ButtonProps };

export default function Button(props: ButtonProps) {
  return <ButtonBase {...props} />;
}
