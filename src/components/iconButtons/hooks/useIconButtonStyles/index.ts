import clsx from "clsx";

import { variantClassName } from "./styles";
import { IconButtonVariant } from "../../types";

type UseIconButtonStylesProps = {
  variant: IconButtonVariant;
};

export const useIconButtonStyles = ({ variant }: UseIconButtonStylesProps) => {
  return {
    iconButtonClassName: clsx(
      "bg-surface hover:brightness-125 focus-visible:brightness-125 active:brightness-[1.4] h-9 w-9 rounded duration-75 transition-all flex justify-center items-center",
      variantClassName[variant],
    ),
  };
};
