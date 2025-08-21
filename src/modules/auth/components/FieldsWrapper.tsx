import { ReactNode } from "react";

type FieldsWrapperProps = {
  children: ReactNode;
};

export const FieldsWrapper = ({ children }: FieldsWrapperProps) => {
  return <div className="mb-5 w-full space-y-4">{children}</div>;
};
