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
  fullWidth,
  loading,
  disabled,
  className,
  ...props
}: ButtonProps) => {
  const { buttonClassName } = useButtonStyles({
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
