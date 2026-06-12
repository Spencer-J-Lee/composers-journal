import { ReactNode } from "react";
import clsx from "clsx";

type LabelProps = {
  children: ReactNode;
  htmlFor: string;
  required?: boolean;
  hasError?: boolean;
  className?: string;
};

export const FieldLabel = ({
  children,
  htmlFor,
  required,
  hasError,
  className,
}: LabelProps) => {
  return (
    <label
      className={clsx(
        "mb-2 block text-xs font-bold uppercase transition-colors",
        hasError ? "text-negative-text" : "text-header-secondary",
        className,
      )}
      htmlFor={htmlFor}
    >
      {children}
      {required && <span className="text-negative-text"> *</span>}
    </label>
  );
};
