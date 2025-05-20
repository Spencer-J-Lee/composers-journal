import { ReactNode } from "react";

type LabelProps = {
  children: ReactNode;
  htmlFor: string;
  required?: boolean;
};

export const FieldLabel = ({ children, htmlFor, required }: LabelProps) => {
  return (
    <label className="mb-1 block text-sm font-medium" htmlFor={htmlFor}>
      {children}
      {required && <span className="text-danger"> *</span>}
    </label>
  );
};
