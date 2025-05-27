import { FC, ReactNode } from "react";

import { useCardStyles } from "./hooks/useCardStyles";
import { CardPaddingSize } from "./types";

type CardProps = {
  children: ReactNode;
  paddingSize?: CardPaddingSize;
};

export const Card: FC<CardProps> = ({ children, paddingSize = "md" }) => {
  const { cardClassName } = useCardStyles({ paddingSize });

  return <div className={cardClassName}>{children}</div>;
};
