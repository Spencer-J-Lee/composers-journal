"use client";

import { ReactNode } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Link from "next/link";

import { useButtonStyles } from "./hooks/useButtonStyles";
import { BaseButtonProps } from "./types";

type LinkButtonProps = {
  href: string;
  children: ReactNode;
  faIcon?: IconProp;
  className?: string;
} & BaseButtonProps;

export const LinkButton = ({
  href,
  children,
  faIcon,
  size = "md",
  variant = "default",
  fullWidth,
  className,
  ...props
}: LinkButtonProps) => {
  const { buttonClassName } = useButtonStyles({
    size,
    variant,
    fullWidth,
  });

  return (
    <Link href={href} className={clsx(buttonClassName, className)} {...props}>
      {faIcon && (
        <FontAwesomeIcon icon={faIcon} className="mr-2" size="lg" fixedWidth />
      )}
      {children}
    </Link>
  );
};
