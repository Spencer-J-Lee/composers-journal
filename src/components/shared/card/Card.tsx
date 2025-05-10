import { FC, ReactNode } from "react";
import { CardPaddingSize } from "./types";
import { useCardClassName } from "./hooks";

interface CardProps {
  children: ReactNode;
  paddingSize?: CardPaddingSize;
}

export const Card: FC<CardProps> = ({ children, paddingSize = "md" }) => {
  const className = useCardClassName(paddingSize);

  return <div className={className}>{children}</div>;
};
