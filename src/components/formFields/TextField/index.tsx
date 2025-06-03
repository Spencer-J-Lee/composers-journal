import { InputHTMLAttributes } from "react";
import clsx from "clsx";

import { useTextFieldStyles } from "./hooks";

export type TextFieldProps = {
  hasError?: boolean;
  type?: "text" | "email" | "password";
} & InputHTMLAttributes<HTMLInputElement>;

export const TextField = ({
  hasError,
  className,
  ...props
}: TextFieldProps) => {
  const { textFieldClassName } = useTextFieldStyles({ hasError });
  return <input {...props} className={clsx(textFieldClassName, className)} />;
};
