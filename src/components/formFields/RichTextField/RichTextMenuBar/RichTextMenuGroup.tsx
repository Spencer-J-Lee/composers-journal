import { ReactNode } from "react";

type RichTextButtonGroupProps = {
  children: ReactNode;
};

export const RichTextButtonGroup = ({ children }: RichTextButtonGroupProps) => {
  return <div className="flex gap-x-1.5">{children}</div>;
};
