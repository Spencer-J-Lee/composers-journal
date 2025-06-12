"use client";

import { ComponentProps, ReactNode } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Link from "next/link";

import { useButtonStyles } from "./hooks/useButtonStyles";
import { BaseButtonProps } from "./types";

// TODO: handle disabled styling
export type LinkButtonProps = {
  href: string;
  children: ReactNode;
  faIcon?: IconProp;
  className?: string;
} & BaseButtonProps &
  ComponentProps<"a">;

export const LinkButton = ({
  href,
  children,
  faIcon,
  size = "md",
  variant = "default",
  fullWidth,
  className,
  isActive,
  ...props
}: LinkButtonProps) => {
  const { buttonClassName } = useButtonStyles({
    size,
    variant,
    fullWidth,
    isActive,
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
