import clsx from "clsx";

import { TextFieldProps } from "./TextField";

export type GhostTextFieldProps = TextFieldProps;

export const GhostTextField = ({
  hasError,
  className,
  ...props
}: GhostTextFieldProps) => {
  return (
    <input
      {...props}
      className={clsx(
        "w-full",
        { "outline-negative outline": hasError },
        className,
      )}
    />
  );
};
