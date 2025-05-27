"use client";

import { AnchorHTMLAttributes, DetailedHTMLProps } from "react";
import clsx from "clsx";

import { useButtonStyles } from "./hooks/useButtonStyles";
import { BaseButtonProps } from "./types";

type AnchorButtonProps = BaseButtonProps &
  DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

export const AnchorButton = ({
  children,
  size = "md",
  variant = "default",
  className,
  ...props
}: AnchorButtonProps) => {
  const { buttonClassName } = useButtonStyles({ size, variant });

  return (
    <a className={clsx(buttonClassName, className)} {...props}>
      {children}
    </a>
  );
};
