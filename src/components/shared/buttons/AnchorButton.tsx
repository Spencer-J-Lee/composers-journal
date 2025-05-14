import { AnchorHTMLAttributes, DetailedHTMLProps } from "react";
import { BaseButtonProps } from "./types";
import { useButtonClassname } from "./hooks";
import clsx from "clsx";

interface AnchorButtonProps
  extends BaseButtonProps,
    DetailedHTMLProps<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    > {}

export const AnchorButton = ({
  children,
  size = "md",
  variant = "default",
  className,
  ...props
}: AnchorButtonProps) => {
  const baseClassName = useButtonClassname(size, variant);

  return (
    <a className={clsx(baseClassName, className)} {...props}>
      {children}
    </a>
  );
};
