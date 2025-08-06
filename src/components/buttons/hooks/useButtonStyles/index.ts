import clsx from "clsx";

import { ButtonSize, ButtonVariant } from "@/components/buttons/types";

import { calcVariantClassName } from "./helpers";
import { sizeClassName } from "./styles";

export type UseButtonStylesProps = {
  size: ButtonSize;
  variant: ButtonVariant;
  fullWidth?: boolean;
  active?: boolean;
  disabled?: boolean;
  loading?: boolean;
};

export const useButtonStyles = ({
  size,
  variant,
  fullWidth,
  active,
  disabled,
  loading,
}: UseButtonStylesProps) => {
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
        active,
        disabled,
        loading,
      }),
    ),
  };
};
