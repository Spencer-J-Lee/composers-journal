import clsx from "clsx";

import { variantClassNames } from "@/components/buttons/hooks/useButtonStyles/styles";

import { textVariantClassName } from "./styles";
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
      "h-9 w-9 flex justify-center rounded items-center",
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
