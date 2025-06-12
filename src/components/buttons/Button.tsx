"use client";

import { ComponentProps } from "react";
import clsx from "clsx";

import { useButtonStyles } from "./hooks/useButtonStyles";
import { BaseButtonProps } from "./types";
import { PulsingEllipsis } from "../loaders/PulsingEllipsis";

export type ButtonProps = BaseButtonProps & ComponentProps<"button">;

export const Button = ({
  children,
  size = "md",
  variant = "default",
  type = "button",
  fullWidth,
  loading,
  disabled,
  className,
  isActive,
  ...props
}: ButtonProps) => {
  const { buttonClassName } = useButtonStyles({
    size,
    variant,
    fullWidth,
    disabled,
    isActive,
  });

  return (
    <button
      className={clsx(buttonClassName, className)}
      disabled={disabled || loading}
      type={type}
      {...props}
    >
      {loading ? <PulsingEllipsis /> : children}
    </button>
  );
};
