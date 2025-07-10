import clsx from "clsx";

import { variantClassNames } from "@/components/buttons/hooks/useButtonStyles/styles";

import { textVariantClassName, widthHeightClassName } from "./styles";
import { IconButtonTextVariant } from "../../types";

type UseIconButtonStylesProps = {
  textVariant: IconButtonTextVariant;
  isActive?: boolean;
  disabled?: boolean;
};

export const useIconButtonStyles = ({
  textVariant,
  isActive,
  disabled,
}: UseIconButtonStylesProps) => {
  return {
    iconButtonClassName: clsx(
      "flex justify-center rounded items-center",
      widthHeightClassName,
      disabled
        ? [
            "bg-surface-disabled cursor-not-allowed",
            textVariantClassName[textVariant].disabled,
          ]
        : [
            "bg-surface",
            textVariantClassName[textVariant].base,
            isActive
              ? variantClassNames.ghost.active
              : variantClassNames.ghost.notActive,
          ],
    ),
  };
};
