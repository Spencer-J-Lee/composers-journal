import clsx from "clsx";

import { paddingClassName } from "./styles";
import { CardPaddingSize } from "../../types";

type useCardStylesProps = {
  paddingSize: CardPaddingSize;
};

export const useCardStyles = ({ paddingSize }: useCardStylesProps) => {
  return {
    cardClassName: clsx(
      "bg-surface border-border rounded border shadow-sm",
      paddingClassName[paddingSize],
    ),
  };
};
