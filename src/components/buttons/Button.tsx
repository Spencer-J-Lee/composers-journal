"use client";

import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import clsx from "clsx";

import { useButtonClassName } from "./hooks";
import { BaseButtonProps } from "./types";
import { PulsingEllipsis } from "../loaders/PulsingEllipsis";

export type ButtonProps = {
  fullWidth?: boolean;
  loading?: boolean;
} & BaseButtonProps &
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button = ({
  children,
  size = "md",
  variant = "default",
  fullWidth,
  loading,
  disabled,
  className,
  ...props
}: ButtonProps) => {
  const { buttonClassName } = useButtonClassName({
    size,
    variant,
    fullWidth,
    disabled,
  });

  return (
    <button
      className={clsx(buttonClassName, className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <PulsingEllipsis /> : children}
    </button>
  );
};
