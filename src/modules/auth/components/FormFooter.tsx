import { ReactNode } from "react";

type FormFooterProps = {
  children: ReactNode;
};

export const FormFooter = ({ children }: FormFooterProps) => {
  return <div className="mt-2">{children}</div>;
};
