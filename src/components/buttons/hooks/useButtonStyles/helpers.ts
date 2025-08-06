import clsx from "clsx";

import { variantClassNames } from "./styles";

import { UseButtonStylesProps } from ".";

export const calcVariantClassName = ({
  variant,
  active,
  disabled,
  loading,
}: Pick<
  UseButtonStylesProps,
  "variant" | "active" | "disabled" | "loading"
>) => {
  if (disabled || loading) {
    return clsx(
      "cursor-not-allowed text-text-disabled",
      variantClassNames[variant].disabled,
    );
  }

  return clsx([
    variantClassNames[variant].base,
    active
      ? variantClassNames[variant].active
      : variantClassNames[variant].notActive,
  ]);
};
