"use client";

import { AnchorHTMLAttributes, DetailedHTMLProps } from "react";
import clsx from "clsx";

import { useButtonClassName } from "./hooks";
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
  const baseClassName = useButtonClassName({ size, variant });

  return (
    <a className={clsx(baseClassName, className)} {...props}>
      {children}
    </a>
  );
};
