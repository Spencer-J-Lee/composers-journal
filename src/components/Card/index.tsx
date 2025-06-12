import { FC, ReactNode } from "react";
import clsx from "clsx";

import { useCardStyles } from "./hooks/useCardStyles";
import { CardPaddingSize } from "./types";

type CardProps = {
  children: ReactNode;
  paddingSize?: CardPaddingSize;
  className?: string;
};

export const Card: FC<CardProps> = ({
  children,
  paddingSize = "md",
  className,
}) => {
  const { cardClassName } = useCardStyles({ paddingSize });

  return <div className={clsx(cardClassName, className)}>{children}</div>;
};
