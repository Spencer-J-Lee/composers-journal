import { useMemo } from "react";
import clsx from "clsx";

import { CardPaddingSize } from "./types";

type UseCardClassNameProps = {
  paddingSize: CardPaddingSize;
};

export const useCardClassName = ({ paddingSize }: UseCardClassNameProps) => {
  const paddingClassName = useMemo(() => {
    switch (paddingSize) {
      case "md":
        return "p-4";
      case "none":
        return "";
    }
  }, [paddingSize]);

  return {
    cardClassName: clsx(
      "bg-surface border-border rounded border shadow-sm",
      paddingClassName,
    ),
  };
};
