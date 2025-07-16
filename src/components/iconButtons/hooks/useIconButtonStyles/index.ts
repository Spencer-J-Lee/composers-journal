import clsx from "clsx";

import { calcVariantClassName } from "./helpers";
import { widthHeightClassName } from "./styles";
import { IconButtonTextVariant } from "../../types";

export type UseIconButtonStylesProps = {
  textVariant: IconButtonTextVariant;
  isActive?: boolean;
  disabled?: boolean;
};

export const useIconButtonStyles = ({
  textVariant,
  isActive,
  disabled,
}: UseIconButtonStylesProps) => {
  const baseClassName = "flex justify-center rounded items-center";

  return {
    iconButtonClassName: clsx(
      baseClassName,
      widthHeightClassName,
      calcVariantClassName({
        textVariant,
        isActive,
        disabled,
      }),
    ),
  };
};
