import clsx from "clsx";

import { ButtonSize, ButtonVariant } from "@/components/buttons/types";

import { sizeClassName, variantClassName } from "./styles";

type useButtonStylesProps = {
  size: ButtonSize;
  variant: ButtonVariant;
  fullWidth?: boolean;
  disabled?: boolean;
};

export const useButtonStyles = ({
  size,
  variant,
  fullWidth,
  disabled,
}: useButtonStylesProps) => {
  return {
    buttonClassName: clsx(
      "font-inter rounded font-medium tracking-widest transition-all font-semibold active:brightness-90 disabled:pointer-events-none",
      sizeClassName[size],
      variantClassName[variant],
      {
        "w-full": fullWidth,
        "disabled:bg-disabled": disabled,
      },
    ),
  };
};
