import clsx from "clsx";

import { variantClassNames } from "@/components/buttons/hooks/useButtonStyles/styles";

import { textVariantClassName } from "./styles";

import { UseIconButtonStylesProps } from ".";

export const calcVariantClassName = ({
  textVariant,
  isActive,
  disabled,
}: Pick<UseIconButtonStylesProps, "textVariant" | "isActive" | "disabled">) => {
  if (disabled) {
    return clsx(
      "bg-surface-disabled cursor-not-allowed",
      textVariantClassName[textVariant].disabled,
    );
  }

  return clsx([
    "bg-surface",
    textVariantClassName[textVariant].base,
    isActive
      ? variantClassNames.ghost.active
      : variantClassNames.ghost.notActive,
  ]);
};
