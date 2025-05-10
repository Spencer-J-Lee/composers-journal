import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { ButtonSize, ButtonVariant } from "./types";
import { useButtonClassname } from "./hooks";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  size?: ButtonSize;
  variant?: ButtonVariant;
}

export const Button = ({
  children,
  size = "md",
  variant = "default",
}: ButtonProps) => {
  const className = useButtonClassname(size, variant);

  return <button className={className}>{children}</button>;
};
