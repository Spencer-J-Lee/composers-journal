import clsx from "clsx";

import { ButtonSize, ButtonVariant } from "@/components/buttons/types";

import {
  getHoverActiveClassName,
  sizeClassName,
  variantClassName,
} from "./styles";

type useButtonStylesProps = {
  size: ButtonSize;
  variant: ButtonVariant;
  fullWidth?: boolean;
  disabled?: boolean;
  isActive?: boolean;
};

export const useButtonStyles = ({
  size,
  variant,
  fullWidth,
  disabled,
  isActive,
}: useButtonStylesProps) => {
  return {
    buttonClassName: clsx(
      "font-inter rounded tracking-widest font-semibold disabled:pointer-events-none block",
      sizeClassName[size],
      variantClassName[variant],
      getHoverActiveClassName(variant, isActive),
      {
        "w-full": fullWidth,
        "disabled:bg-disabled": disabled,
      },
    ),
  };
};
