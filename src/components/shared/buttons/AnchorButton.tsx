import { AnchorHTMLAttributes, DetailedHTMLProps } from "react";
import { ButtonSize } from "./types";
import { useButtonClassname } from "./hooks";
import clsx from "clsx";

interface AnchorButtonProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  size?: ButtonSize;
}

export const AnchorButton = ({
  children,
  size = "md",
  className,
  ...props
}: AnchorButtonProps) => {
  const baseClassName = useButtonClassname(size);

  return (
    <a className={clsx(baseClassName, className)} {...props}>
      {children}
    </a>
  );
};
