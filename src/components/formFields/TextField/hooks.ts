import clsx from "clsx";

type useTextFieldStylesProps = {
  hasError?: boolean;
};

export const useTextFieldStyles = ({ hasError }: useTextFieldStylesProps) => {
  return {
    textFieldClassName: clsx(
      "w-full rounded-lg border bg-input-background px-3 py-2.5 text-sm focus:border-input-border-focus transition-colors",
      hasError ? "border-negative" : "border-input-border",
    ),
  };
};
