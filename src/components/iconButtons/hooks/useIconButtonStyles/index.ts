import clsx from "clsx";

import { calcVariantClassName } from "./helpers";
import { widthHeightClassName } from "./styles";
import { IconButtonSize, IconButtonTextVariant } from "../../types";

export type UseIconButtonStylesProps = {
  textVariant: IconButtonTextVariant;
  size?: IconButtonSize;
  active?: boolean;
  disabled?: boolean;
};

export const useIconButtonStyles = ({
  textVariant,
  size = "md",
  active,
  disabled,
}: UseIconButtonStylesProps) => {
  const baseClassName = "flex justify-center rounded items-center";

  return {
    iconButtonClassName: clsx(
      baseClassName,
      widthHeightClassName[size],
      calcVariantClassName({
        textVariant,
        active,
        disabled,
      }),
    ),
  };
};
