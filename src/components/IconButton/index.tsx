import { ComponentProps } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

import { useIconButtonStyles } from "./hooks";
import { IconButtonVariant } from "./types";

type IconButtonProps = {
  faIcon: IconProp;
  variant?: IconButtonVariant;
} & ComponentProps<"button">;

export const IconButton = ({
  className,
  faIcon,
  variant = "default",
  ...props
}: IconButtonProps) => {
  const { iconButtonClassName } = useIconButtonStyles({ variant });

  return (
    <button className={clsx(iconButtonClassName, className)} {...props}>
      <FontAwesomeIcon icon={faIcon} />
    </button>
  );
};
