"use client";

import { ComponentProps } from "react";
import clsx from "clsx";

import { useButtonStyles } from "./hooks/useButtonStyles";
import { BaseButtonProps } from "./types";

type AnchorButtonProps = BaseButtonProps & ComponentProps<"a">;

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
