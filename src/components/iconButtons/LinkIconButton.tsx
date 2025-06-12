import { ComponentProps } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Link from "next/link";

import { useIconButtonStyles } from "./hooks/useIconButtonStyles";
import { BaseIconButtonProps } from "./types";

export type LinkIconButtonProps = {
  href: string;
  disabled?: boolean;
} & BaseIconButtonProps &
  ComponentProps<"a">;

export const LinkIconButton = ({
  className,
  faIcon,
  textVariant = "default",
  isActive,
  disabled,
  ...props
}: LinkIconButtonProps) => {
  const { iconButtonClassName } = useIconButtonStyles({
    textVariant,
    isActive,
    disabled,
  });

  return (
    <Link className={clsx(iconButtonClassName, className)} {...props}>
      <FontAwesomeIcon icon={faIcon} />
    </Link>
  );
};
