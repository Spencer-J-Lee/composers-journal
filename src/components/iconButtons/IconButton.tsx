import { ComponentProps } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

import { useIconButtonStyles } from "./hooks/useIconButtonStyles";
import { BaseIconButtonProps } from "./types";

export type IconButtonProps = BaseIconButtonProps & ComponentProps<"button">;

export const IconButton = ({
  className,
  type = "button",
  faIcon,
  variant = "default",
  isActive,
  ...props
}: IconButtonProps) => {
  const { iconButtonClassName } = useIconButtonStyles({
    variant,
    isActive,
  });

  return (
    <button
      className={clsx(iconButtonClassName, className)}
      type={type}
      {...props}
    >
      <FontAwesomeIcon icon={faIcon} />
    </button>
  );
};
