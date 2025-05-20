"use client";

import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import clsx from "clsx";

import { useButtonClassname } from "./hooks";
import { BaseButtonProps } from "./types";

type ButtonProps = {
  fullWidth?: boolean;
} & BaseButtonProps &
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button = ({
  children,
  size = "md",
  variant = "default",
  fullWidth,
  className,
  ...props
}: ButtonProps) => {
  const baseClassName = useButtonClassname(size, variant, fullWidth);

  return (
    <button className={clsx(baseClassName, className)} {...props}>
      {children}
    </button>
  );
};
