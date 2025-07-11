import { ReactNode } from "react";

type CardResultsWrapperProps = {
  children: ReactNode;
};

export const CardResultsWrapper = ({ children }: CardResultsWrapperProps) => {
  return <ul className="space-y-4">{children}</ul>;
};
