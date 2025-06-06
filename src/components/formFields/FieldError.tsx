import { ReactNode } from "react";

import { Collapsible } from "../Collapsible";

type FieldErrorProps = {
  show: boolean;
  children: ReactNode;
};

export const FieldError = ({ show, children }: FieldErrorProps) => {
  return (
    <Collapsible show={show} tag="p">
      <span className="text-negative-text mt-1 inline-block text-sm">
        {children}
      </span>
    </Collapsible>
  );
};
