import clsx from "clsx";

type UseInputStylesProps = {
  hasError?: boolean;
};

export const useInputStyles = ({ hasError }: UseInputStylesProps) => {
  return {
    inputClassName: clsx(
      "w-full rounded-lg border bg-input-background px-3 py-2.5 text-sm focus:border-input-border-focus transition-colors",
      {
        "border-negative": hasError,
        "border-input-border": !hasError,
      },
    ),
  };
};
