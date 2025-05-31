import clsx from "clsx";

import { ButtonVariant } from "@/components/buttons/types";

import { variantClassName } from "./hooks/useIconButtonStyles/styles";

type UseIconButtonStylesProps = {
  variant: ButtonVariant;
};

export const useIconButtonStyles = ({ variant }: UseIconButtonStylesProps) => {
  return {
    iconButtonClassName: clsx(
      "bg-surface hover:brightness-125 focus-visible:brightness-125 active:brightness-[1.15] h-8 w-8 rounded duration-75 transition-all",
      variantClassName[variant],
    ),
  };
};
