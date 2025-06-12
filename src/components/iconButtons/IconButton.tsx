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
  textVariant = "default",
  isActive,
  ...props
}: IconButtonProps) => {
  const { iconButtonClassName } = useIconButtonStyles({
    textVariant,
    isActive,
    disabled: props.disabled,
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
