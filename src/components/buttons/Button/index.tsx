"use client";

import { ComponentProps } from "react";
import clsx from "clsx";

import { ButtonLoadingOverlay } from "./ButtonLoadingOverlay";
import { useButtonStyles } from "../hooks/useButtonStyles";
import { BaseButtonProps } from "../types";

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
  active,
  ...props
}: ButtonProps) => {
  const { buttonClassName } = useButtonStyles({
    size,
    variant,
    fullWidth,
    disabled,
    active,
    loading,
  });

  return (
    <button
      className={clsx(buttonClassName, className)}
      disabled={disabled || loading}
      type={type}
      {...props}
    >
      {children}

      {loading && <ButtonLoadingOverlay variant={variant} loading={loading} />}
    </button>
  );
};
