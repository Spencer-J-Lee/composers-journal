import { InputHTMLAttributes } from "react";
import clsx from "clsx";

import { useInputClassName } from "./hooks";

export type TextFieldProps = {
  hasError?: boolean;
  type?: "text" | "email" | "password";
} & InputHTMLAttributes<HTMLInputElement>;

export const TextField = ({
  hasError,
  className,
  ...props
}: TextFieldProps) => {
  const { inputClassName } = useInputClassName({ hasError });
  return <input {...props} className={clsx(inputClassName, className)} />;
};
