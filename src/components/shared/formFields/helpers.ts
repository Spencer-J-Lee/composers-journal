import { useMemo } from "react";

type UseInputClassNameProps = {
  hasError?: boolean;
};

export const useInputClassName = ({ hasError }: UseInputClassNameProps) => {
  return useMemo(() => {
    let inputClassName =
      "w-full rounded-sm border border bg-input-background p-2";

    if (hasError) {
      inputClassName += " border-danger";
    } else {
      inputClassName += " border-border focus:border-accent";
    }

    return { inputClassName };
  }, [hasError]);
};
