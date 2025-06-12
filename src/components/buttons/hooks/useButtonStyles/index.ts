import clsx from "clsx";

import { ButtonSize, ButtonVariant } from "@/components/buttons/types";

import { sizeClassName, variantClassNames } from "./styles";

type useButtonStylesProps = {
  size: ButtonSize;
  variant: ButtonVariant;
  fullWidth?: boolean;
  isActive?: boolean;
  disabled?: boolean;
};

export const useButtonStyles = ({
  size,
  variant,
  fullWidth,
  isActive,
  disabled,
}: useButtonStylesProps) => {
  return {
    buttonClassName: clsx(
      "font-inter rounded tracking-widest font-semibold block",
      sizeClassName[size],
      {
        "w-full": fullWidth,
      },
      disabled
        ? variantClassNames[variant].disabled
        : [
            variantClassNames[variant].base,
            isActive
              ? variantClassNames[variant].active
              : variantClassNames[variant].notActive,
          ],
    ),
  };
};
