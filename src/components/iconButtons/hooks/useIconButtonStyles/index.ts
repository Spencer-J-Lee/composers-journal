import clsx from "clsx";

import { ghostButtonStyles } from "@/components/styles/buttons";

import { variantClassName } from "./styles";
import { IconButtonVariant } from "../../types";

type UseIconButtonStylesProps = {
  variant: IconButtonVariant;
  isActive?: boolean;
};

export const useIconButtonStyles = ({
  variant,
  isActive,
}: UseIconButtonStylesProps) => {
  return {
    iconButtonClassName: clsx(
      "bg-surface h-9 w-9 flex justify-center rounded items-center",
      isActive
        ? ghostButtonStyles.forceActive
        : ghostButtonStyles.forHoverActive,
      variantClassName[variant],
    ),
  };
};
