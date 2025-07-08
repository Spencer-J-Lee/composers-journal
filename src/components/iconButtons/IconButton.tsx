import { ComponentProps } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

import { useIconButtonStyles } from "./hooks/useIconButtonStyles";
import { BaseIconButtonProps } from "./types";
import { PulsingEllipsis } from "../loaders/PulsingEllipsis";

export type IconButtonProps = {
  loading?: boolean;
} & BaseIconButtonProps &
  ComponentProps<"button">;

export const IconButton = ({
  className,
  type = "button",
  faIcon,
  textVariant = "default",
  isActive,
  loading,
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
      disabled={loading}
      type={type}
      {...props}
    >
      {loading ? <PulsingEllipsis /> : <FontAwesomeIcon icon={faIcon} />}
    </button>
  );
};
