import { ButtonSize } from "@/components/common/buttons/types";
import clsx from "clsx";
import { useMemo } from "react";

export const useButtonClassname = (size: ButtonSize) => {
  const sizeClassName = useMemo(() => {
    switch (size) {
      case "sm":
        return "px-4 py-2 text-sm";
      case "md":
        return "px-10 py-3 text-base";
    }
  }, [size]);

  return clsx(
    "text-text font-inter rounded font-medium tracking-widest transition-all bg-accent font-semibold active:brightness-90",
    sizeClassName,
  );
};
