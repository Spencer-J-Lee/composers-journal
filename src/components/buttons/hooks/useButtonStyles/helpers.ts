import clsx from "clsx";

import { variantClassNames } from "./styles";

import { useButtonStylesProps } from ".";

export const calcVariantClassName = ({
  variant,
  isActive,
  disabled,
  loading,
}: Pick<
  useButtonStylesProps,
  "variant" | "isActive" | "disabled" | "loading"
>) => {
  if (disabled || loading) {
    return variantClassNames[variant].disabled;
  }

  return clsx([
    variantClassNames[variant].base,
    isActive
      ? variantClassNames[variant].active
      : variantClassNames[variant].notActive,
  ]);
};
