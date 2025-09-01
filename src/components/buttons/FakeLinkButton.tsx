"use client";

import { ComponentProps, ReactNode } from "react";
import clsx from "clsx";

import { styledLinkClassName } from "../StyledLink/styles";

export type FakeLinkButtonProps = {
  children: ReactNode;
} & ComponentProps<"button">;

export const FakeLinkButton = ({
  children,
  className,
  ...props
}: FakeLinkButtonProps) => {
  return (
    <button className={clsx(styledLinkClassName, className)} {...props}>
      {children}
    </button>
  );
};
