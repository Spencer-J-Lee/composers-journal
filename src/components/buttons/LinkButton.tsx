"use client";

import { ComponentProps, ReactNode } from "react";
import clsx from "clsx";
import Link from "next/link";

import { useButtonStyles } from "./hooks/useButtonStyles";
import { BaseButtonProps } from "./types";

type LinkButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
} & BaseButtonProps;

export const LinkButton = ({
  href,
  children,
  size = "md",
  variant = "default",
  className,
  ...props
}: LinkButtonProps) => {
  const { buttonClassName } = useButtonStyles({ size, variant });

  return (
    <Link href={href} className={clsx(buttonClassName, className)} {...props}>
      {children}
    </Link>
  );
};
