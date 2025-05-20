import { FC, ReactNode } from "react";

import { useCardClassName } from "./hooks";
import { CardPaddingSize } from "./types";

type CardProps = {
  children: ReactNode;
  paddingSize?: CardPaddingSize;
};

export const Card: FC<CardProps> = ({ children, paddingSize = "md" }) => {
  const className = useCardClassName({ paddingSize });

  return <div className={className}>{children}</div>;
};
