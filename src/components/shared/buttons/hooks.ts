import { useMemo } from "react";
import clsx from "clsx";

import { ButtonSize, ButtonVariant } from "@/components/shared/buttons/types";

type UseButtonClassNameProps = {
  size: ButtonSize;
  variant: ButtonVariant;
  fullWidth?: boolean;
};

export const useButtonClassName = ({
  size,
  variant,
  fullWidth,
}: UseButtonClassNameProps) => {
  const sizeClassName = useMemo(() => {
    switch (size) {
      case "sm":
        return "px-2 py-1 text-xs";
      case "md":
        return "px-4 py-2 text-sm";
    }
  }, [size]);

  const variantClassName = useMemo(() => {
    switch (variant) {
      case "default":
        return "text-text bg-accent";
      case "CTA":
        return "text-text bg-success";
      case "danger":
        return "text-text bg-danger";
    }
  }, [variant]);

  const fullWidthClassName = useMemo(() => {
    return fullWidth ? "w-full" : "";
  }, [fullWidth]);

  return {
    buttonClassName: clsx(
      "font-inter rounded-sm font-medium tracking-widest transition-all font-semibold active:brightness-90",
      sizeClassName,
      variantClassName,
      fullWidthClassName,
    ),
  };
};
