import clsx from "clsx";

import { ghostButtonHoverActiveClassName } from "@/components/styles/buttons";

import { variantClassName } from "./styles";
import { IconButtonVariant } from "../../types";

type UseIconButtonStylesProps = {
  variant: IconButtonVariant;
};

export const useIconButtonStyles = ({ variant }: UseIconButtonStylesProps) => {
  return {
    iconButtonClassName: clsx(
      "bg-surface h-9 w-9 rounded flex justify-center items-center",
      ghostButtonHoverActiveClassName,
      variantClassName[variant],
    ),
  };
};
