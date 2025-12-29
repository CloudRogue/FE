// Server Component

import ButtonBase, { ButtonProps } from "@/src/shared/ui/button.base";
import { forwardRef } from "react";

export type { ButtonProps };

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return <ButtonBase ref={ref} {...props} />;
});

Button.displayName = "Button";
export default Button;
