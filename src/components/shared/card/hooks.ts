import clsx from "clsx";
import { useMemo } from "react";
import { CardPaddingSize } from "./types";

export const useCardClassName = (padding: CardPaddingSize) => {
  const paddingClassName = useMemo(() => {
    switch (padding) {
      case "md":
        return "p-4";
      case "none":
        return "";
    }
  }, [padding]);

  return clsx(
    "bg-surface border-border rounded border shadow-sm",
    paddingClassName,
  );
};
