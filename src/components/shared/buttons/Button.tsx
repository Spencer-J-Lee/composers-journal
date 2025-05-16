"use client";

import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import clsx from "clsx";

import { useButtonClassname } from "./hooks";
import { BaseButtonProps } from "./types";

interface ButtonProps
  extends BaseButtonProps,
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    > {}

export const Button = ({
  children,
  size = "md",
  variant = "default",
  className,
  ...props
}: ButtonProps) => {
  const baseClassName = useButtonClassname(size, variant);

  return (
    <button className={clsx(baseClassName, className)} {...props}>
      {children}
    </button>
  );
};
