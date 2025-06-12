import clsx from "clsx";

import { ghostButtonStyles } from "@/components/styles/buttons";

import { disabledTextVariantClassName, textVariantClassName } from "./styles";
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
            "bg-[#282829] cursor-not-allowed",
            disabledTextVariantClassName[textVariant],
          ]
        : [
            "bg-surface",
            textVariantClassName[textVariant],
            isActive ? ghostButtonStyles.active : ghostButtonStyles.notActive,
          ],
    ),
  };
};
