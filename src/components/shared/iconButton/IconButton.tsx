import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

import { useIconButtonClassname } from "./hooks";
import { IconButtonVariant } from "./types";

type IconButtonProps = {
  faIcon: IconProp;
  variant?: IconButtonVariant;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const IconButton = ({
  className,
  faIcon,
  variant = "default",
  ...props
}: IconButtonProps) => {
  const baseClassName = useIconButtonClassname(variant);

  return (
    <button className={clsx(baseClassName, className)} {...props}>
      <FontAwesomeIcon icon={faIcon} />
    </button>
  );
};
