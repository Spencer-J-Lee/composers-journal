import clsx from "clsx";

import { ButtonSize, ButtonVariant } from "@/components/buttons/types";

import { calcVariantClassName } from "./helpers";
import { sizeClassName } from "./styles";

export type useButtonStylesProps = {
  size: ButtonSize;
  variant: ButtonVariant;
  fullWidth?: boolean;
  isActive?: boolean;
  disabled?: boolean;
  loading?: boolean;
};

export const useButtonStyles = ({
  size,
  variant,
  fullWidth,
  isActive,
  disabled,
  loading,
}: useButtonStylesProps) => {
  const baseClassName =
    "font-inter rounded tracking-widest font-bold block relative";
  const widthClassName = fullWidth ? "w-full" : "";

  return {
    buttonClassName: clsx(
      baseClassName,
      sizeClassName[size],
      widthClassName,
      calcVariantClassName({
        variant,
        isActive,
        disabled,
        loading,
      }),
    ),
  };
};
