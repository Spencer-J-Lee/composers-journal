import { useMemo } from "react";
import clsx from "clsx";

type UseInputClassNameProps = {
  hasError?: boolean;
};

export const useInputClassName = ({ hasError }: UseInputClassNameProps) => {
  const errorClassName = useMemo(() => {
    return hasError ? " border-negative" : " border-input-border";
  }, [hasError]);

  return {
    inputClassName: clsx(
      "w-full rounded-lg border bg-input-background px-3 py-2.5 text-sm focus:border-input-border-focus transition-colors",
      errorClassName,
    ),
  };
};
