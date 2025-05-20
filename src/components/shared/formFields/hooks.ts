import { useMemo } from "react";
import clsx from "clsx";

type UseInputClassNameProps = {
  hasError?: boolean;
};

type UseInputClassNameReturn = {
  inputClassName: string;
};

export const useInputClassName = ({
  hasError,
}: UseInputClassNameProps): UseInputClassNameReturn => {
  const errorClassName = useMemo(() => {
    return hasError ? " border-danger" : " border-border focus:border-accent";
  }, [hasError]);

  return {
    inputClassName: clsx(
      "w-full rounded-sm border bg-input-background p-2",
      errorClassName,
    ),
  };
};
