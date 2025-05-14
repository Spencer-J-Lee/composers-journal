"use client";

import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { BaseButtonProps } from "./types";
import { useButtonClassname } from "./hooks";
import clsx from "clsx";

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
