import { ComponentProps } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

import { useIconButtonStyles } from "./hooks/useIconButtonStyles";
import { BaseIconButtonProps } from "./types";

type IconButtonProps = BaseIconButtonProps & ComponentProps<"button">;

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
