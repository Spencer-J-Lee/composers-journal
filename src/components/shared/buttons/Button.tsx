"use client";

import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import clsx from "clsx";

import { useButtonClassName } from "./hooks";
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
  const { buttonClassName } = useButtonClassName({ size, variant, fullWidth });

  return (
    <button className={clsx(buttonClassName, className)} {...props}>
      {children}
    </button>
  );
};
