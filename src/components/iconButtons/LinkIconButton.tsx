import { ComponentProps } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Link from "next/link";

import { useIconButtonStyles } from "./hooks/useIconButtonStyles";
import { BaseIconButtonProps } from "./types";

export type LinkIconButtonProps = {
  href: string;
} & BaseIconButtonProps &
  ComponentProps<"a">;

// TODO: handle disabled styling
export const LinkIconButton = ({
  className,
  faIcon,
  variant = "default",
  isActive,
  ...props
}: LinkIconButtonProps) => {
  const { iconButtonClassName } = useIconButtonStyles({ variant, isActive });

  return (
    <Link className={clsx(iconButtonClassName, className)} {...props}>
      <FontAwesomeIcon icon={faIcon} />
    </Link>
  );
};
