import { ButtonVariant } from "@/components/shared/buttons/types";
import clsx from "clsx";
import { useMemo } from "react";

export const useIconButtonClassname = (variant: ButtonVariant) => {
  const variantClassName = useMemo(() => {
    switch (variant) {
      case "default":
        return "text-text-muted";
      case "CTA":
        return "text-success";
      case "danger":
        return "text-danger";
    }
  }, [variant]);

  return clsx(
    "bg-surface hover:brightness-125 focus-visible:brightness-125 h-8 w-8 rounded duration-75 transition-all",
    variantClassName,
  );
};
