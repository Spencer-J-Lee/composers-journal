import clsx from "clsx";

import { paddingClassName } from "./styles";
import { CardPaddingSize } from "../../types";

type UseCardStylesProps = {
  paddingSize: CardPaddingSize;
};

export const useCardStyles = ({ paddingSize }: UseCardStylesProps) => {
  return {
    cardClassName: clsx(
      "bg-surface border-border rounded border shadow-sm",
      paddingClassName[paddingSize],
    ),
  };
};
