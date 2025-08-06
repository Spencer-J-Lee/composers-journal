import clsx from "clsx";

type UseTextFieldStylesProps = {
  hasError?: boolean;
};

/**
 * Changes to styling in this hook should be reflected in `Select` component
 */
export const useTextFieldStyles = ({ hasError }: UseTextFieldStylesProps) => {
  return {
    textFieldClassName: clsx(
      "w-full rounded-lg border bg-input-background px-3 py-2.5 text-sm hover:border-input-border-hover focus:border-input-border-focus transition-colors",
      hasError ? "border-negative" : "border-input-border",
    ),
  };
};
