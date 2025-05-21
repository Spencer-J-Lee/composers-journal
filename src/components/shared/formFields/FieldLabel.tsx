import { ReactNode, useMemo } from "react";
import clsx from "clsx";

type LabelProps = {
  children: ReactNode;
  htmlFor: string;
  required?: boolean;
  hasError?: boolean;
};

export const FieldLabel = ({
  children,
  htmlFor,
  required,
  hasError,
}: LabelProps) => {
  const errorClassName = useMemo(() => {
    return hasError ? "text-negative-text" : "text-header-secondary";
  }, [hasError]);

  return (
    <label
      className={clsx(
        "mb-2 block text-xs font-bold uppercase transition-colors",
        errorClassName,
      )}
      htmlFor={htmlFor}
    >
      {children}
      {required && <span className="text-negative-text"> *</span>}
    </label>
  );
};
