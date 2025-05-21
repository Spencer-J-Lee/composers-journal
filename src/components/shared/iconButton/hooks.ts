import { useMemo } from "react";
import clsx from "clsx";

import { ButtonVariant } from "@/components/shared/buttons/types";

type UseIconButtonClassNameProps = {
  variant: ButtonVariant;
};

export const useIconButtonClassName = ({
  variant,
}: UseIconButtonClassNameProps) => {
  const variantClassName = useMemo(() => {
    switch (variant) {
      case "default":
        return "text-text-muted";
      case "positive":
        return "text-positive";
      case "negative":
        return "text-negative";
    }
  }, [variant]);

  return {
    iconButtonClassName: clsx(
      "bg-surface hover:brightness-125 focus-visible:brightness-125 h-8 w-8 rounded duration-75 transition-all",
      variantClassName,
    ),
  };
};
